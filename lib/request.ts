
import Btoa from 'btoa';
import urljoin from 'url-join';
import ky from 'ky-universal';

import APIError from './error';
import RequestOptions from './interfaces/RequestOptions';
import APIErrorOptions from './interfaces/APIErrorOptions';

const isStream = (attachment: any) => typeof attachment === 'object' && typeof attachment.pipe === 'function';

const getAttachmentOptions = (item: any): { filename?: string, contentType?: string, knownLength?: number } => {
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
}

const streamToString = (stream: any) => {
  const chunks: any = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

class Request {
  private username;
  private key;
  private url;
  private timeout;
  private headers: any;
  private formData: new () => FormData;

  constructor(options: RequestOptions, formData: new () => FormData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formData = formData;
  }

  async request(method: string, url: string, options?: any) {
    const basic = Btoa(`${this.username}:${this.key}`);
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
      delete params.query
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

    return {
      body: await response?.json(),
      status: response?.status
    };
  }

  query(method: string, url: string, query: any, options?: any) {
    return this.request(method, url, { query, ...options });
  }

  command(method: string, url: string, data: any, options?: any) {
    return this.request(method, url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
      ...options
    });
  }

  get(url: string, query?: any, options?: any) {
    return this.query('get', url, query, options);
  }

  head(url: string, query: any, options: any) {
    return this.query('head', url, query, options);
  }

  options(url: string, query: any, options: any) {
    return this.query('options', url, query, options);
  }

  post(url: string, data: any, options?: any) {
    return this.command('post', url, data, options);
  }

  postMulti(url: string, data: any) {

    const formData: FormData = new this.formData();
    const params: any = {
      headers: { 'Content-Type': null }
    };

    Object.keys(data)
      .filter(function (key) { return data[key]; })
      .forEach(function (key) {
        if (key === 'attachment') {
          const obj = data.attachment;

          if (Array.isArray(obj)) {
            obj.forEach(function (item) {
              const data = item.data ? item.data : item;
              const options = getAttachmentOptions(item);
              (formData as any).append(key, data, options);
            });
          } else {
            const data = isStream(obj) ? obj : obj.data;
            const options = getAttachmentOptions(obj);
            (formData as any).append(key, data, options);
          }

          return;
        }

        if (Array.isArray(data[key])) {
          data[key].forEach(function (item: any) {
            formData.append(key, item);
          });
        } else if (data[key] != null) {
          formData.append(key, data[key]);
        }
      });

    return this.command('post', url, formData, params);
  }

  put(url: string, data: any, options?: any) {
    return this.command('put', url, data, options);
  }

  patch(url: string, data: any, options?: any) {
    return this.command('patch', url, data, options);
  }

  delete(url: string, data?: any, options?: any) {
    return this.command('delete', url, data, options);
  }
}

export default Request
