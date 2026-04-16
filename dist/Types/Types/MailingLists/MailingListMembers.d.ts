import { PagesList, ParsedPagesList } from '../Common/index.js';
import { CustomFile, CustomFileData } from '../Messages/Messages.js';
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
export type MailListMembersByAddressQuery = {
    subscribed?: boolean;
    address?: string;
    limit?: number;
    skip?: number;
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
export type MailListMembersByAddressResult = {
    items: MailListMember[];
    total_count: number;
    status: number;
};
export type MailListMembersUploadData = CustomFileData | CustomFile;
export type MailListMembersUploadDataUpdated = {
    members: MailListMembersUploadData;
    subscribed: string;
    upsert: string;
};
export type MailListMembersUploadResponse = {
    list: MailingList;
    message: string;
    'task-id': string;
};
