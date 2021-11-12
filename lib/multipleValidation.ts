import {
  CanceledMultipleValidationJob,
  CreatedMultipleValidationJob,
  IMultipleValidationClient,
  MultipleValidationJob,
  MultipleValidationJobsListResult
}
  from './interfaces/MultipleValidation';
import Request from './request';

export default class MultipleValidationClient implements IMultipleValidationClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(): Promise<MultipleValidationJobsListResult> {
    return this.request.get('/v4/address/validate/bulk')
      .then((response) => response.body as MultipleValidationJobsListResult);
  }

  get(listId: string): Promise<MultipleValidationJob> {
    return this.request.get(`/v4/address/validate/bulk/${listId}`)
      .then((response) => response.body);
  }

  create(listId: string, file: any): Promise<CreatedMultipleValidationJob> {
    return this.request.postWithFD(`/v4/address/validate/bulk/${listId}`, file)
      .then((response) => response.body);
  }

  destroy(listId: string): Promise<CanceledMultipleValidationJob> {
    return this.request.delete(`/v4/address/validate/bulk/${listId}`)
      .then((response) => response);
  }
}
