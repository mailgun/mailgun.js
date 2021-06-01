import Request from './request';
import { MailListMembersQuery, IMailListsMembers, CreateUpdateMailListMembers, MailListMember, MultipleMembersData, DeletedMember } from './interfaces/mailListMembers';
import { CreateUpdateList } from './interfaces/lists';
export default class MailListsMembers implements IMailListsMembers {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private checkAndUpdateData;
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<[MailListMember]>;
    getMember(mailListAddress: string, mailListMemberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<any>;
    updateMember(mailListAddress: string, mailListMemberAddress: string, data: CreateUpdateList): Promise<MailListMember>;
    destroyMember(mailListAddress: string, mailListMemberAddress: string): Promise<DeletedMember>;
}
