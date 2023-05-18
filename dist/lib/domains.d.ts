import { DomainsQuery, DomainInfo, DomainShortData, DNSRecord, ConnectionSettings, UpdatedConnectionSettings, DKIMAuthorityInfo, UpdatedDKIMAuthority, DKIMSelectorInfo, UpdatedDKIMSelectorResponse, WebPrefixInfo, UpdatedWebPrefixResponse, ReplacementForPool, MessageResponse } from './interfaces/Domains.js';
import APIResponse from './interfaces/ApiResponse.js';
import Request from './request.js';
import { DomainTrackingData, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, UpdatedOpenTracking } from './interfaces/DomainTracking.js';
import { IDomainCredentials } from './interfaces/DomainCredentials.js';
import { IDomainTemplatesClient } from './interfaces/DomainTemplates.js';
import DomainCredentialsClient from './domainsCredentials.js';
import DomainTemplatesClient from './domainsTemplates.js';
import { IDomainTagsClient } from './interfaces/DomainTags.js';
import DomainTagsClient from './domainsTags.js';
export declare class Domain {
    name: string;
    require_tls: boolean;
    skip_verification: boolean;
    state: string;
    wildcard: boolean;
    spam_action: string;
    created_at: string;
    smtp_password: string;
    smtp_login: string;
    type: string;
    receiving_dns_records: DNSRecord[] | null;
    sending_dns_records: DNSRecord[] | null;
    constructor(data: DomainShortData, receiving?: DNSRecord[] | null, sending?: DNSRecord[] | null);
}
export default class DomainClient {
    request: Request;
    domainCredentials: IDomainCredentials;
    domainTemplates: IDomainTemplatesClient;
    domainTags: IDomainTagsClient;
    constructor(request: Request, domainCredentialsClient: DomainCredentialsClient, domainTemplatesClient: DomainTemplatesClient, domainTagsClient: DomainTagsClient);
    private _parseMessage;
    private parseDomainList;
    private _parseDomain;
    private _parseTrackingSettings;
    private _parseTrackingUpdate;
    list(query?: DomainsQuery): Promise<Domain[]>;
    get(domain: string): Promise<Domain>;
    create(data: DomainInfo): Promise<Domain>;
    verify(domain: string): Promise<Domain>;
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
//# sourceMappingURL=domains.d.ts.map