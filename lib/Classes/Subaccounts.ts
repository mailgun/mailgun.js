import type Request from './common/Request.js';
import { ISubaccountsClient } from '../Interfaces/index.js';
import {
  PutOptionsType,
  SubaccountApiItem,
  SubaccountAPIResponseData,
  SubaccountDestroyResponse,
  SubaccountFeaturesData,
  SubaccountFeaturesResult,
  SubaccountItem,
  SubaccountListAPIResponseData,
  SubaccountListResponseData,
  SubaccountResponseData,
  SubaccountSendingLimitResponse,
  SubaccountSetSendingLimitResponse,
  SubaccountsQuery,
} from '../Types/index.js';

export default class SubaccountsClient implements ISubaccountsClient {
  request: Request;
  static SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';

  constructor(request: Request) {
    this.request = request;
  }

  private convertToDate(data: SubaccountApiItem): SubaccountItem {
    const res = {
      ...data,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at)
    };
    return res;
  }

  async list(query?: SubaccountsQuery): Promise<SubaccountListResponseData> {
    const res: SubaccountListAPIResponseData = await this.request.get('/v5/accounts/subaccounts', query);
    return {
      total: res.body.total,
      subaccounts: res.body.subaccounts.map(this.convertToDate)
    };
  }

  async get(id:string): Promise<SubaccountResponseData> {
    const res: SubaccountAPIResponseData = await this.request.get(`/v5/accounts/subaccounts/${id}`);
    return {
      subaccount: this.convertToDate(res.body.subaccount)
    };
  }

  async create(name:string): Promise<SubaccountResponseData> {
    const res: SubaccountAPIResponseData = await this.request.postWithFD('/v5/accounts/subaccounts', { name });
    return {
      subaccount: this.convertToDate(res.body.subaccount)
    };
  }

  async destroy(id: string): Promise<SubaccountDestroyResponse> {
    try {
      this.request.setSubaccountHeader(id);
      const response = await this.request.delete('/v5/accounts/subaccounts');
      this.request.resetSubaccountHeader();
      return response.body;
    } catch (error) {
      this.request.resetSubaccountHeader();
      throw error;
    }
  }

  async getMonthlySendingLimit(id: string): Promise<SubaccountSendingLimitResponse> {
    const response = await this.request.get(`/v5/accounts/subaccounts/${id}/limit/custom/monthly`);
    return response.body;
  }

  async setMonthlySendingLimit(
    id: string,
    limit: number
  ): Promise<SubaccountSetSendingLimitResponse> {
    const customLimit : PutOptionsType = { query: `limit=${limit}` };
    const response = await this.request.put(`/v5/accounts/subaccounts/${id}/limit/custom/monthly`, undefined, customLimit);
    return response.body;
  }

  async updateSubaccountFeature(id: string, features: SubaccountFeaturesData)
    : Promise<SubaccountFeaturesResult> {
    const keys = ['email_preview', 'inbox_placement', 'sending', 'validations', 'validations_bulk'] as (keyof SubaccountFeaturesData)[];
    const readyFeatures = keys.reduce(
      (acc, currentFeatureName) => {
        if (currentFeatureName in features && typeof features[currentFeatureName] === 'boolean') {
          acc[currentFeatureName] = JSON.stringify({
            enabled: features[currentFeatureName]
          });
        }
        return acc;
      }, {} as Record<keyof SubaccountFeaturesData, string>
    );
    const response = await this.request.put(`/v5/accounts/subaccounts/${id}/features`, readyFeatures);
    return response.body;
  }

  enable(id:string): Promise<SubaccountResponseData> {
    return this.request.post(`/v5/accounts/subaccounts/${id}/enable`)
      .then((res) => res.body);
  }

  disable(id:string): Promise<SubaccountResponseData> {
    return this.request.post(`/v5/accounts/subaccounts/${id}/disable`)
      .then((res) => res.body);
  }
}
