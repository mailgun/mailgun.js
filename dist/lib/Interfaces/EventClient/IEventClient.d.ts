import { EventsList, EventsQuery } from '../../Types/Events';
export interface IEventClient {
    get(domain: string, query?: EventsQuery): Promise<EventsList>;
}
