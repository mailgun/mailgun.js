const MgRequest = require('./request');
import { IpData, IpsListResponseBody } from './interfaces/Ips';

export default class IpsClient {
  request: typeof MgRequest;

  constructor(request: typeof MgRequest) {
    this.request = request;
  }

  list(query: any) {
    return this.request.get('/v3/ips', query)
      .then((response: { body: IpsListResponseBody }) => this.parseIpsResponse(response));
  }

  get(ip: string) {
    return this.request.get(`/v3/ips/${ip}`)
      .then((response: { body: IpData }) => this.parseIpsResponse(response));
  }

  private parseIpsResponse(response: { body: IpsListResponseBody | IpData }) {
    return response.body;
  }
}
