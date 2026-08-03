export type IPv4Address = string & { readonly __brand: 'IPv4Address' };
export type IPv6Address = string & { readonly __brand: 'IPv6Address' };
export type IPAddress = IPv4Address | IPv6Address;

export type IPAddressQuery = {
  ip: string; // URL encoded IP address (IPv4 or IPv6) to be used in the query parameter
};

export type IpPoolQuery = {
  pool_id: string; // URL encoded IP pool ID to be used in the query parameter
};
