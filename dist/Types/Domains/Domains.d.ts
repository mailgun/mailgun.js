export type DomainsQuery = {
    authority?: string;
    state?: 'active' | 'unverified' | 'disabled';
    limit?: number;
    skip?: number;
};
export type DomainUpdateInfo = {
    spam_action?: 'disabled' | 'block' | 'tag';
    web_scheme?: 'http' | 'https';
    wildcard?: boolean | 'true' | 'false';
};
export type DomainUpdateInfoReq = DomainUpdateInfo & {
    wildcard?: 'true' | 'false';
};
export type DomainInfo = DomainUpdateInfo & {
    name: string;
    smtp_password: string;
    force_dkim_authority?: boolean | 'true' | 'false';
    dkim_key_size?: 1024 | 2048;
    ips?: '';
    pool_id?: '';
};
export type DomainInfoReq = DomainInfo & {
    force_dkim_authority?: 'true' | 'false';
};
export type BoolToString = {
    force_dkim_authority?: DomainInfo['force_dkim_authority'];
    wildcard?: DomainUpdateInfo['wildcard'];
};
export type DomainShortData = {
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
export type DomainData = DomainShortData & {
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
    priority?: string;
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
export type DomainListResponseData = {
    status: number;
    body: {
        items: DomainsListItem[] | null;
        total_count: number;
    };
};
export type MessageResponse = {
    message: string;
};
export type DestroyedDomainResponse = {
    status: number;
    body: MessageResponse;
};
export type ConnectionSettings = {
    require_tls: boolean;
    skip_verification: boolean;
};
export type ConnectionSettingsResponse = {
    body: {
        connection: ConnectionSettings;
    };
    status: number;
};
export type UpdatedConnectionSettings = {
    message: string;
    require_tls: boolean;
    skip_verification: boolean;
};
export type UpdatedConnectionSettingsRes = {
    body: UpdatedConnectionSettings;
    status: number;
};
export type DKIMAuthorityInfo = {
    self: boolean | 'yes' | 'no' | 'true' | 'false';
};
export type UpdatedDKIMAuthority = {
    changed: boolean;
    message: string;
    sending_dns_records: DNSRecord[];
};
export type UpdatedDKIMAuthorityResponse = {
    body: UpdatedDKIMAuthority;
    status: number;
};
export type DKIMSelectorInfo = {
    dkimSelector: string;
};
export type UpdatedDKIMSelectorResponse = {
    body: MessageResponse;
    status: number;
};
export type WebPrefixInfo = {
    webPrefix: string;
};
export type UpdatedWebPrefix = {
    message: string;
};
export type UpdatedWebPrefixResponse = {
    body: MessageResponse;
    status: number;
};
export type ReplacementForPool = {
    pool_id?: string;
    ip?: string;
};
export type TDomain = {
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
    id?: string;
    is_disabled?: boolean;
    web_prefix?: string;
    web_scheme?: string;
};
