import MgRequest from './common/Request.js';
import { IpData, IPsListQuery, IpsListResponseBody } from '../Types/IPs/index.js';
import { IIPsClient } from '../Interfaces/index.js';
export default class IpsClient implements IIPsClient {
    request: MgRequest;
    constructor(request: MgRequest);
    list(query?: IPsListQuery): Promise<IpsListResponseBody>;
    get(ip: string): Promise<IpData>;
    private parseIpsResponse;
}
