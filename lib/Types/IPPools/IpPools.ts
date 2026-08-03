import { MessageResponseWithStatus } from '../Common/ApiResponse.js';

/* eslint-disable camelcase */
export type IpPool = {
  description: string;
  ips: string[];
  is_linked: boolean;
  name: string;
  pool_id: string;
}

export type IpPoolDetails = {
  details: IpPool & {
    linked_domains: string[];
  },
  message: string;
  status: number;
}

export type IpPoolListResponse = {
  body: {
    ip_pools: IpPool,
    message: string
  },
  status: number
}

export type IpPoolListResult = {
  ip_pools: IpPool,
  message: string,
  status: number
}

export type IpPoolUpdateData = {
  name: string,
  description: string,
  ips: string[]
}

export type IpPoolMessageResponse = {
  body: {
    message: string;
  }
  status: number;
}

export type IpPoolMessageResult = MessageResponseWithStatus

export type IpPoolDeleteData = {
  ip?: string,
  pool_id?: string
}

export type IpPoolCreateData = {
  name: string;
  description?: string;
  ips?: string[];
}

export type IpPoolCreateResponse = {
  body: {
    message: string;
    pool_id: string;
  }
  status: number
}

export type IpPoolCreateResult = {
  status: number
  message: string;
  pool_id: string;
}

export type IpPoolLinkedDomainsQuery = {
  limit?: number;
  page?: string;
}

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
}

export type MultipleIps = {
  ips: string[];
}
