import { APIResponse } from '../../Types/Common/index.js';
import type {
  ClickTrackingInfo,
  ConnectionSettings,
  DKIMAuthorityInfo,
  DKIMSelectorInfo,
  DomainGetQuery,
  DomainInfo,
  DomainsQuery,
  DomainTrackingData,
  DomainUpdateInfo,
  MessageResponse,
  OpenTrackingInfo,
  ReplacementForPool,
  TDomain,
  UnsubscribeTrackingInfo,
  UpdatedConnectionSettings,
  UpdatedDKIMAuthority,
  UpdatedDKIMSelectorResult,
  UpdatedOpenTracking,
  UpdatedWebPrefixResponse,
  WebPrefixInfo
} from '../../Types/Domains/index.js';

import { IDomainCredentials } from './DomainCredentials.js';
import { IDomainTagsClient } from './DomainTags.js';
import { IDomainTemplatesClient } from './DomainTemplates.js';
import { IDomainTrackingClient } from './DomainTracking.js';

export interface IDomainsClient {
    domainCredentials: IDomainCredentials;
    domainTemplates: IDomainTemplatesClient;
    domainTags: IDomainTagsClient;
    domainTracking: IDomainTrackingClient;
    list(query?: DomainsQuery): Promise<TDomain[]>
    get(domain: string, query?: DomainGetQuery): Promise<TDomain>
    create(data: DomainInfo): Promise<TDomain>
    update(domain: string, data: DomainUpdateInfo): Promise<TDomain>
    verify(domain: string): Promise<TDomain>
    destroy(domain: string): Promise<MessageResponse>
    getConnection(domain: string): Promise<ConnectionSettings>
    updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings>
    getTracking(domain: string): Promise<DomainTrackingData>
    updateTracking(
        domain: string,
        type: string,
        data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo
    ): Promise<UpdatedOpenTracking>
    getIps(domain: string): Promise<string[]>
    assignIp(domain: string, ip: string): Promise<APIResponse>
    deleteIp(domain: string, ip: string): Promise<APIResponse>
    // eslint-disable-next-line camelcase
    linkIpPool(domain: string, pool_id: string): Promise<APIResponse>
    unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse>
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResult>
    updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse>
}
