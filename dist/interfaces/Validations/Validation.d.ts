import { ValidationResult } from '../../Types/Validations';
export interface IValidateClient {
    get(address: string): Promise<ValidationResult>;
}
