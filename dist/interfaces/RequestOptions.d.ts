import { AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import Options from './Options';
export interface OnCallEmptyHeaders {
    [key: string]: undefined;
}
export interface RequestOptions extends Options {
    headers: AxiosRequestHeaders | RawAxiosRequestHeaders;
    timeout: number;
}
export interface OnCallRequestOptions {
    timeout?: number;
    headers?: AxiosRequestHeaders | RawAxiosRequestHeaders;
    query?: any;
    [key: string]: unknown | undefined;
}
