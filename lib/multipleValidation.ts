import APIResponse from './interfaces/ApiResponse';
import {
  CanceledMultipleValidationJob,
  CreatedMultipleValidationJob,
  IMultipleValidationClient,
  MultipleValidationCreationDataUpdated,
  MultipleValidationCreationData,
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

  private handleResponse<T>(response: APIResponse): T {
    return {
      status: response.status,
      ...response?.body
    } as T;
  }

  async list(): Promise<MultipleValidationJobsListResult> {
    const response = await this.request.get('/v4/address/validate/bulk');
    return this.handleResponse<MultipleValidationJobsListResult>(response);
  }

  async get(listId: string): Promise<MultipleValidationJob> {
    const response = await this.request.get(`/v4/address/validate/bulk/${listId}`);
    return {
      responseStatusCode: response.status,
      ...response?.body
    };
  }

  async create(
    listId: string,
    data: MultipleValidationCreationData
  ): Promise<CreatedMultipleValidationJob> {
    const multipleValidationData: MultipleValidationCreationDataUpdated = {
      multipleValidationFile: {
        ...data?.file
      },
      ...data
    };
    delete multipleValidationData.file;
    const response = await this.request.postWithFD(`/v4/address/validate/bulk/${listId}`, multipleValidationData);
    return this.handleResponse<CreatedMultipleValidationJob>(response);
  }

  async destroy(listId: string): Promise<CanceledMultipleValidationJob> {
    const response = await this.request.delete(`/v4/address/validate/bulk/${listId}`);
    return this.handleResponse<CanceledMultipleValidationJob>(response);
  }
}
