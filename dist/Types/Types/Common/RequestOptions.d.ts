import { AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import { MailgunClientOptions } from '../MailgunClient/index.js';
export type OnCallEmptyHeaders = {
    [key: string]: undefined;
};
export type RequestOptions = MailgunClientOptions & {
    headers: AxiosRequestHeaders | RawAxiosRequestHeaders;
    timeout: number;
};
export type OnCallRequestOptions = {
    timeout?: number;
    headers?: AxiosRequestHeaders | RawAxiosRequestHeaders;
    query?: any;
    [key: string]: unknown | undefined;
};
