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

  protected parseList(
    response: EventsResponse,
  ): EventsList {
    const data = {} as EventsList;
    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '/');
    data.status = response.status;
    return data;
  }

  async get(domain: string, query?: EventsQuery) : Promise<EventsList> {
    const { updatedQuery, url } = this.updateUrlAndQuery(urljoin('/v3', domain, 'events'), query);

    const apiResponse: EventsResponse = await this.request.get(url, updatedQuery);
    return this.parseList(apiResponse);
  }
}
