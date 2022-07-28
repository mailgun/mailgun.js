import { MailingList } from './lists';
import { PagesList, ParsedPagesList } from './NavigationThruPages';
export interface MailListMember {
    address: string;
    name: string;
    subscribed: boolean;
    vars: {
        [key: string]: any;
    };
}
export declare type MailListMembersQuery = {
    subscribed?: 'yes' | 'no';
    limit?: number;
    page?: string;
};
export declare type MultipleMembersData = {
    members: Array<MailListMember>;
    upsert: 'yes' | 'no';
};
export declare type MultipleMembersReqData = {
    members: string;
    upsert: 'yes' | 'no';
};
export interface CreateUpdateMailListMembers {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
}
export declare type CreateUpdateMailListMembersReq = {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
};
export interface DeletedMember {
    member: {
        address: string;
    };
    message: string;
}
export interface NewMultipleMembersResponse {
    list: MailingList;
    message: string;
    'task-id': string;
}
export interface MailListMembersResponse {
    body: {
        items: MailListMember[];
        paging: PagesList;
    };
    status: number;
}
export interface MailListMembersResult {
    items: MailListMember[];
    pages: ParsedPagesList;
    status: number;
}
export interface IMailListsMembers {
    listMembers(mailListAddress: string, query?: MailListMembersQuery): Promise<MailListMembersResult>;
    getMember(address: string, memberAddress: string): Promise<MailListMember>;
    createMember(mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    createMembers(mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse>;
    updateMember(address: string, memberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember>;
    destroyMember(address: string, memberAddress: string): Promise<DeletedMember>;
}
