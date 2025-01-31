import base64 from 'base-64';
import { IRequestProvider } from '../../../Interfaces';
import {
  APIErrorOptions,
  APIResponse,
  ClientProxyConfig,
  FetchSupportedData,
  onCallReqConfig,
  RequestData,
  RequestHeaders,
  RequestProviderConfig,
  RequestProviderData
} from '../../../Types';
import SubaccountsClient from '../../Subaccounts';
import APIError from '../Error';

type HeadersWithKeysMethod = Headers & { keys: () => { toArray: () => [] } };

class FetchProvider implements IRequestProvider {
  private timeout: number | undefined;
  private maxBodyLength: number;
  private proxy: ClientProxyConfig | undefined;
  private username: string;
  private key: string;
  private headers: Headers | HeadersWithKeysMethod;

  constructor(
    {
      username,
      key,
      timeout,
      maxBodyLength,
      proxy,
      configHeaders
    }: RequestProviderConfig
  ) {
    this.timeout = timeout;
    this.maxBodyLength = maxBodyLength;
    this.proxy = proxy;
    this.username = username;
    this.key = key;
    this.headers = this.makeHeadersFromObject(configHeaders);
  }

  private async getResponseBody(fetchResponse: Response): Promise<APIResponse> {
    const status = fetchResponse.status;
    let response: APIResponse;
    let data;

    const text = await fetchResponse.text();
    try {
      data = JSON.parse(text);
      response = {
        status,
        body: data
      };
    } catch (err) {
      response = {
        status,
        body: { message: text },
      };
    }

    if (text === 'Mailgun Magnificent API') {
      throw new APIError({
        status: 400,
        statusText: '(Fetch) Incorrect url',
        body: { message: text }
      } as APIErrorOptions);
    }

    if (fetchResponse.ok) {
      return response;
    }

    throw new APIError({
      status,
      statusText: `(Fetch) ${fetchResponse.statusText}`,
      body: data ?? { message: text }
    } as APIErrorOptions);
  }

  private extendUrl(url: string, params: URLSearchParams): string {
    const hasQuestionMark = url.includes('?');
    return hasQuestionMark ? `${url}&${params}` : `${url}?${params}`;
  }

  private getDataRelatedHeaders(config?: onCallReqConfig): RequestHeaders {
    const isFormURLEncoded = config?.isFormURLEncoded ?? true;
    const isMultipartFormData = config?.isMultipartFormData;
    const isApplicationJSON = config?.isApplicationJSON;

    const headers: RequestHeaders = {};
    if (isFormURLEncoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (isMultipartFormData) {
      // headers['Content-Type'] = 'multipart/form-data';
    }

    if (isApplicationJSON) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  private prepareReqBody(data?: RequestData, config?: onCallReqConfig,): FetchSupportedData | null {
    if (!data || (!data.toString().toLowerCase().includes('formdata') && Object.keys(data).length < 1)) {
      return null;
    }
    if (typeof data === 'string') return data;
    if (config?.isMultipartFormData) return data as FormData;
    return JSON.stringify(data);
  }

  private async checkSize(url: string, requestSetup: RequestInit) {
    const request = new Request(url, requestSetup);
    const arrayBuffer = await request.clone().arrayBuffer();
    const size = arrayBuffer.byteLength;

    if (size > this.maxBodyLength) {
      throw new Error('Request body larger than maxBodyLength limit');
    }
  }

  public async makeRequest(
    url: string,
    method: string,
    reqData: RequestProviderData,
    config?: onCallReqConfig
  ): Promise<APIResponse> {
    let response: APIResponse;
    const requestHeaders = this.addRequestLevelHeaders(config);
    const urlWithParams = reqData.params ? this.extendUrl(url, reqData.params) : url;
    try {
      const requestSetup = {
        method,
        headers: requestHeaders,
        body: this.prepareReqBody(reqData?.data, config)
      };
      await this.checkSize(urlWithParams, requestSetup);
      const fetchRes: Response = await fetch(urlWithParams, requestSetup);
      response = await this.getResponseBody(fetchRes);
    } catch (error: unknown) {
      if (APIError.isApiError(error)) throw error;

      // when the error has thrown by fetch client
      const message = (error as Error)?.message || 'unknown message';
      throw new APIError({
        status: 400,
        statusText: '(Fetch) the request has failed',
        body: message
      } as APIErrorOptions);
    }

    return response;
  }

  public setSubAccountHeader(subAccountId: string): void {
    this.headers.set(SubaccountsClient.SUBACCOUNT_HEADER, subAccountId);
  }

  public resetSubAccountHeader(): void {
    this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
  }

  public makeHeadersFromObject(
    headersObject: RequestHeaders | Headers = {}
  ): Headers {
    let requestHeaders = new Headers();
    requestHeaders = Object.keys(headersObject).reduce(
      (headersAccumulator: Headers, key) => {
        let value;
        if (this.isHeaders(headersObject)) {
          value = headersObject.get(key);
        } else {
          value = headersObject[key];
        }

        const formattedKey = key.toLowerCase();
        if (value) { // skip if empty
          if (Array.isArray(value)) {
            headersAccumulator.append(formattedKey, value.join(',')); // different from axios
          } else if (typeof value === 'string') {
            headersAccumulator.append(formattedKey, value);
          } else {
            headersAccumulator.append(formattedKey, `${value}`);
          }
        }
        return headersAccumulator;
      }, requestHeaders
    );
    return requestHeaders;
  }

  public addRequestLevelHeaders(
    config?: onCallReqConfig
  ): Headers {
    const requestHeaders = new Headers();

    const basic = base64.encode(`${this.username}:${this.key}`);
    requestHeaders.set('Authorization', `Basic ${basic}`);
    // add headers that were provided by user configuration
    const keys = this.hasKeysMethod(this.headers)
      ? (this.headers as HeadersWithKeysMethod).keys().toArray()
      : Object.keys(this.headers);
    keys.forEach((key) => {
      let value;
      if (this.isHeaders(this.headers)) {
        value = this.headers.get(key);
      } else {
        value = this.headers[key];
      }
      if (value) {
        requestHeaders.set(key, value);
      }
    });

    const dataRelatedHeaders = this.getDataRelatedHeaders(config);
    const onCallHeaders = this.makeHeadersFromObject(dataRelatedHeaders);
    // add headers that were provided by request method call

    (onCallHeaders as HeadersWithKeysMethod).keys().toArray().forEach((key) => {
      let value;
      if (this.isHeaders(onCallHeaders)) {
        value = onCallHeaders.get(key);
      } else {
        value = onCallHeaders[key];
      }
      if (value) {
        requestHeaders.set(key, value);
      }
    });
    return requestHeaders;
  }

  // private formatHeaderName(headerName: string) {
  //   return headerName.trim()
  //   .toLowerCase().replace(/([a-z\d])(\w*)/g, (_, char, str) => {
  //     return char.toUpperCase() + str;
  //   });
  // }

  private isHeaders(obj: unknown): obj is Headers {
    return typeof obj === 'object' && !!(obj as Headers).get && typeof (obj as Headers).get === 'function';
  }

  private hasKeysMethod(obj: unknown): obj is HeadersWithKeysMethod {
    return typeof obj === 'object' && !!(obj as HeadersWithKeysMethod).keys && typeof (obj as HeadersWithKeysMethod).keys === 'function'
  }
}

export default FetchProvider;
