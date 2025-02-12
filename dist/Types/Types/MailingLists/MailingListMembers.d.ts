import { PagesList, ParsedPagesList } from '../Common/index.js';
import { MailingList } from './MailingLists.js';
export type MailListMember = {
    address: string;
    name: string;
    subscribed: boolean;
    vars: {
        [key: string]: unknown;
    };
};
export type MailListMembersQuery = {
    subscribed?: 'yes' | 'no';
    limit?: number;
    page?: string;
};
export type MultipleMembersData = {
    members: Array<MailListMember>;
    upsert: 'yes' | 'no';
};
export type MultipleMembersReqData = {
    members: string;
    upsert: 'yes' | 'no';
};
export type CreateUpdateMailListMembers = {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
};
export type CreateUpdateMailListMembersReq = {
    address: string;
    name?: string;
    vars?: string;
    subscribed?: 'yes' | 'no' | boolean;
    upsert?: 'yes' | 'no';
};
export type DeletedMember = {
    member: {
        address: string;
    };
    message: string;
};
export type NewMultipleMembersResponse = {
    list: MailingList;
    message: string;
    'task-id': string;
};
export type MailListMembersResponse = {
    body: {
        items: MailListMember[];
        paging: PagesList;
    };
    status: number;
};
export type MailListMembersResult = {
    items: MailListMember[];
    pages: ParsedPagesList;
    status: number;
};
