import Request from '../common/Request.js';
import { MailListMembersQuery, CreateUpdateMailListMembers, MailListMember, MultipleMembersData, DeletedMember, NewMultipleMembersResponse, MailListMembersResult, MailListMembersResponse } from '../../Types/MailingLists/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { IMailListsMembers } from '../../Interfaces/MailingLists/index.js';
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
