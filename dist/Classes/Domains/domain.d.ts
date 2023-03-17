import { DNSRecord, DomainShortData, TDomain } from '../../Types/Domains';
export default class Domain implements TDomain {
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
