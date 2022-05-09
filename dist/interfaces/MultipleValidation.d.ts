export interface MultipleValidationJob {
    created_at: number;
    download_url: {
        csv: string;
        json: string;
    };
    id: string;
    quantity: number;
    records_processed: number;
    status: string;
    responseStatusCode: number;
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
export interface PagesList {
    prev: string;
    first: string;
    last: string;
    next: string;
}
export interface MultipleValidationJobsListResult {
    jobs: MultipleValidationJob[];
    paging: PagesList;
    total: number;
    status: number;
}
export interface MultipleValidationJobsListResponse {
    status: 200;
    body: MultipleValidationJobsListResult;
}
export interface CanceledMultipleValidationJob {
    message: string;
    status: number;
}
export interface IMultipleValidationClient {
    list(): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJob>;
    create(listId: string, file: any): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
