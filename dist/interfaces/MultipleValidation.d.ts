import { PagesList, ParsedPagesList } from './NavigationThruPages';
export interface MultipleValidationJobData {
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
}
export interface MultipleValidationJobResult {
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
}
export interface CreatedMultipleValidationJob {
    id: string;
    message: string;
}
export interface MultipleValidationCreationData {
    file: Record<string, unknown>;
    [key: string]: unknown | undefined;
}
export interface MultipleValidationCreationDataUpdated {
    multipleValidationFile: Record<string, unknown>;
    [key: string]: unknown | undefined;
}
export interface MultipleValidationJobsListResult {
    jobs: MultipleValidationJobResult[];
    pages: ParsedPagesList;
    total: number;
    status: number;
}
export interface MultipleValidationJobsListQuery {
    limit: number;
    page: string;
}
export interface MultipleValidationJobsListResponse {
    status: number;
    body: {
        paging: PagesList;
        jobs: MultipleValidationJobData[];
        total: number;
    };
}
export interface CanceledMultipleValidationJob {
    message: string;
    status: number;
}
export interface IMultipleValidationClient {
    list(): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJobResult>;
    create(listId: string, file: any): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
