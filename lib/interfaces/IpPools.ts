/* eslint-disable camelcase */
export interface IpPool {
  description: string;
  ips: string[];
  is_linked: boolean;
  name: string;
  pool_id: string;
}

export interface IpPoolListResponse {
  body: {
    ip_pools: IpPool,
    message: string
  }
}

export interface IpPoolUpdateData {
  name: string,
  description: string,
  add_ip: string,
  remove_ip: string
}
