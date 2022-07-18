import urljoin from 'url-join';
import NavigationThruPages from './common/NavigationThruPages';
import {
  EventsList,
  EventsQuery,
  EventsResponse,
} from './interfaces/Events';

import Request from './request';

export default class EventClient
  extends NavigationThruPages<EventsList> {
  request: Request;

  constructor(request: Request) {
    super();
    this.request = request;
  }

  // _parsePageNumber(url: string) : string {
  //   return url.split('/').pop() || '';
  // }

  // _parsePage(id: string, url: string) : EventsPage {
  //   return { id, number: this._parsePageNumber(url), url };
  // }

  // _parsePageLinks(response: EventsResponse) : ParsedPagesList {
  //   const pages = Object.entries(response.body.paging as PagesList);
  //   return pages.reduce(
  //     (acc: PagesListAccumulator, pair: [url: string, id: string]) => {
  //       const id = pair[0];
  //       const url = pair[1];
  //       acc[id] = this._parsePage(id, url);
  //       return acc;
  //     }, {}
  //   ) as unknown as ParsedPagesList;
  // }

  // _parseEventList(response: EventsResponse) : EventsList {
  //   return {
  //     items: response.body.items,
  //     pages: this._parsePageLinks(response),
  //     status: 200
  //   };
  // }

  protected parseList(
    response: EventsResponse,
  ): EventsList {
    const data = {} as EventsList;
    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '/');
    data.status = response.status;
    return data;
  }

  get(domain: string, query?: EventsQuery) : Promise<EventsList> {
    let url;
    const queryCopy = { ...query };
    if (queryCopy && queryCopy.page) {
      url = urljoin('/v3', domain, 'events', queryCopy.page);
      delete queryCopy.page;
    } else {
      url = urljoin('/v3', domain, 'events');
    }
    return this.request.get(url, queryCopy)
      .then((response: EventsResponse) => this.parseList(response));
  }
}
