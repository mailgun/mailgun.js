import urljoin from 'url-join';
import {
  DKIMRotateImmediatelyResult, DKIMRotationData, DKIMUpdateRotationResult
} from '../../definitions.js';
import { IDKIMManagementClient } from '../../Interfaces/DKIM/IDKIMManagementClient.js';
import Request from '../common/Request.js';

export default class DKIMManagementClient implements IDKIMManagementClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private prepareBooleanValues(data: DKIMRotationData): DKIMRotationData {
    const res = { ...data, rotation_enabled: '' };
    if (Object.keys(data).includes('rotation_enabled')) {
      res.rotation_enabled = `${data.rotation_enabled}`;
    }
    return res;
  }

  async update(domainName: string, data: DKIMRotationData): Promise<DKIMUpdateRotationResult> {
    const preparedData = this.prepareBooleanValues(data);
    const response = await this.request.putWithFD(urljoin('v1/dkim_management/domains/', domainName, 'rotation'), preparedData);
    return response.body;
  }

  async rotateImmediately(domainName: string): Promise<DKIMRotateImmediatelyResult> {
    const response = await this.request.post(urljoin('v1/dkim_management/domains/', domainName, 'rotate'), {});
    return response.body;
  }
}
