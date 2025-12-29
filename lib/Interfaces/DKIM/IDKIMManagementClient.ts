import { DKIMRotateImmediatelyResult, DKIMRotationData, DKIMUpdateRotationResult } from '../../Types/DKIM';

export interface IDKIMManagementClient {
  update(domainName: string, data: DKIMRotationData): Promise<DKIMUpdateRotationResult>
  rotateImmediately(domainName: string): Promise<DKIMRotateImmediatelyResult>
}
