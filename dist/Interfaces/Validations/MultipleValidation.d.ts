import { MultipleValidationJobsListResult, MultipleValidationJobResult, CreatedMultipleValidationJob, CanceledMultipleValidationJob, MultipleValidationCreationData } from '../../Types/Validations';
export interface IMultipleValidationClient {
    list(): Promise<MultipleValidationJobsListResult>;
    get(listId: string): Promise<MultipleValidationJobResult>;
    create(listId: string, data: MultipleValidationCreationData): Promise<CreatedMultipleValidationJob>;
    destroy(listId: string): Promise<CanceledMultipleValidationJob>;
}
