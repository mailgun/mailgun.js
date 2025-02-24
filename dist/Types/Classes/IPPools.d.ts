import Request from './common/Request.js';
import { IpPoolCreateData, IpPoolCreateResult, IpPoolDeleteData, IpPoolListResult, IpPoolMessageResult, IpPoolUpdateData } from '../Types/index.js';
import { IIPPoolsClient } from '../Interfaces/index.js';
export default class IpPoolsClient implements IIPPoolsClient {
    request: Request;
    constructor(request: Request);
    list(): Promise<IpPoolListResult>;
    create(data: IpPoolCreateData): Promise<IpPoolCreateResult>;
    update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult>;
    delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult>;
    private parseIpPoolsResponse;
}
