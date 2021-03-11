import url from 'url';
import urljoin from 'url-join';

import Request from './request';
import { BounceData, ComplaintData, UnsubscribeData } from './interfaces/Supressions';

type TModel = typeof Bounce | typeof Complaint | typeof Unsubscribe;

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};

class Bounce {
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

class Complaint {
  type: string;
  address: any;
  created_at: Date;

  constructor(data: ComplaintData) {
    this.type = 'complaints';
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }
}

class Unsubscribe {
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

export default class SuppressionClient {
  request: any;
  models: {
    bounces: typeof Bounce;
    complaints: typeof Complaint;
    unsubscribes: typeof Unsubscribe;
  };

  constructor(request: Request) {
    this.request = request;
    this.models = {
      bounces: Bounce,
      complaints: Complaint,
      unsubscribes: Unsubscribe
    };
  }

  _parsePage(id: string, pageUrl: string) {
    const parsedUrl = url.parse(pageUrl, true);
    const { query } = parsedUrl;

    return {
      id,
      page: query.page,
      address: query.address,
      url: pageUrl
    };
  }

  _parsePageLinks(response: { body: { paging: any } }) {
    const pages = Object.entries(response.body.paging);
    return pages.reduce(
      (acc: any, [id, url]: [url: string, id: string]) => {
        acc[id] = this._parsePage(id, url)
        return acc
      }, {});
  }

  _parseList(response: { body: { items: any, paging: any } }, Model: TModel) {
    const data = {} as any;

    data.items = response.body.items.map((d: any) => new Model(d));

    data.pages = this._parsePageLinks(response);

    return data;
  }

  _parseItem(response: { body: any }, Model: TModel) {
    return new Model(response.body);
  }

  list(domain: string, type: string, query: any) {
    const model = (this.models as any)[type];

    return this.request
      .get(urljoin('v3', domain, type), query)
      .then((response: { body: { items: any, paging: any } }) => this._parseList(response, model));
  }

  get(domain: string, type: string, address: string) {
    const model = (this.models as any)[type];

    return this.request
      .get(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: { body: any }) => this._parseItem(response, model));
  }

  create(domain: string, type: string, data: any) {
    // supports adding multiple suppressions by default
    if (!Array.isArray(data)) {
      data = [data];
    }

    return this.request
    .post(urljoin('v3', domain, type), data, createOptions)
    .then((response: { body: any }) => response.body);
  }

  destroy(domain: string, type: string, address: string) {
    return this.request
    .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
    .then((response: { body: any }) => response.body);
  }
}

module.exports = SuppressionClient;
