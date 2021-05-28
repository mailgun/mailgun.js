import Request from './request';
import { ListsQuery, CreateUpdateList, DestroyedList, MailingList } from './interfaces/lists';
export default class ListsClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    list(query?: ListsQuery): Promise<[MailingList]>;
    get(mailListAddress: string): Promise<MailingList>;
    create(data: CreateUpdateList): Promise<MailingList>;
    update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList>;
    destroy(mailListAddress: string): Promise<DestroyedList>;
}
