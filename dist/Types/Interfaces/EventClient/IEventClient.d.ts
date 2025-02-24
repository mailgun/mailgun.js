import { EventsList, EventsQuery } from '../../Types/Events/index.js';
export interface IEventClient {
    get(domain: string, query?: EventsQuery): Promise<EventsList>;
}
