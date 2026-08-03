import Request from './common/Request.js';
import { IPAddress, IpPoolCreateData, IpPoolCreateResult, IpPoolDeleteData, IpPoolDetails, IpPoolLinkedDomains, IpPoolLinkedDomainsQuery, IpPoolListResult, IpPoolMessageResult, IpPoolUpdateData } from '../Types/index.js';
import { IIPPoolsClient } from '../Interfaces/index.js';
export default class IpPoolsClient implements IIPPoolsClient {
    request: Request;
    constructor(request: Request);
    private isValidIp;
    list(): Promise<IpPoolListResult>;
    get(poolId: string): Promise<IpPoolDetails>;
    create(data: IpPoolCreateData): Promise<IpPoolCreateResult>;
    update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult>;
    delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult>;
    linkedDomains(poolId: string, query?: IpPoolLinkedDomainsQuery): Promise<IpPoolLinkedDomains>;
    addIp(poolId: string, ip: string): Promise<IpPoolMessageResult>;
    removeIp(poolId: string, ip: string): Promise<IpPoolMessageResult>;
    delegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>;
    revokeDelegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>;
    addIps(poolId: string, ips: string[]): Promise<IpPoolMessageResult>;
    removeIpFromDomainPool(domain: string, ip: IPAddress, replacementIp?: IPAddress): Promise<IpPoolMessageResult>;
    removeDomainPool(domain: string): Promise<IpPoolMessageResult>;
    unlinkDomainPool(domain: string, ipPool: string, replacementIpPoolId?: string): Promise<IpPoolMessageResult>;
}
