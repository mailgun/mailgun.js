declare const MgRequest: any;
import { IpPool } from "./interfaces/IpPools";
export default class IpPoolsClient {
    request: typeof MgRequest;
    constructor(request: typeof MgRequest);
    list(query: any): IpPool[];
    create(data: {
        name: string;
        description?: string;
        ips?: string[];
    }): any;
    update(poolId: string, data: {
        name: string;
        description: string;
        add_ip: string;
        remove_ip: string;
    }): any;
    delete(poolId: string, data: {
        id: string;
        pool_id: string;
    }): any;
    private parseIpPoolsResponse;
}
export {};
