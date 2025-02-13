import { IpData, IPsListQuery, IpsListResponseBody } from '../../Types/IPs/index.js';
export interface IIPsClient {
    list(query: IPsListQuery): Promise<IpsListResponseBody>;
    get(ip: string): Promise<IpData>;
}
