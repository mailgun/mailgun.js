import {
  IpPoolCreateData, IpPoolCreateResult,
  IpPoolDeleteData, IpPoolListResult,
  IpPoolMessageResult, IpPoolUpdateData
} from '../../Types/IPPools';

export interface IIPPoolsClient {
  list(): Promise<IpPoolListResult>
  create(data: IpPoolCreateData): Promise<IpPoolCreateResult>
  update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult>
  delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult>
}
