import MgRequest from './common/Request.js';
import { IpData, IPsListQuery, IpsListResponseBody } from '../Types/IPs/index.js';
import { IIPsClient } from '../Interfaces/index.js';

export default class IpsClient implements IIPsClient {
  request: MgRequest;

  constructor(request: MgRequest) {
    this.request = request;
  }

  async list(query?: IPsListQuery): Promise<IpsListResponseBody> {
    const response = await this.request.get('/v3/ips', query);
    return this.parseIpsResponse<IpsListResponseBody>(response);
  }

  async get(ip: string): Promise<IpData> {
    const response = await this.request.get(`/v3/ips/${ip}`);
    return this.parseIpsResponse<IpData>(response);
  }

  private parseIpsResponse<T>(response: { body: T }): T {
    return response.body;
  }
}
