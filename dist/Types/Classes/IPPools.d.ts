import Request from './common/Request.js';
import { IPAddress, IpPoolCreateData, IpPoolCreateResult, IpPoolDeleteData, IpPoolDetails, IpPoolLinkedDomains, IpPoolLinkedDomainsQuery, IpPoolListResult, IpPoolMessageResult, IpPoolUpdateData, IpPoolUpdateResult } from '../Types/index.js';
import { IIPPoolsClient } from '../Interfaces/index.js';
export default class IpPoolsClient implements IIPPoolsClient {
    request: Request;
    constructor(request: Request);
    private isValidIp;
    list(): Promise<IpPoolListResult>;
    get(poolId: string): Promise<IpPoolDetails>;
    create(data: IpPoolCreateData): Promise<IpPoolCreateResult>;
    update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolUpdateResult>;
    destroy(poolId: string, data: IpPoolDeleteData): Promise<IpPoolUpdateResult>;
    linkedDomains(poolId: string, query?: IpPoolLinkedDomainsQuery): Promise<IpPoolLinkedDomains>;
    addIp(poolId: string, ip: string): Promise<IpPoolUpdateResult>;
    removeIp(poolId: string, ip: string): Promise<IpPoolUpdateResult>;
    delegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>;
    revokeDelegation(poolId: string, subAccountId: string): Promise<IpPoolUpdateResult>;
    addIps(poolId: string, ips: string[]): Promise<IpPoolUpdateResult>;
    removeIpFromDomainPool(domain: string, ip: IPAddress, replacementIp?: IPAddress): Promise<IpPoolMessageResult>;
    removeDomainPool(domain: string): Promise<IpPoolMessageResult>;
    unlinkDomainPool(domain: string, replacementPoolId: string): Promise<IpPoolMessageResult>;
}
