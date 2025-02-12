import { DNSRecord, DomainData, TDomain } from '../../Types/Domains/index.js';
export default class Domain implements TDomain {
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
    dkim_host?: string;
    mailfrom_host?: string;
    constructor(data: DomainData, receiving?: DNSRecord[] | null, sending?: DNSRecord[] | null);
}
