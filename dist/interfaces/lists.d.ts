import { PagesList, ParsedPagesList } from './NavigationThruPages';
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
export interface DestroyedList {
    address: string;
    message: string;
}
export interface StartValidationResult {
    status: number;
    id: string;
    message: string;
}
export interface ValidationResponse {
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
}
export interface ValidationApiResponse extends ValidationResponse {
    created_at: number;
}
export interface ValidationResultData extends ValidationResponse {
    created_at: Date;
}
export interface ValidationResult {
    status: number;
    validationResult: ValidationResultData;
}
export interface CancelValidationResult {
    status: number;
    message: string;
}
export interface MailingList {
    access_level: string;
    address: string;
    created_at: string;
    description: string;
    members_count: number;
    name: string;
    reply_preference: null | string;
}
export interface MailingListResult {
    items: MailingList[];
    status: number;
    pages: ParsedPagesList;
}
export interface MailingListApiResponse {
    body: {
        items: MailingList[];
        paging: PagesList;
    };
    status: number;
}
