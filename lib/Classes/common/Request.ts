import urljoin from 'url-join';
import {
  OnCallRequestOptions,
  RequestOptions,
  InputFormData,
  APIResponse,
  IpPoolDeleteData,
  FormDataInput,
  RequestProviderConfig,
  RequestData,
  GetQueryTypes,
  PostDataTypes,
  PutDataTypes,
  CommandQuery,
  PutOptionsType,
  PutQueryTypes,
  RequestProviderData,
  onCallReqConfig
} from '../../Types';

import FormDataBuilder from './FormDataBuilder';
import FetchProvider from './RequestProviders/FetchProvider';
import { IRequestProvider } from '../../Interfaces';
import AxiosProvider from './RequestProviders/AxiosProvider';

class Request {
  // private username: string;
  // private key: string;
  private url: string;
  // private timeout: number;
  // private headers: AxiosHeaders;
  private formDataBuilder: FormDataBuilder;
  // private maxBodyLength: number;
  // private proxy: AxiosProxyConfig | undefined;
  private requestProvider: IRequestProvider

  constructor(options: RequestOptions, formData: InputFormData) {
    // this.username = options.username;
    // this.key = options.key;
    this.url = options.url as string;
    // this.timeout = options.timeout;
    this.formDataBuilder = new FormDataBuilder(formData, { useFetch: options.useFetch });
    // this.maxBodyLength = 52428800; // 50 MB
    // this.proxy = options?.proxy;
    const providersConfig: RequestProviderConfig = {
      timeout: options.timeout,
      maxBodyLength: 52428800,
      proxy: options.proxy,
      username: options.username,
      key: options.key,
      configHeaders: options.headers,
    };
    // this.requestProvider = new FetchProvider(providersConfig);
    this.requestProvider = options.useFetch
      ? new FetchProvider(providersConfig)
      : new AxiosProvider(providersConfig);
  }

  async request(
    method: string,
    url: string,
    onCallOptions?: {
      body?: RequestData
      query?: GetQueryTypes | PutQueryTypes
      // headers?: RequestHeaders
    },
    config?: onCallReqConfig
  ): Promise<APIResponse> {
    const options: OnCallRequestOptions = { ...onCallOptions };
    // const requestHeaders = this.joinAndTransformHeaders(onCallOptions);

    const params: RequestProviderData = {};

    const urlValue = urljoin(this.url, url);
    if (options?.query && Object.getOwnPropertyNames(options?.query).length > 0) {
      if (options?.query?.searchParams) {
        params.params = new URLSearchParams(options.query.searchParams);
      } else {
        params.params = new URLSearchParams(options.query);
      }
    }

    if (options?.body) {
      params.data = options?.body;
    }

    return this.requestProvider.makeRequest(urlValue, method.toUpperCase(), params, config);
  }

  // private joinAndTransformHeaders(
  //   onCallOptions?: OnCallRequestOptions
  // ): AxiosHeaders {
  //   const requestHeaders = new AxiosHeaders();

  //   const basic = base64.encode(`${this.username}:${this.key}`);
  //   requestHeaders.setAuthorization(`Basic ${basic}`);
  //   requestHeaders.set(this.headers);

  //   const receivedOnCallHeaders = onCallOptions && onCallOptions.headers;
  //   const onCallHeaders = this.makeHeadersFromObject(receivedOnCallHeaders);
  //   requestHeaders.set(onCallHeaders);
  //   return requestHeaders;
  // }

  // private makeHeadersFromObject(
  //   headersObject: RawAxiosRequestHeaders = {}
  // ): AxiosHeaders {
  //   let requestHeaders = new AxiosHeaders();
  //   requestHeaders = Object.entries(headersObject).reduce(
  //     (headersAccumulator: AxiosHeaders, currentPair) => {
  //       const [key, value] = currentPair;
  //       headersAccumulator.set(key, value);
  //       return headersAccumulator;
  //     }, requestHeaders
  //   );
  //   return requestHeaders;
  // }

  setSubaccountHeader(subAccountId: string): void {
    this.requestProvider.setSubAccountHeader(subAccountId);
  }

  resetSubaccountHeader(): void {
    this.requestProvider.resetSubAccountHeader();
  }

  query(
    method: string,
    url: string,
    query?: GetQueryTypes,
  ): Promise<APIResponse> {
    return this.request(method, url, { query });
  }

  command(
    method: string,
    url: string,
    data?: RequestData,
    config?: onCallReqConfig,
    queryObject?: CommandQuery,
  ): Promise<APIResponse> {
    const requestOptions = {
      body: data,
      query: queryObject?.query,
    };
    return this.request(
      method,
      url,
      requestOptions,
      config
    );
  }

  get(
    url: string,
    query?: GetQueryTypes,
  ): Promise<APIResponse> {
    return this.query('get', url, query);
  }

  post(
    url: string,
    data?: PostDataTypes,
    config?: Omit<onCallReqConfig, 'isFormURLEncoded' | 'isMultipartFormData'>,
  ): Promise<APIResponse> {
    return this.command('post', url, data, {
      isFormURLEncoded: false,
      isApplicationJSON: config?.isApplicationJSON
    });
  }

  postWithFD(
    url: string,
    data: FormDataInput
  ): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('post', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true
    });
  }

  putWithFD(url: string, data: FormDataInput): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true
    });
  }

  patchWithFD(url: string, data: FormDataInput): Promise<APIResponse> {
    const formData = this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true
    });
  }

  put(url: string, data?: PutDataTypes, queryObject?: PutOptionsType)
    : Promise<APIResponse> {
    return this.command('put', url, data, {} ,queryObject);
  }

  delete(url: string, data?: IpPoolDeleteData): Promise<APIResponse> {
    return this.command('delete', url, data);
  }
}

export default Request;
