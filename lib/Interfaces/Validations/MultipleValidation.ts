import {
  MultipleValidationJobsListResult,
  MultipleValidationJobResult,
  CreatedMultipleValidationJob,
  CanceledMultipleValidationJob
} from '../../Types/Validations';

export interface IMultipleValidationClient {
  list(): Promise<MultipleValidationJobsListResult>
  get(listId: string): Promise<MultipleValidationJobResult>
  create(listId: string, file: any): Promise<CreatedMultipleValidationJob>
  destroy(listId: string): Promise<CanceledMultipleValidationJob>
}
