import { IValidationClient, IMultipleValidationClient } from '../../Interfaces/Validations/index.js';
import { ValidationQuery, ValidationResult, ValidationResponse } from '../../Types/Validations/index.js';
import Request from '../common/Request.js';

export default class ValidateClient implements IValidationClient {
  public multipleValidation;
  request: Request;

  constructor(request: Request, multipleValidationClient: IMultipleValidationClient) {
    this.request = request;
    this.multipleValidation = multipleValidationClient;
  }

  async get(address: string): Promise<ValidationResult> {
    const query: ValidationQuery = { address };
    const result: ValidationResponse = await this.request.get('/v4/address/validate', query);
    return result.body as ValidationResult;
  }
}
