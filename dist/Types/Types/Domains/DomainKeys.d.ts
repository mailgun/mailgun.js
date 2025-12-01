import type { PagesList, ParsedPagesList } from '../index.js';
import type { DNSRecord } from './index.js';
export type DomainKeyItem = {
    'signing_domain': string;
    selector: string;
    'dns_record': Omit<DNSRecord, 'priority'> & {
        'is_active': boolean;
    };
};
export type DomainKeyCreateDataResult = Omit<DomainKeyItem, 'dns_record'> & {
    'dns_record': Omit<DNSRecord, 'priority'> & {
        'is_active': boolean;
    };
    status: number;
};
export type DomainKeyCreateData = {
    signingDomain: string;
    selector: string;
    bits?: '1024' | '2048';
    pem?: string;
};
export type DomainKeyCreateDataApi = Omit<DomainKeyCreateData, 'signingDomain'> & {
    'signing_domain': string;
};
export type DomainKeysList = {
    items: DomainKeyItem[];
};
export type DomainKeysListResult = {
    items: DomainKeyItem[];
    status: number;
};
export type DomainKeysListAllQuery = {
    page?: string;
    limit?: number;
    signingDomain?: string;
    selector?: string;
};
export type DomainKeysListAllResult = {
    items: DomainKeyItem[];
    status: number;
    pages: ParsedPagesList;
};
export type DomainKeysListAllApi = {
    status: number;
    body: {
        items: DomainKeyItem[];
        paging: PagesList;
    };
};
export type DeletedDomainKeysQuery = {
    'signing_domain': string;
    selector: string;
};
export type DeletedDomainKeysResult = {
    message: string;
};
export type ActivateDomainKeyResponse = {
    message: string;
    authority: string;
    selector: string;
    active: boolean;
    status: number;
};
export type DeactivateDomainKeyResponse = {
    message: string;
    authority: string;
    selector: string;
    active: boolean;
    status: number;
};
