import { MailListMembersQuery, MailListMembersResult, MailListMember, CreateUpdateMailListMembers, MultipleMembersData, NewMultipleMembersResponse, DeletedMember } from '../../Types/MailingLists';
export interface IMailListsMembers {
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<MailListMembersResult>;
    getMember(address: string, memberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse>;
    updateMember(address: string, memberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    destroyMember(address: string, memberAddress: string): Promise<DeletedMember>;
}
