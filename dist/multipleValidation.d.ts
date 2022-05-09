import { CanceledMultipleValidationJob, CreatedMultipleValidationJob, IMultipleValidationClient, MultipleValidationCreationData, MultipleValidationJob, MultipleValidationJobsListResult } from './interfaces/MultipleValidation';
import Request from './request';
export default class MultipleValidationClient implements IMultipleValidationClient {
    request: Request;
    constructor(request: Request);
    private handleResponse;
    list(): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJob>;
    create(listId: string, data: MultipleValidationCreationData): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
