import APIResponse from './interfaces/ApiResponse';
import { IMultipleValidationClient } from './interfaces/MultipleValidation';
import { ValidationResult, ValidationResponse } from './interfaces/Validate';
import Request from './request';

export default class ValidateClient {
  public multipleValidation;
  request: Request;

  constructor(request: Request, multipleValidationClient: IMultipleValidationClient) {
    this.request = request;
    this.multipleValidation = multipleValidationClient;
  }

  get(address: string): Promise<ValidationResult> {
    return this.request.get('/v4/address/validate', { address })
      .then((response : APIResponse) => response)
      .then((res : ValidationResponse) => res.body as ValidationResult);
  }
}
