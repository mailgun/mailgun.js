import {
  IpPoolCreateData, IpPoolCreateResult,
  IpPoolDeleteData, IpPoolDetails,
  IpPoolLinkedDomains, IpPoolLinkedDomainsQuery,
  IpPoolListResult, IpPoolMessageResult,
  IpPoolUpdateData
} from '../../Types/IPPools/index.js';

export interface IIPPoolsClient {
  list(): Promise<IpPoolListResult>
  get(poolId: string): Promise<IpPoolDetails>
  create(data: IpPoolCreateData): Promise<IpPoolCreateResult>
  update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult>
  delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult>
  linkedDomains(poolId: string, query?: IpPoolLinkedDomainsQuery): Promise<IpPoolLinkedDomains>
  addIp(poolId: string, ip: string): Promise<IpPoolMessageResult>
  removeIp(poolId: string, ip: string): Promise<IpPoolMessageResult>
  delegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>
  revokeDelegation(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>
  addIps(poolId: string, ips: string[]): Promise<IpPoolMessageResult>
  removeIpFromDomainPool(
    domain: string,
    ipPool: string,
    replacementPoolId?: string
  ): Promise<IpPoolMessageResult>
  removeDomainPool(domain: string): Promise<IpPoolMessageResult>
  unlinkDomainPool(
    domain: string,
    ipPool: string,
    replacementPoolId?: string
  ): Promise<IpPoolMessageResult>
}
