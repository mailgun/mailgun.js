/* eslint-disable camelcase */
export interface DomainsQuery {
    authority : string;
    state: 'active' | 'unverified' | 'disabled';
    limit: number;
    skip: number;
}

export interface DomainInfo {
    name: string;
    smtp_password: string;
    spam_action?: 'disabled' | 'block' | 'tag';
    wildcard?: boolean;
    force_dkim_authority?: true;
    dkim_key_size?: 1024 | 2048;
    ips?: '';
    pool_id?: '';
    web_scheme: 'http' | 'https'
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
export interface DomainData extends DomainShortData{
    id: string;
    is_disabled: boolean;
    web_prefix: string;
    web_scheme: string;
}

export interface DomainsListItem extends DomainShortData{
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

export interface DomainResponseData {
    status: number;
    body: {
        domain: DomainData;
        message?: string;
        receiving_dns_records: DNSRecord[];
        sending_dns_records: DNSRecord[];
    }
}

export interface DomainListResponseData {
    status: number;
    body: {
        items: DomainsListItem[];
        total_count: number;
    }
}

export interface DestroyedDomain {
    message: string;
}

export interface DestroyedDomainResponse {
    status: number;
    body: {
        message: string;
    }
}
