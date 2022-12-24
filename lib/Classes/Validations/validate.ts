import {
  IMultipleValidationClient,
  ValidationResult,
  ValidationResponse,
  ValidationQuery
} from '../../interfaces/Validations/index';

import Request from '../common/Request';

export default class ValidateClient {
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
