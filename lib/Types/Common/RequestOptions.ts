import { MailgunClientOptions } from '../MailgunClient';
import { IPsListQuery } from '../IPs';
import { RoutesListQuery } from '../Routes';
import { SubaccountsQuery } from '../Subaccounts';
import { WebhooksQuery } from '../Webhooks';
import { ConnectionSettings, DomainCredentialsQuery, DomainGetAPIQuery, DomainsQuery, DomainTagsStatisticQuery, DomainTemplatesQuery, TemplateQuery } from '../Domains';
import { InboxPlacementsData, InboxPlacementsResultsApiQuery, SeedsListsAPIQuery, SeedsListsUpdatingData } from '../InboxPlacements';
import { ValidationQuery } from '../Validations';
import { IpPoolDeleteData } from '../IPPools';
import { MetricsQuery } from '../Metrics';
import * as NodeFormData from 'form-data';
import { FormDataInput } from './FormData';

type HeaderValue = string | string[] | number | boolean | null;
type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization';
type ContentType = HeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';

export type RequestHeaders = Partial<{
  [key: string]: HeaderValue;
} & {
  [Key in CommonRequestHeadersList]: HeaderValue;
}
  & {
    'Content-Type': ContentType
  }>

export type RequestOptions = MailgunClientOptions & {
  headers?: RequestHeaders;
  timeout?: number;
}

export type OnCallRequestOptions = {
  timeout?: number;
  query?: any;
  [key: string]: unknown | undefined;
}

export type GetQueryTypes = IPsListQuery |
  RoutesListQuery |
  SubaccountsQuery |
  WebhooksQuery |
  DomainsQuery |
  DomainGetAPIQuery |
  DomainCredentialsQuery |
  DomainTagsStatisticQuery |
  TemplateQuery |
  DomainTemplatesQuery |
  InboxPlacementsResultsApiQuery |
  SeedsListsAPIQuery |
{ searchParams?: Array<Array<string>> } |
  ValidationQuery

export type PostDataTypes = InboxPlacementsData | MetricsQuery | string;
export type PutDataTypes = SeedsListsUpdatingData | {} | FormDataInput | ConnectionSettings
export type RequestData = IpPoolDeleteData | PostDataTypes | PutDataTypes | NodeFormData | FormData;


export type ContainsPrefix<T extends string> = `${T}${string}`;

type EnableQuery = ContainsPrefix<'enabled='>;
type DkimSelectorQuery = ContainsPrefix<'dkim_selector='>;
type SelfQuery = ContainsPrefix<'self='>;
type WebPrefixQuery = ContainsPrefix<'web_prefix='>;


export type PutQueryTypes = EnableQuery | DkimSelectorQuery | SelfQuery | WebPrefixQuery;
export type PutOptionsType = { query?: PutQueryTypes };

export type CommandQuery = {
  query?: PutQueryTypes;
}

export type onCallReqConfig = {
  isFormURLEncoded?: boolean
  isMultipartFormData?: boolean
  isApplicationJSON?: boolean;
}
