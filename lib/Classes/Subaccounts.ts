import Request from './common/Request';
import { ISubaccountsClient } from '../Interfaces';
import {
  SubaccountListResponseData,
  SubaccountResponseData,
  SubaccountsQuery,
} from '../Types';

export default class SubaccountsClient implements ISubaccountsClient {
  request: Request;
  static SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';

  constructor(request: Request) {
    this.request = request;
  }

  list(query?: SubaccountsQuery): Promise<SubaccountListResponseData> {
    return this.request.get('/v5/accounts/subaccounts', query)
      .then((res) => res.body);
  }

  get(id:string): Promise<SubaccountResponseData> {
    return this.request.get(`/v5/accounts/subaccounts/${id}`)
      .then((res) => res.body);
  }

  create(name:string): Promise<SubaccountResponseData> {
    return this.request.postWithFD('/v5/accounts/subaccounts', { name })
      .then((res) => res.body);
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
