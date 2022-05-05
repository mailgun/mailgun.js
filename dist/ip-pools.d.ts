import Request from './request';
import { IpPoolCreateData, IpPoolCreateResult, IpPoolDeleteData, IpPoolListResult, IpPoolMessageResult, IpPoolUpdateData } from './interfaces/IpPools';
export default class IpPoolsClient {
    request: Request;
    constructor(request: Request);
    list(): Promise<IpPoolListResult>;
    create(data: IpPoolCreateData): Promise<IpPoolCreateResult>;
    update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult>;
    delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult>;
    private parseIpPoolsResponse;
}
