import { ClientProxyConfig } from '../Common';
/* eslint-disable camelcase */
export type MailgunClientOptions = {
  username: string;
  key: string;
  url?: string;
  public_key?: string;
  timeout?: number;
  proxy?: ClientProxyConfig;
  useFetch?: boolean;
}
