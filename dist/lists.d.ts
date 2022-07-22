import Request from './request';
import { ListsQuery, CreateUpdateList, DestroyedList, MailingList, StartValidationResult, ValidationResult, CancelValidationResult, MailingListResult, MailingListApiResponse } from './interfaces/lists';
import { IMailListsMembers } from './interfaces/mailListMembers';
import NavigationThruPages from './common/NavigationThruPages';
export default class ListsClient extends NavigationThruPages<MailingListResult> {
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
    validationResult(mailListAddress: string): Promise<ValidationResult>;
    cancelValidation(mailListAddress: string): Promise<CancelValidationResult>;
}
