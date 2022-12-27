import NavigationThruPages from './common/NavigationThruPages';
import { EventsList, EventsQuery, EventsResponse } from '../interfaces/Events';
import Request from './common/Request';
export default class EventClient extends NavigationThruPages<EventsList> {
    request: Request;
    constructor(request: Request);
    protected parseList(response: EventsResponse): EventsList;
    get(domain: string, query?: EventsQuery): Promise<EventsList>;
}
