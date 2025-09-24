import type { RequestData, RequestHeaders } from './index.js';
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
    useFetch?: boolean;
};
export type RequestProviderData = {
    params?: URLSearchParams;
    data?: RequestData;
};
export type FetchSupportedData = Blob | BufferSource | FormData | URLSearchParams | string;
export type KeysWithToArray = {
    toArray: () => string[];
};
export type HeadersWithKeysMethod = Headers & {
    keys: () => KeysWithToArray;
};
