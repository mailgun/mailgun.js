import { AxiosRequestHeaders } from 'axios';
import MailgunClientOptions from '../../interfaces/MailgunClientOptions';

export type OnCallEmptyHeaders = {
  [key: string]: undefined;
}
export type RequestOptions = MailgunClientOptions & {
  headers: AxiosRequestHeaders;
  timeout: number;
}

export type OnCallRequestOptions = {
  timeout?: number;
  headers?: AxiosRequestHeaders;
  query?: any;
  [key: string]: unknown | undefined;
}
