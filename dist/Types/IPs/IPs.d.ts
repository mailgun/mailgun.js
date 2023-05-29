export type IpsListResponseBody = {
    assignable_to_pools: boolean;
    items: string[];
    total_count: number;
};
export type IpData = {
    ip: string;
    dedicated: boolean;
    rdns: string;
};
export type IPsListQuery = {
    dedicated: boolean | string;
};
