import { AxiosRequestHeaders } from 'axios';
import MailgunClientOptions from './MailgunClientOptions';
export interface OnCallEmptyHeaders {
    [key: string]: undefined;
}
export interface RequestOptions extends MailgunClientOptions {
    headers: AxiosRequestHeaders;
    timeout: number;
}
export interface OnCallRequestOptions {
    timeout?: number;
    headers?: AxiosRequestHeaders;
    query?: any;
    [key: string]: unknown | undefined;
}
