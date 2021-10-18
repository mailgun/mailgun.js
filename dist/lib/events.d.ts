import { EventsList, EventsPage, EventsResponse, PagesList } from './interfaces/Events';
import Request from './request';
export default class EventClient {
    request: Request;
    constructor(request: Request);
    _parsePageNumber(url: string): string;
    _parsePage(id: string, url: string): EventsPage;
    _parsePageLinks(response: EventsResponse): PagesList;
    _parseEventList(response: EventsResponse): EventsList;
    get(domain: string, query: {
        page: string;
    }): Promise<EventsList>;
}
