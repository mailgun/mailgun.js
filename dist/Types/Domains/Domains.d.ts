export type DomainsQuery = {
    limit?: number;
    skip?: number;
    state?: 'active' | 'unverified' | 'disabled';
    sort?: 'name:asc' | 'name: desc';
    authority?: string;
    search?: string;
};
export type DomainUpdateInfo = {
    spam_action?: 'disabled' | 'block' | 'tag';
    web_scheme?: 'http' | 'https';
    wildcard?: boolean | 'true' | 'false';
    mailfrom_host?: string;
    message_ttl?: number;
    smtp_password?: string;
    use_automatic_sender_security?: boolean | 'true' | 'false';
    web_prefix?: string;
};
export type DomainUpdateInfoReq = Omit<DomainUpdateInfo, 'message_ttl'> & {
    wildcard?: 'true' | 'false';
    use_automatic_sender_security?: 'true' | 'false';
};
export type DomainInfo = DomainUpdateInfo & {
    name: string;
    dkim_host_name?: string;
    dkim_key_size?: 1024 | 2048;
    dkim_selector?: string;
    encrypt_incoming_message?: boolean | 'true' | 'false';
    force_dkim_authority?: boolean | 'true' | 'false';
    force_root_dkim_host?: boolean | 'true' | 'false';
    pool_id?: '';
    ips?: '';
};
export type DomainInfoReq = DomainInfo & {
    force_dkim_authority?: 'true' | 'false';
};
export type BoolToString = {
    encrypt_incoming_message: DomainInfo['encrypt_incoming_message'];
    force_dkim_authority: DomainInfo['force_dkim_authority'];
    force_root_dkim_host: DomainInfo['force_root_dkim_host'];
    wildcard: DomainInfo['wildcard'];
    use_automatic_sender_security: DomainInfo['use_automatic_sender_security'];
};
export type DomainData = {
    id: string;
    is_disabled: boolean;
    web_prefix: string;
    web_scheme: string;
    use_automatic_sender_security: boolean;
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
    dkim_host?: string;
    mailfrom_host?: string;
};
export interface DomainsListItem extends DomainData {
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
    require_tls?: boolean;
    skip_verification?: boolean;
};
export type ConnectionSettingsResponse = {
    body: ConnectionSettings;
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
export type UpdatedDKIMSelectorResult = MessageResponse & {
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
    created_at: Date;
    smtp_password: string;
    smtp_login: string;
    type: string;
    receiving_dns_records: DNSRecord[] | null;
    sending_dns_records: DNSRecord[] | null;
    id: string;
    is_disabled: boolean;
    web_prefix: string;
    web_scheme: string;
    use_automatic_sender_security: boolean;
    message?: string;
    dkim_host?: string;
    mailfrom_host?: string;
};
export type DomainDynamicPropsType = Pick<DomainData, 'dkim_host' | 'mailfrom_host'>;
export type DomainGetQuery = {
    extended?: boolean;
    with_dns?: boolean;
};
