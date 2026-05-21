import { SendingLimitResult, SuccessResult } from '../../Types/index.js';
import { ICustomMessageLimitClient } from '../../Interfaces/index.js';
import Request from '../common/Request.js';

export default class CustomMessageLimitClient implements ICustomMessageLimitClient {
  request: Request;
  private path: string;

  constructor(request: Request) {
    this.request = request;
    this.path = '/v5/accounts/limit/custom';
  }

  async get(): Promise<SendingLimitResult> {
    const response = await this.request.get(`${this.path}/monthly`);
    return response.body;
  }

  async set(limit: number): Promise<SuccessResult> {
    const response = await this.request.put(`${this.path}/monthly`, {}, { query: `limit=${limit}` });
    return response.body;
  }

  async destroy(): Promise<SuccessResult> {
    const response = await this.request.delete(`${this.path}/monthly`);
    return response.body;
  }

  async enable(): Promise<SuccessResult> {
    const response = await this.request.put(`${this.path}/enable`);
    return response.body;
  }
}
