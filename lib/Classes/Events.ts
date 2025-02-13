import urljoin from 'url-join';
import NavigationThruPages from './common/NavigationThruPages.js';
import {
  EventsList,
  EventsQuery,
  EventsResponse,
} from '../Types/Events/index.js';

import Request from './common/Request.js';
import { IEventClient } from '../Interfaces/index.js';

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
