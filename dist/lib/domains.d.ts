import { DomainResponseData, DestroyedDomain, DestroyedDomainResponse, DomainsQuery, DomainInfo, DomainListResponseData, DomainShortData, DNSRecord } from './interfaces/Domains';
import APIResponse from './interfaces/ApiResponse';
import Request from './request';
import { DomainTrackingResponse, DomainTrackingData, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, UpdateDomainTrackingResponse, UpdatedOpenTracking } from './interfaces/DomainTracking';
declare class Domain {
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
    constructor(request: Request);
    _parseMessage(response: DestroyedDomainResponse): DestroyedDomain;
    _parseDomainList(response: DomainListResponseData): Domain[];
    _parseDomain(response: DomainResponseData): Domain;
    _parseTrackingSettings(response: DomainTrackingResponse): DomainTrackingData;
    _parseTrackingUpdate(response: UpdateDomainTrackingResponse): UpdatedOpenTracking;
    list(query: DomainsQuery): Promise<Domain[]>;
    get(domain: string): Promise<Domain>;
    create(data: DomainInfo): Promise<Domain>;
    destroy(domain: string): Promise<DestroyedDomain>;
    getTracking(domain: string): Promise<DomainTrackingData>;
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
    getIps(domain: string): Promise<string[]>;
    assignIp(domain: string, ip: string): Promise<APIResponse>;
    deleteIp(domain: string, ip: string): Promise<APIResponse>;
    linkIpPool(domain: string, pool_id: string): Promise<APIResponse>;
    unlinkIpPoll(domain: string, pool_id: string, ip: string): Promise<APIResponse>;
}
export {};
