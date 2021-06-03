const urljoin = require('url-join');

const MgRequest = require('./request');

export default class EventClient {
  request: typeof MgRequest;

  constructor(request: typeof MgRequest) {
    this.request = request;
  }

  _parsePageNumber(url: string) {
    return url.split('/').pop();
  }

  _parsePage(id: string, url: string) {
    return { id, number: this._parsePageNumber(url), url };
  }

  _parsePageLinks(response: { body: { paging: any } }) {
    const pages = Object.entries(response.body.paging);
    return pages.reduce(
      (acc: any, [id, url]: [url: string, id: string]) => {
        acc[id] = this._parsePage(id, url)
        return acc
      }, {});
  }

  _parseEventList(response: { body: { items: any, paging: any }  }) {
    return {
      items: response.body.items,
      pages: this._parsePageLinks(response)
    };
  }

  get(domain: string, query: { page: any }) {
    let url;

    if (query && query.page) {
      url = urljoin('/v2', domain, 'events', query.page);
      delete query.page;
    } else {
      url = urljoin('/v2', domain, 'events');
    }

    return this.request.get(url, query)
      .then((response: { body: { items: any, paging: any } }) => this._parseEventList(response));
  }
}
