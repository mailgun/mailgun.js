import NodeFormData from 'form-data';
import base64 from 'base-64';
import urljoin from 'url-join';
import ky from 'ky-universal';
import APIError from './error';
import RequestOptions from './interfaces/RequestOptions';
import APIErrorOptions from './interfaces/APIErrorOptions';
import { InputFormData } from './interfaces/IFormData';
import APIResponse from './interfaces/ApiResponse';

const isStream = (attachment: any) => typeof attachment === 'object' && typeof attachment.pipe === 'function';

function isNodeFormData(formDataInstance: NodeFormData | FormData)
  : formDataInstance is NodeFormData {
  return (<NodeFormData>formDataInstance).getHeaders !== undefined;
}

const getAttachmentOptions = (item: any): {
  filename?: string,
  contentType?: string,
  knownLength?: number
} => {
  if (typeof item !== 'object' || isStream(item)) return {};

  const {
    filename,
    contentType,
    knownLength
  } = item;

  return {
    ...(filename ? { filename } : { filename: 'file' }),
    ...(contentType && { contentType }),
    ...(knownLength && { knownLength })
  };
};

const streamToString = (stream: any) => {
  const chunks: any = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

class Request {
  private username: string;
  private key: string;
  private url: string;
  private timeout: number;
  private headers: any;
  private FormDataConstructor: InputFormData;

  constructor(options: RequestOptions, formData: InputFormData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url as string;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.FormDataConstructor = formData;
  }

  async request(method: string, url: string, inputOptions?: any): Promise<APIResponse> {
    const options = { ...inputOptions };
    const basic = base64.encode(`${this.username}:${this.key}`);
    const headers = {
      Authorization: `Basic ${basic}`,
      ...this.headers,
      ...options?.headers
    };

    delete options?.headers;

    if (!headers['Content-Type']) {
      // for form-data it will be Null so we need to remove it
      delete headers['Content-Type'];
    }

    const params = { ...options };

    if (options?.query && Object.getOwnPropertyNames(options?.query).length > 0) {
      params.searchParams = options.query;
      delete params.query;
    }

    const response = await ky(
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
      const message = response?.body && isStream(response.body)
        ? await streamToString(response.body)
        : await response?.json();

      throw new APIError({
        status: response?.status,
        statusText: response?.statusText,
        body: { message }
      } as APIErrorOptions);
    }

    const res = {
      body: await response?.json(),
      status: response?.status
    };

    return res;
  }

  query(method: string, url: string, query: any, options?: any) : Promise<APIResponse> {
    return this.request(method, url, { query, ...options });
  }

  command(method: string, url: string, data: any, options?: any) : Promise<APIResponse> {
    return this.request(method, url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
      ...options
    });
  }

  get(url: string, query?: any, options?: any) : Promise<APIResponse> {
    return this.query('get', url, query, options);
  }

  head(url: string, query: any, options: any) : Promise<APIResponse> {
    return this.query('head', url, query, options);
  }

  options(url: string, query: any, options: any) : Promise<APIResponse> {
    return this.query('options', url, query, options);
  }

  post(url: string, data: any, options?: any) : Promise<APIResponse> {
    return this.command('post', url, data, options);
  }

  postWithFD(url: string, data: any): Promise<APIResponse> {
    if (!data) {
      throw new Error('Please provide data object');
    }
    const params: any = {
      headers: { 'Content-Type': null }
    };
    const formData = this.createFormData(data);
    return this.command('post', url, formData, params);
  }

  putWithFD(url: string, data: any): Promise<APIResponse> {
    if (!data) {
      throw new Error('Please provide data object');
    }
    const params: any = {
      headers: { 'Content-Type': null }
    };
    const formData = this.createFormData(data);
    return this.command('put', url, formData, params);
  }

  patchWithFD(url: string, data: any): Promise<APIResponse> {
    if (!data) {
      throw new Error('Please provide data object');
    }
    const params: any = {
      headers: { 'Content-Type': null }
    };
    const formData = this.createFormData(data);
    return this.command('patch', url, formData, params);
  }

  createFormData(data: any): NodeFormData | FormData {
    const formData: NodeFormData | FormData = Object.keys(data)
      .filter(function (key) { return data[key]; })
      .reduce((formDataAcc: NodeFormData | FormData, key) => {
        const fileKeys = ['attachment', 'inline', 'file'];
        if (fileKeys.includes(key)) {
          this.addFilesToFD(key, data[key], formDataAcc);
          return formDataAcc;
        }

        if (key === 'message') { // mime message
          this.addMimeDataToFD(key, data[key], formDataAcc);
          return formDataAcc;
        }

        this.addCommonPropertyToFD(key, data[key], formDataAcc);
        return formDataAcc;
      }, new this.FormDataConstructor());
    return formData;
  }

  private addMimeDataToFD(
    key: string,
    data: Buffer | Blob,
    formDataInstance: NodeFormData | FormData
  ): void {
    if (isNodeFormData(formDataInstance)) {
      if (Buffer.isBuffer(data)) {
        formDataInstance.append(key, data, { filename: 'MimeMessage' });
      }
    } else {
      formDataInstance.append(key, data as Blob, 'MimeMessage');
    }
  }

  private addFilesToFD(
    propertyName: string,
    value: any,
    formDataInstance: NodeFormData | FormData
  ): void {
    const appendFileToFD = (
      key: string,
      obj: any,
      formData: NodeFormData | FormData
    ): void => {
      const isStreamData = isStream(obj);
      const objData = isStreamData ? obj : obj.data;
      // getAttachmentOptions should be called with obj parameter to prevent loosing filename
      const options = getAttachmentOptions(obj);
      if (isNodeFormData(formData)) {
        formData.append(key, objData, options);
        return;
      }
      formData.append(key, objData, options.filename);
    };

    if (Array.isArray(value)) {
      value.forEach(function (item) {
        appendFileToFD(propertyName, item, formDataInstance);
      });
    } else {
      appendFileToFD(propertyName, value, formDataInstance);
    }
  }

  private addCommonPropertyToFD(
    key: string,
    value: any,
    formDataAcc: NodeFormData | FormData
  ): void {
    if (Array.isArray(value)) {
      value.forEach(function (item: any) {
        formDataAcc.append(key, item);
      });
    } else if (value != null) {
      formDataAcc.append(key, value);
    }
  }

  put(url: string, data: any, options?: any): Promise<APIResponse> {
    return this.command('put', url, data, options);
  }

  patch(url: string, data: any, options?: any): Promise<APIResponse> {
    return this.command('patch', url, data, options);
  }

  delete(url: string, data?: any, options?: any): Promise<APIResponse> {
    return this.command('delete', url, data, options);
  }
}

export default Request;
