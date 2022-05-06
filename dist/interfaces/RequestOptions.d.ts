import Options from './Options';
export interface OnCallEmptyHeaders {
    [key: string]: undefined;
}
export interface RequestOptions extends Options {
    headers: any;
    timeout: number;
}
export interface OnCallRequestOptions {
    timeout?: number;
    headers?: HeadersInit | OnCallEmptyHeaders;
    [key: string]: unknown | undefined;
}
