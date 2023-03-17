import { ValidationResult } from '../../Types/Validations';
export interface IValidationClient {
    get(address: string): Promise<ValidationResult>;
}
