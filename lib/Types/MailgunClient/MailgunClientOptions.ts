import type { ClientProxyConfig } from '../Common/index.js';

export type MailgunClientOptions = {
  username: string;
  key: string;
  url?: string;
  // eslint-disable-next-line camelcase
  public_key?: string;
  timeout?: number;
  proxy?: ClientProxyConfig;
  useFetch?: boolean;
}
