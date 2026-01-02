import { DKIMRotateImmediatelyResult, DKIMRotationData, DKIMUpdateRotationResult } from '../../definitions.js';
import { IDKIMManagementClient } from '../../Interfaces/DKIM/IDKIMManagementClient.js';
import Request from '../common/Request.js';
export default class DKIMManagementClient implements IDKIMManagementClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    update(domainName: string, data: DKIMRotationData): Promise<DKIMUpdateRotationResult>;
    rotateImmediately(domainName: string): Promise<DKIMRotateImmediatelyResult>;
}
