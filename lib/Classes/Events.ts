import urljoin from 'url-join';
import NavigationThruPages from './common/NavigationThruPages';
import {
  EventsList,
  EventsQuery,
  EventsResponse,
} from '../Types/Events';

import Request from './common/Request';
import { IEventClient } from '../Interfaces';

export default class EventClient
  extends NavigationThruPages<EventsList>
  implements IEventClient {
  request: Request;

  constructor(request: Request) {
    super(request);
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
    return this.requestListWithPages(urljoin('/v3', domain, 'events'), query);
  }
}
