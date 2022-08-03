import * as base64 from 'base-64';
import urljoin from 'url-join';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as NodeFormData from 'form-data';
import APIError from './error';
import { OnCallEmptyHeaders, OnCallRequestOptions, RequestOptions } from './types/RequestOptions';
import { APIErrorOptions } from './types/APIErrorOptions';
import { InputFormData } from './types/IFormData';
import { APIResponse } from './types/ApiResponse';
import FormDataBuilder from './formDataBuilder';
import { IpPoolDeleteData } from './types/IpPools';

class Request {
  private username: string;
  private key: string;
  private url: string;
  private timeout: number;
  private headers: Record<string, unknown>;
  private formDataBuilder: FormDataBuilder;
  private maxBodyLength: number;

  constructor(options: RequestOptions, formData: InputFormData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url as string;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formDataBuilder = new FormDataBuilder(formData);
    this.maxBodyLength = 25000000; // 25MB
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
      params.params = new URLSearchParams(options.query);
      delete params.query;
    }

    if (options?.body) {
      const body = options?.body;
      params.data = body;
      delete params.body;
    }
    let response: AxiosResponse;
    const urlValue = urljoin(this.url, url);
    try {
      response = await axios.request({
        method: method.toLocaleUpperCase(),
        timeout: this.timeout,
        url: urlValue,
        headers,
        ...params,
        maxBodyLength: this.maxBodyLength
      });
    } catch (err: unknown) {
      const errorResponse = err as AxiosError;

      throw new APIError({
        status: errorResponse?.response?.status || 400,
        statusText: errorResponse?.response?.statusText || errorResponse.code,
        body: errorResponse?.response?.data || errorResponse.message
      } as APIErrorOptions);
    }

    const res = await this.getResponseBody(response);
    return res as APIResponse;
  }

  private async getResponseBody(response: AxiosResponse): Promise<APIResponse> {
    const res = {
      body: {},
      status: response?.status
    } as APIResponse;

    if (typeof response.data === 'string') {
      if (response.data === 'Mailgun Magnificent API') {
        throw new APIError({
          status: 400,
          statusText: 'Incorrect url',
          body: response.data
        } as APIErrorOptions);
      }
      res.body = {
        message: response.data
      };
    } else {
      res.body = response.data;
    }
    return res;
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
    data?: Record<string, unknown> | Record<string, unknown>[] | string | NodeFormData | FormData,
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
    return this.command('post', url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }, false);
  }

  putWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }, false);
  }

  patchWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }, false);
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
