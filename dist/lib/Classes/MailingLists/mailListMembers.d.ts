import Request from '../common/Request';
import { MailListMembersQuery, CreateUpdateMailListMembers, MailListMember, MultipleMembersData, DeletedMember, NewMultipleMembersResponse, MailListMembersResult, MailListMembersResponse } from '../../Types/MailingLists';
import NavigationThruPages from '../common/NavigationThruPages';
import { IMailListsMembers } from '../../Interfaces/MailingLists';
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
