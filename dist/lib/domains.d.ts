import { DomainsQuery, DomainInfo, DomainShortData, DNSRecord, ConnectionSettings, UpdatedConnectionSettings, DKIMAuthorityInfo, UpdatedDKIMAuthority, DKIMSelectorInfo, UpdatedDKIMSelectorResponse, WebPrefixInfo, UpdatedWebPrefixResponse, ReplacementForPool, MessageResponse } from './interfaces/Domains';
import APIResponse from './interfaces/ApiResponse';
import Request from './request';
import { DomainTrackingData, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, UpdatedOpenTracking } from './interfaces/DomainTracking';
import DomainCredentialsClient from './domainsCredentials';
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
    domainCredentials: DomainCredentialsClient;
    constructor(request: Request, domainCredentialsClient: DomainCredentialsClient);
    private _parseMessage;
    private _parseDomainList;
    private _parseDomain;
    private _parseTrackingSettings;
    private _parseTrackingUpdate;
    list(query?: DomainsQuery): Promise<Domain[]>;
    get(domain: string): Promise<Domain>;
    create(data: DomainInfo): Promise<Domain>;
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
