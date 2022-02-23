/* eslint-disable camelcase */
import url from 'url';
import urljoin from 'url-join';

import Request from './request';
import {
  BounceData,
  ComplaintData,
  IBounce,
  IComplaint,
  IUnsubscribe,
  IWhiteList,
  PagesList,
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  SuppressionList,
  SuppressionModels,
  UnsubscribeData,
  WhiteListData
} from './interfaces/Supressions';

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};

class Bounce implements IBounce {
  type: string;
  address: string;
  code: number;
  error: string;
  created_at: Date;

  constructor(data: BounceData) {
    this.type = 'bounces';
    this.address = data.address;
    this.code = +data.code;
    this.error = data.error;
    this.created_at = new Date(data.created_at);
  }
}

class Complaint implements IComplaint {
  type: string;
  address: any;
  created_at: Date;

  constructor(data: ComplaintData) {
    this.type = 'complaints';
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }
}

class Unsubscribe implements IUnsubscribe {
  type: string;
  address: string;
  tags: any;
  created_at: Date;

  constructor(data: UnsubscribeData) {
    this.type = 'unsubscribes';
    this.address = data.address;
    this.tags = data.tags;
    this.created_at = new Date(data.created_at);
  }
}

class WhiteList implements IWhiteList {
  type: string;
  value: string;
  reason: string;
  createdAt: Date;

  constructor(data: WhiteListData) {
    this.type = 'whitelists';
    this.value = data.value;
    this.reason = data.reason;
    this.createdAt = new Date(data.createdAt);
  }
}

type TModel = typeof Bounce | typeof Complaint | typeof Unsubscribe | typeof WhiteList;

export default class SuppressionClient {
  request: any;
  models: {
    bounces: typeof Bounce;
    complaints: typeof Complaint;
    unsubscribes: typeof Unsubscribe;
    whitelists: typeof WhiteList;
  };

  constructor(request: Request) {
    this.request = request;
    this.models = {
      bounces: Bounce,
      complaints: Complaint,
      unsubscribes: Unsubscribe,
      whitelists: WhiteList,
    };
  }

  _parsePage(id: string, pageUrl: string) : ParsedPage {
    const parsedUrl = url.parse(pageUrl, true);
    const { query } = parsedUrl;

    return {
      id,
      page: query.page as string,
      address: query.address as string,
      url: pageUrl
    };
  }

  _parsePageLinks(response: { body: { paging: any } }): ParsedPagesList {
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
    response: { body: { items: any, paging: any } }, Model: TModel
  ): SuppressionList {
    const data = {} as SuppressionList;

    data.items = response.body.items.map((d: any) => new Model(d));

    data.pages = this._parsePageLinks(response);

    return data;
  }

  _parseItem(
    response: { body: any },
    Model: TModel
  ): IBounce | IComplaint | IUnsubscribe | IWhiteList {
    return new Model(response.body);
  }

  private createWhiteList(domain: string, data: any) {
    return this.request
      .postWithFD(urljoin('v3', domain, 'whitelists'), data, createOptions)
      .then((response: { body: any }) => response.body);
  }

  list(domain: string, type: SuppressionModels, query: any) : Promise<SuppressionList> {
    const model = (this.models)[type];

    return this.request
      .get(urljoin('v3', domain, type), query)
      .then((response: { body: { items: any, paging: any } }) => this._parseList(response, model));
  }

  get(
    domain: string,
    type: SuppressionModels,
    address: string
  ): Promise<IBounce | IComplaint | IUnsubscribe | IWhiteList> {
    const model = (this.models)[type];

    return this.request
      .get(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: { body: any }) => this._parseItem(response, model));
  }

  create(domain: string, type: string, data: any) {
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
      .then((response: { body: any }) => response.body);
  }

  destroy(domain: string, type: string, address: string) {
    return this.request
      .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: { body: any }) => response.body);
  }
}

module.exports = SuppressionClient;
