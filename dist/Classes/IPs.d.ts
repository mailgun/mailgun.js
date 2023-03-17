import MgRequest from './common/Request';
import { IpData, IpsListResponseBody } from '../Types/IPs';
import { IIPsClient } from '../Interfaces';
export default class IpsClient implements IIPsClient {
    request: MgRequest;
    constructor(request: MgRequest);
    list(query: any): Promise<IpsListResponseBody>;
    get(ip: string): Promise<IpData>;
    private parseIpsResponse;
}
