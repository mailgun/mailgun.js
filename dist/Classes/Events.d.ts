import NavigationThruPages from './common/NavigationThruPages';
import { EventsList, EventsQuery, EventsResponse } from '../Types/Events';
import Request from './common/Request';
import { IEventClient } from '../Interfaces';
export default class EventClient extends NavigationThruPages<EventsList> implements IEventClient {
    request: Request;
    constructor(request: Request);
    protected parseList(response: EventsResponse): EventsList;
    get(domain: string, query?: EventsQuery): Promise<EventsList>;
}
