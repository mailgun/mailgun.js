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
} from '../../Types/index.js';

import FormDataBuilder from './FormDataBuilder.js';
import { IRequestProvider } from '../../Interfaces/index.js';
import AxiosProvider from './RequestProviders/AxiosProvider.js';

class Request {
  private url: string;
  private formDataBuilder: FormDataBuilder;
  public requestProvider: IRequestProvider

  constructor(options: RequestOptions, formData: InputFormData) {
    this.url = options.url as string;
    this.formDataBuilder = new FormDataBuilder(formData, { useFetch: options.useFetch });
    const providersConfig: RequestProviderConfig = {
      timeout: options.timeout,
      maxBodyLength: 52428800, // 50 MB
      proxy: options.proxy,
      username: options.username,
      key: options.key,
      configHeaders: options.headers,
      useFetch: options.useFetch
    };
    this.requestProvider = new AxiosProvider(providersConfig);
  }

  async request(
    method: string,
    url: string,
    onCallOptions?: {
      body?: RequestData
      query?: GetQueryTypes | PutQueryTypes
    },
    config?: onCallReqConfig
  ): Promise<APIResponse> {
    const options: OnCallRequestOptions = { ...onCallOptions };

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

  async postWithFD(
    url: string,
    data: FormDataInput
  ): Promise<APIResponse> {
    const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
    return this.command('post', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true,
      dataSize
    });
  }

  async putWithFD(url: string, data: FormDataInput): Promise<APIResponse> {
    const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true,
      dataSize
    });
  }

  async patchWithFD(url: string, data: FormDataInput): Promise<APIResponse> {
    const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {
      isFormURLEncoded: false,
      isMultipartFormData: true,
      dataSize
    });
  }

  put(url: string, data?: PutDataTypes, queryObject?: PutOptionsType)
    : Promise<APIResponse> {
    return this.command('put', url, data, {}, queryObject);
  }

  delete(url: string, data?: IpPoolDeleteData): Promise<APIResponse> {
    return this.command('delete', url, data);
  }
}

export default Request;
