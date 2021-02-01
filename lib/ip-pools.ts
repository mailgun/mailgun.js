const MgRequest = require('./request');

import { IpPool } from "./interfaces/IpPools";

export default class IpPoolsClient {
  request: typeof MgRequest;

  constructor(request: typeof MgRequest) {
    this.request = request;
  }

  list(query: any): IpPool[] {
    return this.request.get('/v1/ip_pools', query)
      .then((response: { body: { ip_pools: IpPool, message: string } }) => this.parseIpPoolsResponse(response));
  }

  create(data: { name: string, description?: string, ips?: string[] }) {
    return this.request.post('/v1/ip_pools', data)
      .then((response: { body: { message: string, pool_id: string } }) => response?.body);
  }

  update(poolId: string, data: { name: string, description: string, add_ip: string, remove_ip: string }) {
    return this.request.patch(`/v1/ip_pools/${poolId}`, data)
      .then((response: { body: any }) => response?.body);
  }

  delete(poolId: string, data: { id: string, pool_id: string }) {
    return this.request.delete(`/v1/ip_pools/${poolId}`, data)
      .then((response: { body: any }) => response?.body);
  }

  private parseIpPoolsResponse(response: { body: any | any }) {
    return response.body.ip_pools;
  }
}
