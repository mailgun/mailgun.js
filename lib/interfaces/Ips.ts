export interface IpsListResponseBody {
  assignable_to_pools: boolean;
  items: string[];
  total_count: number;
}

export interface IpData {
  ip: string;
  dedicated: boolean;
  rdns: string;
}
