import { AxiosProxyConfig } from 'axios';
export type MailgunClientOptions = {
    username: string;
    key: string;
    url?: string;
    public_key?: string;
    timeout?: number;
    proxy?: AxiosProxyConfig;
};
