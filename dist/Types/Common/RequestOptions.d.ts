import { AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import { MailgunClientOptions } from '../MailgunClient';
export declare type OnCallEmptyHeaders = {
    [key: string]: undefined;
};
export declare type RequestOptions = MailgunClientOptions & {
    headers: AxiosRequestHeaders | RawAxiosRequestHeaders;
    timeout: number;
};
export declare type OnCallRequestOptions = {
    timeout?: number;
    headers?: AxiosRequestHeaders | RawAxiosRequestHeaders;
    query?: any;
    [key: string]: unknown | undefined;
};
