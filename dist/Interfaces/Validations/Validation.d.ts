import { ValidationResult } from '../../Types/Validations';
import { IMultipleValidationClient } from './MultipleValidation';
export interface IValidationClient {
    multipleValidation: IMultipleValidationClient;
    get(address: string): Promise<ValidationResult>;
}
