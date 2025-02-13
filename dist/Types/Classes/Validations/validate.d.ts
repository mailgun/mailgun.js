import { IValidationClient, IMultipleValidationClient } from '../../Interfaces/Validations/index.js';
import { ValidationResult } from '../../Types/Validations/index.js';
import Request from '../common/Request.js';
export default class ValidateClient implements IValidationClient {
    multipleValidation: IMultipleValidationClient;
    request: Request;
    constructor(request: Request, multipleValidationClient: IMultipleValidationClient);
    get(address: string): Promise<ValidationResult>;
}
