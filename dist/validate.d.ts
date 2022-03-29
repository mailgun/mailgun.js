import { IMultipleValidationClient } from './interfaces/MultipleValidation';
import { ValidationResult } from './interfaces/Validate';
import Request from './request';
export default class ValidateClient {
    multipleValidation: IMultipleValidationClient;
    request: Request;
    constructor(request: Request, multipleValidationClient: IMultipleValidationClient);
    get(address: string): Promise<ValidationResult>;
}
