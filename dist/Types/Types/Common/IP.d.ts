export type IPv4Address = string & {
    readonly __brand: 'IPv4Address';
};
export type IPv6Address = string & {
    readonly __brand: 'IPv6Address';
};
export type IPAddress = IPv4Address | IPv6Address;
export type IPAddressQuery = {
    ip: string;
};
export type IpPoolQuery = {
    pool_id: string;
};
