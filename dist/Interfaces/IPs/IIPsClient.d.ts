import { IpData, IpsListResponseBody } from '../../Types/IPs';
export interface IIPsClient {
    list(query: any): Promise<IpsListResponseBody>;
    get(ip: string): Promise<IpData>;
}
