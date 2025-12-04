import NavigationThruPages from './common/NavigationThruPages.js';
import { EventsList, EventsQuery, EventsResponse } from '../Types/Events/index.js';
import Request from './common/Request.js';
import { IEventClient, ILogger } from '../Interfaces/index.js';
export default class EventClient extends NavigationThruPages<EventsList> implements IEventClient {
    request: Request;
    private logger;
    constructor(request: Request, logger?: ILogger);
    protected parseList(response: EventsResponse): EventsList;
    get(domain: string, query?: EventsQuery): Promise<EventsList>;
}
