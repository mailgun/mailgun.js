'use strict';

var map = require('lodash.map');
var last = require('lodash.last');
var indexBy = require('lodash.indexby');
var urljoin = require('url-join');

class Event {
  constructor(data) {
    this.type = data.type;
    this.summary = data.gist;
    this.content =  data.content;
    this.timestamp = new Date(data.timestamp);
  }
}

class EventClient {
  constructor(request) {
    this.request = request;
  }

  _parsePageNumber(url) {
    return last(url.split('/'));
  }

  _parsePage(id, url) {
    return { id: id, number: this._parsePageNumber(url), url: url };
  }

  _parsePageLinks(response) {
    var pages;

    pages = {};
    pages = map(response.body.paging, (url, id) => this._parsePage(id, url));

    return indexBy(pages, 'id');
  }

  _parseEventList(response) {
    var items;

    items = map(response.body.items, data => new Event(data));
    items.pages = this._parsePageLinks(response);

    return items;
  }

  get(domain, query) {
    var url;

    if (query && query.page) {
      url = urljoin('/v2', domain, 'events', query.page);
      delete query.page;
    } else {
      url = urljoin('/v2', domain, 'events');
    }

    return this.request.get(url, query).then(response => this._parseEventList(response));
  }
}

module.exports = EventClient;
