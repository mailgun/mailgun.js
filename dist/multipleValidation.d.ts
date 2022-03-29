import { CanceledMultipleValidationJob, CreatedMultipleValidationJob, IMultipleValidationClient, MultipleValidationJob, MultipleValidationJobsListResult } from './interfaces/MultipleValidation';
import Request from './request';
export default class MultipleValidationClient implements IMultipleValidationClient {
    request: Request;
    constructor(request: Request);
    list(): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJob>;
    create(listId: string, file: any): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
