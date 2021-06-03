import Request from './request';
import { MailListMembersQuery, IMailListsMembers, CreateUpdateMailListMembers, MailListMember, MultipleMembersData, DeletedMember, NewMultipleMembersResponse } from './interfaces/mailListMembers';
export default class MailListsMembers implements IMailListsMembers {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private checkAndUpdateData;
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<MailListMember[]>;
    getMember(mailListAddress: string, mailListMemberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse>;
    updateMember(mailListAddress: string, mailListMemberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    destroyMember(mailListAddress: string, mailListMemberAddress: string): Promise<DeletedMember>;
}
