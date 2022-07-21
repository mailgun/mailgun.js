/* eslint-disable camelcase */
import urljoin from 'url-join';

import Request from './request';
import {
  SuppressionCreationData,
  SuppressionCreationResponse,
  SuppressionCreationResult,
  SuppressionDataType,
  SuppressionDestroyResponse,
  SuppressionDestroyResult,
  SuppressionList,
  SuppressionListQuery,
  SuppressionListResponse,
  SuppressionModels,
  SuppressionResponse,
} from './interfaces/Suppressions/Suppressions';
import APIError from './error';
import APIErrorOptions from './interfaces/APIErrorOptions';
import { IBounce, BounceData } from './interfaces/Suppressions/Bounce';
import { IComplaint, ComplaintData } from './interfaces/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from './interfaces/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from './interfaces/Suppressions/WhiteList';
import NavigationThruPages from './common/NavigationThruPages';

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};
export class Suppression {
  type: string;
  constructor(type: SuppressionModels) {
    this.type = type;
  }
}
export class Bounce extends Suppression implements IBounce {
  address: string;
  code: number;
  error: string;
  created_at: Date;

  constructor(data: BounceData) {
    super(SuppressionModels.BOUNCES);
    this.address = data.address;
    this.code = +data.code;
    this.error = data.error;
    this.created_at = new Date(data.created_at);
  }
}

export class Complaint extends Suppression implements IComplaint {
  address: string;
  created_at: Date;

  constructor(data: ComplaintData) {
    super(SuppressionModels.COMPLAINTS);
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }
}

export class Unsubscribe extends Suppression implements IUnsubscribe {
  address: string;
  tags: string[];
  created_at: Date;

  constructor(data: UnsubscribeData) {
    super(SuppressionModels.UNSUBSCRIBES);
    this.address = data.address;
    this.tags = data.tags;
    this.created_at = new Date(data.created_at);
  }
}

export class WhiteList extends Suppression implements IWhiteList {
  value: string;
  reason: string;
  createdAt: Date;

  constructor(data: WhiteListData) {
    super(SuppressionModels.WHITELISTS);
    this.value = data.value;
    this.reason = data.reason;
    this.createdAt = new Date(data.createdAt);
  }
}

export default class SuppressionClient extends NavigationThruPages<SuppressionList> {
  request: Request;
  models: Map<string, any>;

  constructor(request: Request) {
    super();
    this.request = request;
    this.models = new Map();
    this.models.set('bounces', Bounce);
    this.models.set('complaints', Complaint);
    this.models.set('unsubscribes', Unsubscribe);
    this.models.set('whitelists', WhiteList);
  }

  protected parseList(
    response: SuppressionListResponse,
    Model: {
      new(data: SuppressionDataType):
      IBounce | IComplaint | IUnsubscribe | IWhiteList
    }
  ): SuppressionList {
    const data = {} as SuppressionList;
    data.items = response.body.items.map((item) => new Model(item));

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;
    return data;
  }

  _parseItem<T extends Suppression>(
    data : BounceData | ComplaintData | UnsubscribeData | WhiteListData,
    Model: {
      new(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData):
      T
    }
  ): T {
    return new Model(data);
  }

  private createWhiteList(
    domain: string,
    data: SuppressionCreationData | SuppressionCreationData[]
  ): Promise<SuppressionCreationResult> {
    if (Array.isArray(data)) {
      throw new APIError({
        status: 400,
        statusText: 'Data property should be an object',
        body: {
          message: 'Whitelist\'s creation process does not support multiple creations. Data property should be an object'
        }
      } as APIErrorOptions);
    }
    return this.request
      .postWithFD(urljoin('v3', domain, 'whitelists'), data)
      .then(this.prepareResponse);
  }

  private checkType(type: string) {
    if (!this.models.has(type)) {
      throw new APIError({
        status: 400,
        statusText: 'Unknown type value',
        body: { message: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]' }
      } as APIErrorOptions);
    }
  }

  private prepareResponse(response: SuppressionCreationResponse): SuppressionCreationResult {
    return {
      message: response.body.message,
      type: response.body.type || '',
      value: response.body.value || '',
      status: response.status
    };
  }

  async list(
    domain: string,
    type: string,
    query?: SuppressionListQuery
  ): Promise<SuppressionList> {
    this.checkType(type);
    const model = this.models.get(type);
    const { updatedQuery, url } = this.updateUrlAndQuery(urljoin('v3', domain, type), query);

    const apiResponse: SuppressionListResponse = await this.request.get(url, updatedQuery);
    return this.parseList(apiResponse, model);
  }

  get(
    domain: string,
    type: string,
    address: string
  ): Promise<Bounce | Complaint | Unsubscribe | WhiteList> {
    this.checkType(type);

    const model = this.models.get(type);
    return this.request
      .get(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: SuppressionResponse) => this._parseItem<typeof model>(response.body, model));
  }

  create(
    domain: string,
    type: string,
    data: SuppressionCreationData | SuppressionCreationData[]
  ): Promise<SuppressionCreationResult> {
    this.checkType(type);
    // supports adding multiple suppressions by default
    let postData;
    if (type === 'whitelists') {
      return this.createWhiteList(domain, data);
    }

    if (!Array.isArray(data)) {
      postData = [data];
    } else {
      postData = [...data];
    }

    return this.request
      .post(urljoin('v3', domain, type), JSON.stringify(postData), createOptions)
      .then(this.prepareResponse);
  }

  destroy(
    domain: string,
    type: string,
    address: string
  ): Promise<SuppressionDestroyResult> {
    this.checkType(type);
    return this.request
      .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: SuppressionDestroyResponse) => ({
        message: response.body.message,
        value: response.body.value || '',
        address: response.body.address || '',
        status: response.status
      }));
  }
}

module.exports = SuppressionClient;
