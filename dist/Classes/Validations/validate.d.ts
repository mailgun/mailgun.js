import { IMultipleValidationClient, ValidationResult } from '../../interfaces/Validations/index';
import Request from '../common/Request';
export default class ValidateClient {
    multipleValidation: IMultipleValidationClient;
    request: Request;
    constructor(request: Request, multipleValidationClient: IMultipleValidationClient);
    get(address: string): Promise<ValidationResult>;
}
