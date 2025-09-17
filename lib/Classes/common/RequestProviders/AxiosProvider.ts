import axios, {
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
  RawAxiosRequestHeaders,
  AxiosProxyConfig,
  AxiosRequestConfig,
} from 'axios';
import * as base64 from 'base-64';
import {
  APIErrorOptions,
  APIResponse,
  onCallReqConfig,
  RequestHeaders,
  RequestProviderConfig,
  RequestProviderData
} from '../../../Types/index.js';
import { IRequestProvider } from '../../../Interfaces/index.js';
import SubaccountsClient from '../../Subaccounts.js';
import APIError from '../Error.js';

class AxiosProvider implements IRequestProvider {
  private timeout: number | undefined;
  private maxBodyLength: number;
  private proxy: AxiosProxyConfig | undefined;
  private username: string;
  private key: string;
  private headers: AxiosHeaders;
  private useFetch: boolean | undefined;

  constructor({
    username,
    key,
    timeout,
    maxBodyLength,
    proxy,
    configHeaders,
    useFetch
  }: RequestProviderConfig) {
    this.timeout = timeout;
    this.maxBodyLength = maxBodyLength;
    this.proxy = proxy;
    this.username = username;
    this.key = key;
    this.headers = this.makeHeadersFromObject(configHeaders);
    this.useFetch = useFetch;
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

  private getDataRelatedHeaders(config?:onCallReqConfig): RequestHeaders {
    const isFormURLEncoded = config?.isFormURLEncoded ?? true;
    const isMultipartFormData = config?.isMultipartFormData;
    const isApplicationJSON = config?.isApplicationJSON;

    const headers: RequestHeaders = {};
    if (isFormURLEncoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (isMultipartFormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    if (isApplicationJSON) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  private addRequestLevelHeaders(
    config?: onCallReqConfig
  ): AxiosHeaders {
    const requestHeaders = new AxiosHeaders();

    const basic = base64.encode(`${this.username}:${this.key}`);
    requestHeaders.setAuthorization(`Basic ${basic}`);
    requestHeaders.set(this.headers);
    const dataRelatedHeaders = this.getDataRelatedHeaders(config);
    const onCallHeaders = this.makeHeadersFromObject(dataRelatedHeaders);
    requestHeaders.set(onCallHeaders);
    return requestHeaders;
  }

  private makeHeadersFromObject(
    headersObject: RawAxiosRequestHeaders = {}
  ): AxiosHeaders {
    let requestHeaders = new AxiosHeaders();
    requestHeaders = Object.entries(headersObject).reduce(
      (headersAccumulator: AxiosHeaders, currentPair) => {
        const [key, value] = currentPair;
        headersAccumulator.set(key, value);
        return headersAccumulator;
      }, requestHeaders
    );
    return requestHeaders;
  }

  public setSubAccountHeader(subAccountId: string): void {
    this.headers.set(SubaccountsClient.SUBACCOUNT_HEADER, subAccountId);
  }

  public resetSubAccountHeader(): void {
    this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
  }

  public async makeRequest(
    url: string,
    method: string,
    data: RequestProviderData,
    config?: onCallReqConfig
  ): Promise<APIResponse> {
    let response: AxiosResponse;
    const requestHeaders = this.addRequestLevelHeaders(config);
    try {
      const reqObject: AxiosRequestConfig = {
        method: method.toLocaleUpperCase(),
        timeout: this.timeout,
        url,
        headers: requestHeaders,
        ...data,
        maxBodyLength: this.maxBodyLength,
        proxy: this.proxy,
      };

      if (this.useFetch) {
        reqObject.adapter = 'fetch';
        if (config?.dataSize) {
          if (config.dataSize > 0 && config.dataSize > this.maxBodyLength) {
            throw new APIError({
              status: 400,
              statusText: '(Fetch) Request body larger than maxBodyLength limit',
              body: `(Fetch) Request body size of ${config.dataSize} bytes exceeds the maximum allowed size of ${this.maxBodyLength} bytes`
            } as APIErrorOptions);
          }
        }
      }

      response = await axios.request(reqObject);
    } catch (err: unknown) {
      const errorResponse = err as AxiosError;
      throw new APIError({
        status: errorResponse?.response?.status || 400,
        statusText: errorResponse?.response?.statusText || errorResponse.code,
        body: errorResponse?.response?.data || errorResponse.message
      } as APIErrorOptions);
    }

    const res = await this.getResponseBody(response);
    return res;
  }
}

export default AxiosProvider;
