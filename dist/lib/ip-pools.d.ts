import Request from './request';
import { IpPool, IpPoolUpdateData } from './interfaces/IpPools';
export default class IpPoolsClient {
    request: Request;
    constructor(request: Request);
    list(query: any): Promise<IpPool[]>;
    create(data: {
        name: string;
        description?: string;
        ips?: string[];
    }): Promise<{
        message: string;
        pool_id: string;
    }>;
    update(poolId: string, data: IpPoolUpdateData): Promise<any>;
    delete(poolId: string, data: {
        id: string;
        pool_id: string;
    }): Promise<any>;
    private parseIpPoolsResponse;
}
