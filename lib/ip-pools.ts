/* eslint-disable camelcase */
import Request from './request';

import { IpPool, IpPoolListResponse, IpPoolUpdateData } from './interfaces/IpPools';

export default class IpPoolsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(query: any): Promise<IpPool[]> {
    return this.request.get('/v1/ip_pools', query)
      .then((response: IpPoolListResponse) => this.parseIpPoolsResponse(response));
  }

  create(data: { name: string, description?: string, ips?: string[] }) {
    return this.request.post('/v1/ip_pools', data)
      .then((response: { body: { message: string, pool_id: string } }) => response?.body);
  }

  update(poolId: string, data: IpPoolUpdateData) : Promise<any> {
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
