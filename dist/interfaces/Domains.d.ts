export type DomainsQuery = {
    authority?: string;
    state?: 'active' | 'unverified' | 'disabled';
    limit?: number;
    skip?: number;
};
export interface DomainInfo {
    name: string;
    smtp_password: string;
    spam_action?: 'disabled' | 'block' | 'tag';
    wildcard?: boolean;
    force_dkim_authority?: boolean | 'true' | 'false';
    dkim_key_size?: 1024 | 2048;
    ips?: '';
    pool_id?: '';
    web_scheme: 'http' | 'https';
}
export interface DomainShortData {
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
}
export interface DomainData extends DomainShortData {
    id: string;
    is_disabled: boolean;
    web_prefix: string;
    web_scheme: string;
}
export interface DomainsListItem extends DomainShortData {
    receiving_dns_records: null;
    sending_dns_records: null;
}
export interface DNSRecord {
    cached: any[];
    name: string;
    record_type: string;
    valid: string;
    value: string;
}
export type DomainResponseData = {
    status: number;
    body: {
        domain: DomainData;
        message?: string;
        receiving_dns_records: DNSRecord[];
        sending_dns_records: DNSRecord[];
    };
};
export interface DomainListResponseData {
    status: number;
    body: {
        items: DomainsListItem[] | null;
        total_count: number;
    };
}
export interface MessageResponse {
    message: string;
}
export interface DestroyedDomainResponse {
    status: number;
    body: MessageResponse;
}
export type ConnectionSettings = {
    require_tls: boolean;
    skip_verification: boolean;
};
export interface ConnectionSettingsResponse {
    body: {
        connection: ConnectionSettings;
    };
    status: number;
}
export interface UpdatedConnectionSettings {
    message: string;
    require_tls: boolean;
    skip_verification: boolean;
}
export interface UpdatedConnectionSettingsRes {
    body: UpdatedConnectionSettings;
    status: number;
}
export interface DKIMAuthorityInfo {
    self: boolean | 'yes' | 'no' | 'true' | 'false';
}
export interface UpdatedDKIMAuthority {
    changed: boolean;
    message: string;
    sending_dns_records: DNSRecord[];
}
export interface UpdatedDKIMAuthorityResponse {
    body: UpdatedDKIMAuthority;
    status: 200;
}
export interface DKIMSelectorInfo {
    dkimSelector: string;
}
export interface UpdatedDKIMSelectorResponse {
    body: MessageResponse;
    status: number;
}
export interface WebPrefixInfo {
    webPrefix: string;
}
export interface UpdatedWebPrefix {
    message: string;
}
export interface UpdatedWebPrefixResponse {
    body: MessageResponse;
    status: number;
}
export interface ReplacementForPool {
    pool_id?: string;
    ip?: string;
}
