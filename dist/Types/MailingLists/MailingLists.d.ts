import { PagesList, ParsedPagesList } from '../Common';
export declare type ListsQuery = {
    address?: string;
    limit?: number;
    page?: string;
};
export declare type CreateUpdateList = {
    address: string;
    name?: string;
    description?: string;
    access_level?: 'readonly' | 'members' | 'everyone';
    reply_preference?: 'list' | 'sender';
};
export declare type DestroyedList = {
    address: string;
    message: string;
};
export declare type StartValidationResult = {
    status: number;
    id: string;
    message: string;
};
export declare type MailingListValidationResponse = {
    status: string;
    download_url: {
        csv: string;
        json: string;
    };
    id: string;
    quantity: number;
    records_processed: number;
    summary: {
        result: {
            catch_all: number;
            deliverable: number;
            do_not_send: number;
            undeliverable: number;
            unknown: number;
        };
        risk: {
            high: number;
            low: number;
            medium: number;
            unknown: number;
        };
    };
};
export declare type MailingListValidationApiResponse = MailingListValidationResponse & {
    created_at: number;
};
export declare type MailingListValidationResultData = MailingListValidationResponse & {
    created_at: Date;
};
export declare type MailingListValidationResult = {
    status: number;
    validationResult: MailingListValidationResultData;
};
export declare type MailingListCancelValidationResult = {
    status: number;
    message: string;
};
export declare type MailingList = {
    access_level: string;
    address: string;
    created_at: string;
    description: string;
    members_count: number;
    name: string;
    reply_preference: null | string;
};
export declare type MailingListResult = {
    items: MailingList[];
    status: number;
    pages: ParsedPagesList;
};
export declare type MailingListApiResponse = {
    body: {
        items: MailingList[];
        paging: PagesList;
    };
    status: number;
};
