import { ValidationResult } from '../../Types/Validations/index.js';
import { IMultipleValidationClient } from './MultipleValidation.js';
export interface IValidationClient {
    multipleValidation: IMultipleValidationClient;
    get(address: string): Promise<ValidationResult>;
}
