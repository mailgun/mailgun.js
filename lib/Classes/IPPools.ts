/* eslint-disable camelcase */
import Request from './common/Request.js';

import {
  IpPoolCreateData,
  IpPoolCreateResponse,
  IpPoolCreateResult,
  IpPoolDeleteData,
  IpPoolListResponse,
  IpPoolListResult,
  IpPoolMessageResponse,
  IpPoolMessageResult,
  IpPoolUpdateData,
} from '../Types/index.js';
import { IIPPoolsClient } from '../Interfaces/index.js';

export default class IpPoolsClient implements IIPPoolsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(): Promise<IpPoolListResult> {
    return this.request.get('/v1/ip_pools')
      .then((response: IpPoolListResponse) => this.parseIpPoolsResponse(response));
  }

  async create(data: IpPoolCreateData): Promise<IpPoolCreateResult> {
    const response: IpPoolCreateResponse = await this.request.postWithFD('/v1/ip_pools', data);
    return {
      status: response.status,
      ...response.body
    };
  }

  async update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.patchWithFD(`/v1/ip_pools/${poolId}`, data);
    return {
      status: response.status,
      ...response.body
    };
  }

  async delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult> {
    const response:IpPoolMessageResponse = await this.request.delete(`/v1/ip_pools/${poolId}`, data);
    return {
      status: response.status,
      ...response.body
    };
  }

  private parseIpPoolsResponse(response: IpPoolListResponse): IpPoolListResult {
    return {
      status: response.status,
      ...response.body
    };
  }
}
