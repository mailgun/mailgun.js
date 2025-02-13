export type IpPool = {
    description: string;
    ips: string[];
    is_linked: boolean;
    name: string;
    pool_id: string;
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
    name: string;
    description: string;
    ips: string[];
};
export type IpPoolMessageResponse = {
    body: {
        message: string;
    };
    status: number;
};
export type IpPoolMessageResult = {
    message: string;
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
