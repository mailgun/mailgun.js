import { AxiosProxyConfig } from 'axios';
/* eslint-disable camelcase */
export type MailgunClientOptions = {
  username: string;
  key: string;
  url?: string;
  public_key?: string;
  timeout?: number;
  proxy?: AxiosProxyConfig;
}
