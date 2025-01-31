import { RequestData, RequestHeaders } from './RequestOptions';
export type ClientProxyConfig = {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
};
export type RequestProviderConfig = {
    username: string;
    key: string;
    timeout?: number;
    maxBodyLength: number;
    proxy?: ClientProxyConfig;
    configHeaders?: RequestHeaders;
};
export type RequestProviderData = {
    params?: URLSearchParams;
    data?: RequestData;
};
export type FetchSupportedData = Blob | BufferSource | FormData | URLSearchParams | string;
