import * as NodeFormData from 'form-data';
import type { MailgunClientOptions } from '../MailgunClient/index.js';
import type { IPsListQuery } from '../IPs/index.js';
import type { RoutesListQuery } from '../Routes/index.js';
import type { SubaccountsQuery } from '../Subaccounts/index.js';
import type { WebhooksQuery } from '../Webhooks/index.js';
import type { ConnectionSettings, DeletedDomainKeysQuery, DomainCredentialsQuery, DomainGetAPIQuery, DomainsQuery, DomainTagsStatisticQuery, DomainTemplatesQuery, TemplateQuery } from '../Domains/index.js';
import type { InboxPlacementsData, InboxPlacementsResultsApiQuery, SeedsListsAPIQuery, SeedsListsUpdatingData } from '../InboxPlacements/index.js';
import type { ValidationQuery } from '../Validations/index.js';
import type { IpPoolDeleteData } from '../IPPools/index.js';
import type { MetricsQuery } from '../Metrics/index.js';
import type { FormDataInput } from './FormData.js';
import { LogsQuery } from '../Logs/Logs.js';
export type OnCallEmptyHeaders = {
    [key: string]: undefined;
};
type HeaderValue = string | string[] | number | boolean | null;
type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization';
type ContentType = HeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';
export type RequestHeaders = Partial<{
    [key: string]: HeaderValue;
} & {
    [Key in CommonRequestHeadersList]: HeaderValue;
} & {
    'Content-Type': ContentType;
}>;
export type RequestOptions = MailgunClientOptions & {
    headers?: RequestHeaders;
    timeout?: number;
};
export type OnCallRequestOptions = {
    timeout?: number;
    query?: any;
    [key: string]: unknown | undefined;
};
export type GetQueryTypes = IPsListQuery | RoutesListQuery | SubaccountsQuery | WebhooksQuery | DomainsQuery | DomainGetAPIQuery | DomainCredentialsQuery | DomainTagsStatisticQuery | TemplateQuery | DomainTemplatesQuery | InboxPlacementsResultsApiQuery | SeedsListsAPIQuery | {
    searchParams?: Array<Array<string>>;
} | ValidationQuery;
export type DeleteQueryTypes = DeletedDomainKeysQuery;
export type PostDataTypes = InboxPlacementsData | MetricsQuery | LogsQuery | string;
export type PutDataTypes = SeedsListsUpdatingData | object | FormDataInput | ConnectionSettings;
export type RequestData = IpPoolDeleteData | PostDataTypes | PutDataTypes | NodeFormData | FormData;
export type ContainsPrefix<T extends string> = `${T}${string}`;
type EnableQuery = ContainsPrefix<'enabled='>;
type DkimSelectorQuery = ContainsPrefix<'dkim_selector='>;
type SelfQuery = ContainsPrefix<'self='>;
type WebPrefixQuery = ContainsPrefix<'web_prefix='>;
type LimitQuery = ContainsPrefix<'limit='>;
export type PutQueryTypes = EnableQuery | DkimSelectorQuery | SelfQuery | WebPrefixQuery | LimitQuery;
export type PutOptionsType = {
    query?: PutQueryTypes;
};
export type CommandQuery = {
    query?: PutQueryTypes | DeleteQueryTypes;
};
export type onCallReqConfig = {
    isFormURLEncoded?: boolean;
    isMultipartFormData?: boolean;
    isApplicationJSON?: boolean;
    dataSize?: number;
    isStorageAPI?: boolean;
};
export {};
