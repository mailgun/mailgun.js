import NavigationThruPages from './common/NavigationThruPages';
import { CanceledMultipleValidationJob, CreatedMultipleValidationJob, IMultipleValidationClient, MultipleValidationCreationData, MultipleValidationJobsListResult, MultipleValidationJobsListResponse, MultipleValidationJobData, MultipleValidationJobResult, MultipleValidationJobsListQuery } from './interfaces/MultipleValidation';
import Request from './request';
export declare class MultipleValidationJob implements MultipleValidationJobResult {
    createdAt: Date;
    id: string;
    quantity: number;
    recordsProcessed: number | null;
    status: string;
    downloadUrl?: {
        csv: string;
        json: string;
    };
    responseStatusCode: number;
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
    constructor(data: MultipleValidationJobData, responseStatusCode: number);
}
export default class MultipleValidationClient extends NavigationThruPages<MultipleValidationJobsListResult> implements IMultipleValidationClient {
    request: Request;
    constructor(request: Request);
    private handleResponse;
    protected parseList(response: MultipleValidationJobsListResponse): MultipleValidationJobsListResult;
    list(query?: MultipleValidationJobsListQuery): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJob>;
    create(listId: string, data: MultipleValidationCreationData): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
