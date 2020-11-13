const map = require('lodash.map');
const indexBy = require('lodash.keyby');
const partialRight = require('lodash.partialright');
const url = require('url');
const urljoin = require('url-join');

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};

class Bounce {
  constructor(data) {
    this.type = 'bounces';
    this.address = data.address;
    this.code = data.code;
    this.error = data.error;
    this.created_at = new Date(data.created_at);
  }
}

class Complaint {
  constructor(data) {
    this.type = 'complaints';
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }
}

class Unsubscribe {
  constructor(data) {
    this.type = 'unsubscribes';
    this.address = data.address;
    this.tags = data.tags;
    this.created_at = new Date(data.created_at);
  }
}

class SuppressionClient {
  constructor(request) {
    this.request = request;
    this.models = {
      bounces: Bounce,
      complaints: Complaint,
      unsubscribes: Unsubscribe
    };
  }

  _parsePage(id, pageUrl) {
    const parsedUrl = url.parse(pageUrl, true);
    const { query } = parsedUrl;

    return {
      id,
      page: query.page,
      address: query.address,
      url: pageUrl
    };
  }

  _parsePageLinks(response) {
    const pages = map(response.body.paging, (u, id) => this._parsePage(id, u));

    return indexBy(pages, 'id');
  }

  _parseList(response, Model) {
    const data = {};

    data.items = map(response.body.items, (d) => new Model(d));

    data.pages = this._parsePageLinks(response);

    return data;
  }

  _parseItem(response, Model) {
    return new Model(response.body);
  }

  list(domain, type, query) {
    const model = this.models[type];

    return this.request.get(urljoin('v3', domain, type), query).then((response) => this._parseList(response, model));
  }

  get(domain, type, address) {
    const model = this.models[type];
    const parser = partialRight(this._parseItem, model);

    return this.request.get(urljoin('v3', domain, type, encodeURIComponent(address))).then((response) => parser(response));
  }

  create(domain, type, data) {
    // supports adding multiple suppressions by default
    if (!Array.isArray(data)) {
      data = [data];
    }

    return this.request.post(urljoin('v3', domain, type), data, createOptions).then((response) => response.body);
  }

  destroy(domain, type, address) {
    return this.request.delete(urljoin('v3', domain, type, encodeURIComponent(address))).then((response) => response.body);
  }
}

module.exports = SuppressionClient;
