import { IValidationClient, IMultipleValidationClient } from '../../Interfaces/Validations';
import { ValidationResult } from '../../Types/Validations';
import Request from '../common/Request';
export default class ValidateClient implements IValidationClient {
    multipleValidation: IMultipleValidationClient;
    request: Request;
    constructor(request: Request, multipleValidationClient: IMultipleValidationClient);
    get(address: string): Promise<ValidationResult>;
}
