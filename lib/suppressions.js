'use strict';

var map = require('lodash.map');
var indexBy = require('lodash.indexby');
var partialRight = require('lodash.partialright');
var url = require('url');
var urljoin = require('url-join');
var createOptions = {
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
    var parsedUrl = url.parse(pageUrl, true);
    var query = parsedUrl.query;

    return { id: id, page: query.page, address: query.address, url: pageUrl };
  }

  _parsePageLinks(response) {
    var pages;
    pages = {};
    pages = map(response.body.paging, (url, id) => this._parsePage(id, url));

    return indexBy(pages, 'id');
  }

  _parseList(response, Model) {
    var data = {};

    data.items = map(response.body.items, data => new Model(data));

    data.pages = this._parsePageLinks(response);

    return data;
  }

  _parseItem(response, Model) {
    return new Model(response.body);
  }

  list(domain, type, query) {
    var parser;
    var model = this.models[type];

    return this.request.get(urljoin('v3', domain, type), query).then(response => this._parseList(response, model));
  }

  get(domain, type, address) {
    var model = this.models[type];
    var parser = partialRight(this._parseItem, model);
    address = encodeURIComponent(address);

    return this.request.get(urljoin('v3', domain, type, address)).then(response => parser(response));
  }

  create(domain, type, data) {
    // supports adding multiple suppressions by default
    if (!Array.isArray(data)) {
      data = [data];
    }

    return this.request.post(urljoin('v3', domain, type), data, createOptions).then(response => response.body);
  }

  destroy(domain, type, address) {
    address = encodeURIComponent(address);

    return this.request.delete(urljoin('v3', domain, type, address)).then(response => response.body);
  }
}

module.exports = SuppressionClient;
