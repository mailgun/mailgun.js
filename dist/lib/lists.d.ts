import Request from './request';
import { ListsQuery, CreateUpdateList, DestroyedList, MailingList } from './interfaces/lists';
import { IMailListsMembers } from './interfaces/mailListMembers';
export default class ListsClient {
    baseRoute: string;
    request: Request;
    members: IMailListsMembers;
    constructor(request: Request, members: IMailListsMembers);
    list(query?: ListsQuery): Promise<MailingList[]>;
    get(mailListAddress: string): Promise<MailingList>;
    create(data: CreateUpdateList): Promise<MailingList>;
    update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList>;
    destroy(mailListAddress: string): Promise<DestroyedList>;
}
