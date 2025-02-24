import Request from '../common/Request.js';
import { ListsQuery, CreateUpdateList, DestroyedList, MailingList, StartValidationResult, MailingListValidationResult, MailingListCancelValidationResult, MailingListResult, MailingListApiResponse } from '../../Types/MailingLists/index.js';
import { IMailListsMembers } from '../../Interfaces/MailingLists/MailingListMembers.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { IMailingListsClient } from '../../Interfaces/index.js';
export default class MailingListsClient extends NavigationThruPages<MailingListResult> implements IMailingListsClient {
    baseRoute: string;
    request: Request;
    members: IMailListsMembers;
    constructor(request: Request, members: IMailListsMembers);
    private parseValidationResult;
    protected parseList(response: MailingListApiResponse): MailingListResult;
    list(query?: ListsQuery): Promise<MailingListResult>;
    get(mailListAddress: string): Promise<MailingList>;
    create(data: CreateUpdateList): Promise<MailingList>;
    update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList>;
    destroy(mailListAddress: string): Promise<DestroyedList>;
    validate(mailListAddress: string): Promise<StartValidationResult>;
    validationResult(mailListAddress: string): Promise<MailingListValidationResult>;
    cancelValidation(mailListAddress: string): Promise<MailingListCancelValidationResult>;
}
