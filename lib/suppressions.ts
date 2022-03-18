/* eslint-disable camelcase */
import urljoin from 'url-join';

import Request from './request';
import {
  BounceData,
  ComplaintData,
  PagesList,
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  SuppressionCreationData,
  SuppressionCreationResponse,
  SuppressionCreationResult,
  SuppressionDestroyResponse,
  SuppressionDestroyResult,
  SuppressionList,
  SuppressionListQuery,
  SuppressionListResponse,
  SuppressionModels,
  SuppressionResponse,
  UnsubscribeData,
  WhiteListData,
} from './interfaces/Supressions';
import APIError from './error';
import APIErrorOptions from './interfaces/APIErrorOptions';

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};
export class Suppression {
  type: string;
  constructor(type: SuppressionModels) {
    this.type = type;
  }
}
export class Bounce extends Suppression {
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

export class Complaint extends Suppression {
  address: string | undefined;
  created_at: Date;

  constructor(data: ComplaintData) {
    super(SuppressionModels.COMPLAINTS);
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }
}

export class Unsubscribe extends Suppression {
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

export class WhiteList extends Suppression {
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

export default class SuppressionClient {
  request: Request;
  models: Map<string, any>;

  constructor(request: Request) {
    this.request = request;
    this.models = new Map();
    this.models.set('bounces', Bounce);
    this.models.set('complaints', Complaint);
    this.models.set('unsubscribes', Unsubscribe);
    this.models.set('whitelists', WhiteList);
  }

  _parsePage(id: string, pageUrl: string) : ParsedPage {
    const parsedUrl = new URL(pageUrl);
    const { searchParams } = parsedUrl;
    return {
      id,
      page: searchParams.has('page') ? searchParams.get('page') : undefined,
      address: searchParams.has('address') ? searchParams.get('address') : undefined,
      url: pageUrl
    };
  }

  _parsePageLinks(response: SuppressionListResponse): ParsedPagesList {
    const pages = Object.entries(response.body.paging as PagesList);
    return pages.reduce(
      (acc: PagesListAccumulator, pair: [pageUrl: string, id: string]) => {
        const id = pair[0];
        const pageUrl = pair[1];
        acc[id] = this._parsePage(id, pageUrl);
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  _parseList(
    response: SuppressionListResponse,
    Model: {
      new(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData):
      Bounce | Complaint | Unsubscribe | WhiteList
    }
  ): SuppressionList {
    const data = {} as SuppressionList;
    data.items = response.body.items.map((item) => new Model(item));

    data.pages = this._parsePageLinks(response);

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

  private checkType(type: SuppressionModels) {
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

  list(
    domain: string,
    type: SuppressionModels,
    query: SuppressionListQuery
  ): Promise<SuppressionList> {
    this.checkType(type);

    const model = this.models.get(type);
    return this.request
      .get(urljoin('v3', domain, type), query)
      .then((response: SuppressionListResponse) => this._parseList(response, model));
  }

  get(
    domain: string,
    type: SuppressionModels,
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
    type: SuppressionModels,
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
    type: SuppressionModels,
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
