import { PagesList, ParsedPagesList } from '../Common';
import { MailingList } from './MailingLists';
export declare type MailListMember = {
    address: string;
    name: string;
    subscribed: boolean;
    vars: {
        [key: string]: unknown;
    };
};
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
export declare type CreateUpdateMailListMembers = {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
};
export declare type CreateUpdateMailListMembersReq = {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
};
export declare type DeletedMember = {
    member: {
        address: string;
    };
    message: string;
};
export declare type NewMultipleMembersResponse = {
    list: MailingList;
    message: string;
    'task-id': string;
};
export declare type MailListMembersResponse = {
    body: {
        items: MailListMember[];
        paging: PagesList;
    };
    status: number;
};
export declare type MailListMembersResult = {
    items: MailListMember[];
    pages: ParsedPagesList;
    status: number;
};
