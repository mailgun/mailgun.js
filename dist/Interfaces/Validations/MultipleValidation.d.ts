import { MultipleValidationJobsListResult, MultipleValidationJobResult, CreatedMultipleValidationJob, CanceledMultipleValidationJob, MultipleValidationCreationData, MultipleValidationJobsListQuery } from '../../Types/Validations';
export interface IMultipleValidationClient {
    list(query?: MultipleValidationJobsListQuery): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJobResult>;
    create(listId: string, data: MultipleValidationCreationData): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
