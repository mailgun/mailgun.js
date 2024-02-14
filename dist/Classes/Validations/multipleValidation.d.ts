import NavigationThruPages from '../common/NavigationThruPages';
import Request from '../common/Request';
import { IMultipleValidationClient } from '../../Interfaces/Validations';
import { MultipleValidationJobResult, MultipleValidationJobData, MultipleValidationJobsListResult, MultipleValidationJobsListResponse, MultipleValidationJobsListQuery, MultipleValidationCreationData, CreatedMultipleValidationJob, CanceledMultipleValidationJob } from '../../Types/Validations/MultipleValidation';
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
    private attachmentsHandler;
    constructor(request: Request);
    private handleResponse;
    protected parseList(response: MultipleValidationJobsListResponse): MultipleValidationJobsListResult;
    list(query?: MultipleValidationJobsListQuery): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJob>;
    private convertToExpectedShape;
    create(listId: string, data: MultipleValidationCreationData): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
