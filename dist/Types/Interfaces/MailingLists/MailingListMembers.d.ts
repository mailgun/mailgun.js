import { MailListMembersQuery, MailListMembersResult, MailListMember, CreateUpdateMailListMembers, MultipleMembersData, NewMultipleMembersResponse, DeletedMember, MailListMembersUploadData, MailListMembersUploadResponse, MailListMembersByAddressQuery, MailListMembersByAddressResult } from '../../Types/MailingLists/index.js';
export interface IMailListsMembers {
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<MailListMembersResult>;
    listMembersByAddress(mailListAddress: string, query?: MailListMembersByAddressQuery): Promise<MailListMembersByAddressResult>;
    getMember(address: string, memberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse>;
    updateMember(address: string, memberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    destroyMember(address: string, memberAddress: string): Promise<DeletedMember>;
    upload(mailingListAddress: string, file: MailListMembersUploadData, subscribed?: boolean, upsert?: boolean): Promise<MailListMembersUploadResponse>;
}
