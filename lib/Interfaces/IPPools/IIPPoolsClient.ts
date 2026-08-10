import {
  IpPoolCreateData, IpPoolCreateResult,
  IpPoolDeleteData, IpPoolDetails,
  IpPoolLinkedDomains, IpPoolLinkedDomainsQuery,
  IpPoolListResult, IpPoolMessageResult,
  IpPoolUpdateData,
  IpPoolUpdateResult
} from '../../Types/IPPools/index.js';

export interface IIPPoolsClient {
  list(): Promise<IpPoolListResult>
  get(poolId: string): Promise<IpPoolDetails>
  create(data: IpPoolCreateData): Promise<IpPoolCreateResult>
  update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolUpdateResult>
  destroy(poolId: string, data: IpPoolDeleteData): Promise<IpPoolUpdateResult>
  linkedDomains(poolId: string, query?: IpPoolLinkedDomainsQuery): Promise<IpPoolLinkedDomains>
  addIp(poolId: string, ip: string): Promise<IpPoolUpdateResult>
  removeIp(poolId: string, ip: string): Promise<IpPoolUpdateResult>
  delegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult>
  revokeDelegation(poolId: string, subAccountId: string): Promise<IpPoolUpdateResult>
  addIps(poolId: string, ips: string[]): Promise<IpPoolUpdateResult>
  removeIpFromDomainPool(
    domain: string,
    ip: string,
    replacementPoolId?: string
  ): Promise<IpPoolMessageResult>
  removeDomainPool(domain: string): Promise<IpPoolMessageResult>
  unlinkDomainPool(
    domain: string,
    replacementPoolId: string
  ): Promise<IpPoolMessageResult>
}
