import { APIResponse } from '../../Types/Common';
import { ClickTrackingInfo, ConnectionSettings, DKIMAuthorityInfo, DKIMSelectorInfo, DomainInfo, DomainsQuery, DomainTrackingData, MessageResponse, OpenTrackingInfo, ReplacementForPool, TDomain, UnsubscribeTrackingInfo, UpdatedConnectionSettings, UpdatedDKIMAuthority, UpdatedDKIMSelectorResponse, UpdatedOpenTracking, UpdatedWebPrefixResponse, WebPrefixInfo } from '../../Types/Domains';
export interface IDomainsClient {
    list(query?: DomainsQuery): Promise<TDomain[]>;
    get(domain: string): Promise<TDomain>;
    create(data: DomainInfo): Promise<TDomain>;
    verify(domain: string): Promise<TDomain>;
    destroy(domain: string): Promise<MessageResponse>;
    getConnection(domain: string): Promise<ConnectionSettings>;
    updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings>;
    getTracking(domain: string): Promise<DomainTrackingData>;
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
    getIps(domain: string): Promise<string[]>;
    assignIp(domain: string, ip: string): Promise<APIResponse>;
    deleteIp(domain: string, ip: string): Promise<APIResponse>;
    linkIpPool(domain: string, pool_id: string): Promise<APIResponse>;
    unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse>;
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>;
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResponse>;
    updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse>;
}
