import { PagesList, ParsedPagesList } from '../Common';
export type ListsQuery = {
    address?: string;
    limit?: number;
    page?: string;
};
export type CreateUpdateList = {
    address: string;
    name?: string;
    description?: string;
    access_level?: 'readonly' | 'members' | 'everyone';
    reply_preference?: 'list' | 'sender';
};
export type DestroyedList = {
    address: string;
    message: string;
};
export type StartValidationResult = {
    status: number;
    id: string;
    message: string;
};
export type ValidationResponse = {
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
export type ValidationApiResponse = ValidationResponse & {
    created_at: number;
};
export type ValidationResultData = ValidationResponse & {
    created_at: Date;
};
export type ValidationResult = {
    status: number;
    validationResult: ValidationResultData;
};
export type CancelValidationResult = {
    status: number;
    message: string;
};
export type MailingList = {
    access_level: string;
    address: string;
    created_at: string;
    description: string;
    members_count: number;
    name: string;
    reply_preference: null | string;
};
export type MailingListResult = {
    items: MailingList[];
    status: number;
    pages: ParsedPagesList;
};
export type MailingListApiResponse = {
    body: {
        items: MailingList[];
        paging: PagesList;
    };
    status: number;
};
