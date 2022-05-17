import { AxiosRequestHeaders } from 'axios';
import Options from './Options';
export interface OnCallEmptyHeaders {
    [key: string]: undefined;
}
export interface RequestOptions extends Options {
    headers: AxiosRequestHeaders;
    timeout: number;
}
export interface OnCallRequestOptions {
    timeout?: number;
    headers?: AxiosRequestHeaders;
    query?: any;
    [key: string]: unknown | undefined;
}
