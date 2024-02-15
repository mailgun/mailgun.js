import { PagesList, ParsedPagesList } from '../Common';
import { CustomFile, CustomFileData } from '../Messages';
export type MultipleValidationJobData = {
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
export type MultipleValidationJobResult = {
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
export type CreatedMultipleValidationJob = {
    id: string;
    message: string;
};
export type MultipleValidationCreationData = {
    file: CustomFileData | CustomFile;
};
export type MultipleValidationCreationDataUpdated = {
    multipleValidationFile: CustomFileData | CustomFile;
};
export type MultipleValidationJobsListResult = {
    jobs: MultipleValidationJobResult[];
    pages: ParsedPagesList;
    total: number;
    status: number;
};
export type MultipleValidationJobsListQuery = {
    limit: number;
    page?: string;
};
export type MultipleValidationJobsListResponse = {
    status: number;
    body: {
        paging: PagesList;
        jobs: MultipleValidationJobData[];
        total: number;
    };
};
export type CanceledMultipleValidationJob = {
    message: string;
    status: number;
};
