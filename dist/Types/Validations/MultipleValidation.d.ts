import { PagesList, ParsedPagesList } from '../Common';
export declare type MultipleValidationJobData = {
    created_at: number;
    id: string;
    quantity: number;
    records_processed: number | null;
    status: string;
    download_url?: {
        csv: string;
        json: string;
    };
    summary?: {
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
export declare type MultipleValidationJobResult = {
    createdAt: Date;
    id: string;
    quantity: number;
    recordsProcessed: number | null;
    status: string;
    responseStatusCode: number;
    downloadUrl?: {
        csv: string;
        json: string;
    };
    summary?: {
        result: {
            catchAll: number;
            deliverable: number;
            doNotSend: number;
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
export declare type CreatedMultipleValidationJob = {
    id: string;
    message: string;
};
export declare type MultipleValidationCreationData = {
    file: Record<string, unknown>;
    [key: string]: unknown | undefined;
};
export declare type MultipleValidationCreationDataUpdated = {
    multipleValidationFile: Record<string, unknown>;
    [key: string]: unknown | undefined;
};
export declare type MultipleValidationJobsListResult = {
    jobs: MultipleValidationJobResult[];
    pages: ParsedPagesList;
    total: number;
    status: number;
};
export declare type MultipleValidationJobsListQuery = {
    limit: number;
    page: string;
};
export declare type MultipleValidationJobsListResponse = {
    status: number;
    body: {
        paging: PagesList;
        jobs: MultipleValidationJobData[];
        total: number;
    };
};
export declare type CanceledMultipleValidationJob = {
    message: string;
    status: number;
};
