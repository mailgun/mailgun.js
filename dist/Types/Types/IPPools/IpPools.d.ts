import { MessageResponseWithStatus } from '../Common/ApiResponse.js';
export type IpPool = {
    description: string;
    ips: string[];
    is_linked: boolean;
    is_inherited: boolean;
    metadata: {
        assignments: Record<string, {
            linked_at: string;
        }>;
    };
    name: string;
    pool_id: string;
};
export type IpPoolDetails = {
    details: Omit<IpPool, 'is_inherited' | 'metadata' | 'ips'> & {
        linked_domains: string[];
    };
    ips: string[] | null;
    message: string;
    status: number;
};
export type IpPoolListResponse = {
    body: {
        ip_pools: IpPool;
        message: string;
    };
    status: number;
};
export type IpPoolListResult = {
    ip_pools: IpPool;
    message: string;
    status: number;
};
export type IpPoolUpdateData = {
    name?: string;
    description?: string;
    add_ip?: string;
    link_domain?: string;
    remove_ip?: string;
    unlink_domain?: string;
};
export type IpPoolMessageResponse = {
    body: {
        message: string;
    };
    status: number;
};
export type IpPoolMessageResult = MessageResponseWithStatus;
export type IpPoolUpdateResult = MessageResponseWithStatus & {
    reference_id: string;
};
export type IpPoolUpdateResponse = {
    body: {
        reference_id: string;
        message: string;
    };
    status: number;
};
export type IpPoolDeleteData = {
    ip?: string;
    pool_id?: string;
};
export type IpPoolCreateData = {
    name: string;
    description?: string;
    ips?: string[];
};
export type IpPoolCreateResponse = {
    body: {
        message: string;
        pool_id: string;
    };
    status: number;
};
export type IpPoolCreateResult = {
    status: number;
    message: string;
    pool_id: string;
};
export type IpPoolLinkedDomainsQuery = {
    limit?: number;
    page?: string;
};
export type IpPoolLinkedDomains = {
    domains: {
        id: string;
        name: string;
    }[];
    paging: {
        first: string;
        next: string;
    };
    status: number;
};
export type MultipleIps = {
    ips: string[];
};
