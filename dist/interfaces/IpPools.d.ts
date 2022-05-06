export interface IpPool {
    description: string;
    ips: string[];
    is_linked: boolean;
    name: string;
    pool_id: string;
}
export interface IpPoolListResponse {
    body: {
        ip_pools: IpPool;
        message: string;
    };
    status: number;
}
export interface IpPoolListResult {
    ip_pools: IpPool;
    message: string;
    status: number;
}
export declare type IpPoolUpdateData = {
    name: string;
    description: string;
    ips: string[];
};
export declare type IpPoolMessageResponse = {
    body: {
        message: string;
    };
    status: number;
};
export declare type IpPoolMessageResult = {
    message: string;
    status: number;
};
export declare type IpPoolDeleteData = {
    ip?: string;
    pool_id?: string;
};
export declare type IpPoolCreateData = {
    name: string;
    description?: string;
    ips?: string[];
};
export declare type IpPoolCreateResponse = {
    body: {
        message: string;
        pool_id: string;
    };
    status: number;
};
export declare type IpPoolCreateResult = {
    status: number;
    message: string;
    pool_id: string;
};
