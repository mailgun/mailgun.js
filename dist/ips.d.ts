import MgRequest from './request';
import { IpData, IpsListResponseBody } from './interfaces/Ips';
export default class IpsClient {
    request: MgRequest;
    constructor(request: MgRequest);
    list(query: any): Promise<IpsListResponseBody | IpData>;
    get(ip: string): Promise<IpsListResponseBody | IpData>;
    private parseIpsResponse;
}
