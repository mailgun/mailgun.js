import MgRequest from './request';
import { IpData, IpsListResponseBody } from './interfaces/Ips';

export default class IpsClient {
  request: MgRequest;

  constructor(request: MgRequest) {
    this.request = request;
  }

  async list(query: any): Promise<IpsListResponseBody> {
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
