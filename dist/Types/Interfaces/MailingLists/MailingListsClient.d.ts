import { CreateUpdateList, DestroyedList, ListsByAddressQuery, ListsQuery, MailingList, MailingListByAddressResult, MailingListCancelValidationResult, MailingListResult, MailingListValidationResult, StartValidationResult } from '../../Types/MailingLists/index.js';
import { IMailListsMembers } from './MailingListMembers.js';
export interface IMailingListsClient {
    members: IMailListsMembers;
    list(query?: ListsQuery): Promise<MailingListResult>;
    listByAddress(query?: ListsByAddressQuery): Promise<MailingListByAddressResult>;
    get(mailListAddress: string): Promise<MailingList>;
    create(data: CreateUpdateList): Promise<MailingList>;
    update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList>;
    destroy(mailListAddress: string): Promise<DestroyedList>;
    validate(mailListAddress: string): Promise<StartValidationResult>;
    validationResult(mailListAddress: string): Promise<MailingListValidationResult>;
    cancelValidation(mailListAddress: string): Promise<MailingListCancelValidationResult>;
}
