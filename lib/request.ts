import * as base64 from 'base-64';
import urljoin from 'url-join';
import ky from 'ky-universal';
import * as NodeFormData from 'form-data';
import APIError from './error';
import { OnCallEmptyHeaders, OnCallRequestOptions, RequestOptions } from './interfaces/RequestOptions';
import APIErrorOptions from './interfaces/APIErrorOptions';
import { InputFormData } from './interfaces/IFormData';
import APIResponse from './interfaces/ApiResponse';
import FormDataBuilder from './formDataBuilder';
import { IpPoolDeleteData } from './interfaces/IpPools';

class Request {
  private username: string;
  private key: string;
  private url: string;
  private timeout: number;
  private headers: Record<string, unknown>;
  private formDataBuilder: FormDataBuilder;

  constructor(options: RequestOptions, formData: InputFormData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url as string;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formDataBuilder = new FormDataBuilder(formData);
  }

  async request(
    method: string,
    url: string,
    onCallOptions?: Record<string, unknown | Record<string, unknown> >
  ): Promise<APIResponse> {
    const options: OnCallRequestOptions = { ...onCallOptions };
    const basic = base64.encode(`${this.username}:${this.key}`);
    const onCallHeaders = options.headers ? options.headers : {};
    const headers: HeadersInit| OnCallEmptyHeaders = {
      Authorization: `Basic ${basic}`,
      ...this.headers,
      ...onCallHeaders
    };

    delete options?.headers;

    const params = { ...options };

    if (options?.query && Object.getOwnPropertyNames(options?.query).length > 0) {
      params.searchParams = options.query;
      delete params.query;
    }

    const response: Response = await ky(
      urljoin(this.url, url),
      {
        method: method.toLocaleUpperCase(),
        headers,
        throwHttpErrors: false,
        timeout: this.timeout,
        ...params
      }
    );

    if (!response?.ok) {
      const res = await this.getResponseBody(response);

      throw new APIError({
        status: response?.status,
        statusText: response?.statusText,
        body: res.body
      } as APIErrorOptions);
    }

    const res = await this.getResponseBody(response);
    return res as APIResponse;
  }

  private async getResponseBody(response: Response): Promise<APIResponse> {
    const res = {
      body: {},
      status: response?.status
    } as APIResponse;
    let responseString = '';
    try {
      responseString = await response.text();
      const jsonBody = JSON.parse(responseString);
      res.body = jsonBody;
      return res;
    } catch (error: unknown) {
      res.status = 400;
      res.body = {
        message: responseString,
      };
      return res;
    }
  }

  query(
    method: string,
    url: string,
    query?: Record<string, unknown> | Array<Array<string>>,
    options?: Record<string, unknown>
  ): Promise<APIResponse> {
    return this.request(method, url, { query, ...options });
  }

  command(
    method: string,
    url: string,
    data?: Record<string, unknown> | string | NodeFormData | FormData,
    options?: Record<string, unknown>,
    addDefaultHeaders = true
  ): Promise<APIResponse> {
    let headers = {};
    if (addDefaultHeaders) {
      headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    const requestOptions = {
      ...headers,
      body: data,
      ...options
    };
    return this.request(
      method,
      url,
      requestOptions
    );
  }

  get(
    url: string,
    query?: Record<string, unknown> | Array<Array<string>>,
    options?: Record<string, unknown>
  ): Promise<APIResponse> {
    return this.query('get', url, query, options);
  }

  post(
    url: string,
    data?: Record<string, unknown> | string,
    options?: Record<string, unknown>
  ): Promise<APIResponse> {
    return this.command('post', url, data, options);
  }

  postWithFD(
    url: string,
    data: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('post', url, formData, {}, false);
  }

  putWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {}, false);
  }

  patchWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {}, false);
  }

  put(url: string, data?: Record<string, unknown> | string, options?: Record<string, unknown>)
  : Promise<APIResponse> {
    return this.command('put', url, data, options);
  }

  delete(url: string, data?: IpPoolDeleteData): Promise<APIResponse> {
    return this.command('delete', url, data);
  }
}

export default Request;
