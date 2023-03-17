export declare type DomainsQuery = {
    authority?: string;
    state?: 'active' | 'unverified' | 'disabled';
    limit?: number;
    skip?: number;
};
export declare type DomainInfo = {
    name: string;
    smtp_password: string;
    spam_action?: 'disabled' | 'block' | 'tag';
    wildcard?: boolean;
    force_dkim_authority?: boolean | 'true' | 'false';
    dkim_key_size?: 1024 | 2048;
    ips?: '';
    pool_id?: '';
    web_scheme: 'http' | 'https';
};
export declare type DomainShortData = {
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
};
export declare type DomainData = DomainShortData & {
    id: string;
    is_disabled: boolean;
    web_prefix: string;
    web_scheme: string;
};
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
export declare type DomainResponseData = {
    status: number;
    body: {
        domain: DomainData;
        message?: string;
        receiving_dns_records: DNSRecord[];
        sending_dns_records: DNSRecord[];
    };
};
export declare type DomainListResponseData = {
    status: number;
    body: {
        items: DomainsListItem[] | null;
        total_count: number;
    };
};
export declare type MessageResponse = {
    message: string;
};
export declare type DestroyedDomainResponse = {
    status: number;
    body: MessageResponse;
};
export declare type ConnectionSettings = {
    require_tls: boolean;
    skip_verification: boolean;
};
export declare type ConnectionSettingsResponse = {
    body: {
        connection: ConnectionSettings;
    };
    status: number;
};
export declare type UpdatedConnectionSettings = {
    message: string;
    require_tls: boolean;
    skip_verification: boolean;
};
export declare type UpdatedConnectionSettingsRes = {
    body: UpdatedConnectionSettings;
    status: number;
};
export declare type DKIMAuthorityInfo = {
    self: boolean | 'yes' | 'no' | 'true' | 'false';
};
export declare type UpdatedDKIMAuthority = {
    changed: boolean;
    message: string;
    sending_dns_records: DNSRecord[];
};
export declare type UpdatedDKIMAuthorityResponse = {
    body: UpdatedDKIMAuthority;
    status: 200;
};
export declare type DKIMSelectorInfo = {
    dkimSelector: string;
};
export declare type UpdatedDKIMSelectorResponse = {
    body: MessageResponse;
    status: number;
};
export declare type WebPrefixInfo = {
    webPrefix: string;
};
export declare type UpdatedWebPrefix = {
    message: string;
};
export declare type UpdatedWebPrefixResponse = {
    body: MessageResponse;
    status: number;
};
export declare type ReplacementForPool = {
    pool_id?: string;
    ip?: string;
};
