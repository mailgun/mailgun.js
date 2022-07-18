import Request from './request';
import { MailListMembersQuery, IMailListsMembers, CreateUpdateMailListMembers, MailListMember, MultipleMembersData, DeletedMember, NewMultipleMembersResponse, MailListMembersResult, MailListMembersResponse } from './interfaces/mailListMembers';
import NavigationThruPages from './common/NavigationThruPages';
export default class MailListsMembers extends NavigationThruPages<MailListMembersResult> implements IMailListsMembers {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private checkAndUpdateData;
    protected parseList(response: MailListMembersResponse): MailListMembersResult;
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<MailListMembersResult>;
    getMember(mailListAddress: string, mailListMemberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse>;
    updateMember(mailListAddress: string, mailListMemberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    destroyMember(mailListAddress: string, mailListMemberAddress: string): Promise<DeletedMember>;
}
