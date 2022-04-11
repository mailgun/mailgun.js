import Request from './request';
import { ListsQuery, CreateUpdateList, DestroyedList, MailingList, StartValidationResult, ValidationResult, CancelValidationResult } from './interfaces/lists';
import { IMailListsMembers } from './interfaces/mailListMembers';
export default class ListsClient {
    baseRoute: string;
    request: Request;
    members: IMailListsMembers;
    constructor(request: Request, members: IMailListsMembers);
    private parseValidationResult;
    list(query?: ListsQuery): Promise<MailingList[]>;
    get(mailListAddress: string): Promise<MailingList>;
    create(data: CreateUpdateList): Promise<MailingList>;
    update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList>;
    destroy(mailListAddress: string): Promise<DestroyedList>;
    validate(mailListAddress: string): Promise<StartValidationResult>;
    validationResult(mailListAddress: string): Promise<ValidationResult>;
    cancelValidation(mailListAddress: string): Promise<CancelValidationResult>;
}
