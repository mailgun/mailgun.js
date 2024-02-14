import NavigationThruPages from '../common/NavigationThruPages';
import { APIResponse } from '../../Types/Common/ApiResponse';

import Request from '../common/Request';
import { IMultipleValidationClient } from '../../Interfaces/Validations';
import {
  MultipleValidationJobResult,
  MultipleValidationJobData,
  MultipleValidationJobsListResult,
  MultipleValidationJobsListResponse,
  MultipleValidationJobsListQuery,
  MultipleValidationCreationData,
  CreatedMultipleValidationJob,
  MultipleValidationCreationDataUpdated,
  CanceledMultipleValidationJob
} from '../../Types/Validations/MultipleValidation';
import AttachmentsHandler from '../common/AttachmentsHandler';
import APIError from '../common/Error';

export class MultipleValidationJob implements MultipleValidationJobResult {
  createdAt: Date;
  id: string;
  quantity: number
  recordsProcessed: number | null;
  status: string;
  downloadUrl?: {
    csv: string;
    json: string;
  };

  responseStatusCode: number;
  summary?: {
      result: {
          catchAll: number;
          deliverable: number;
          doNotSend: number;
          undeliverable: number;
          unknown: number;
      };
      risk: {
          high: number;
          low: number;
          medium: number;
          unknown: number;
      }
  }

  constructor(data: MultipleValidationJobData, responseStatusCode: number) {
    this.createdAt = new Date(data.created_at);
    this.id = data.id;
    this.quantity = data.quantity;
    this.recordsProcessed = data.records_processed;
    this.status = data.status;
    this.responseStatusCode = responseStatusCode;
    if (data.download_url) {
      this.downloadUrl = {
        csv: data.download_url?.csv,
        json: data.download_url?.json
      };
    }
    if (data.summary) {
      this.summary = {
        result: {
          catchAll: data.summary.result.catch_all,
          deliverable: data.summary.result.deliverable,
          doNotSend: data.summary.result.do_not_send,
          undeliverable: data.summary.result.undeliverable,
          unknown: data.summary.result.unknown
        },
        risk: {
          high: data.summary.risk.high,
          low: data.summary.risk.low,
          medium: data.summary.risk.medium,
          unknown: data.summary.risk.unknown
        }
      };
    }
  }
}

export default class MultipleValidationClient
  extends NavigationThruPages<MultipleValidationJobsListResult>
  implements IMultipleValidationClient {
  request: Request;
  private attachmentsHandler: AttachmentsHandler;

  constructor(request: Request) {
    super();
    this.request = request;
    this.attachmentsHandler = new AttachmentsHandler();
  }

  private handleResponse<T>(response: APIResponse): T {
    return {
      status: response.status,
      ...response?.body
    } as T;
  }

  protected parseList(response: MultipleValidationJobsListResponse)
    : MultipleValidationJobsListResult {
    const data = {} as MultipleValidationJobsListResult;

    data.jobs = response.body.jobs.map((job) => new MultipleValidationJob(job, response.status));

    data.pages = this.parsePageLinks(response, '?', 'pivot');
    data.total = response.body.total;
    data.status = response.status;

    return data;
  }

  async list(query?: MultipleValidationJobsListQuery): Promise<MultipleValidationJobsListResult> {
    return this.requestListWithPages('/v4/address/validate/bulk', query);
  }

  async get(listId: string): Promise<MultipleValidationJob> {
    const response = await this.request.get(`/v4/address/validate/bulk/${listId}`);
    return new MultipleValidationJob(response.body, response.status);
  }

  private convertToExpectedShape(data: MultipleValidationCreationData)
    : MultipleValidationCreationDataUpdated {
    let multipleValidationData: MultipleValidationCreationDataUpdated;
    if (this.attachmentsHandler.isBuffer(data.file)) {
      multipleValidationData = { multipleValidationFile: data.file };
    } else if (typeof data.file === 'string') {
      multipleValidationData = { multipleValidationFile: { data: data.file } };
    } else if (this.attachmentsHandler.isStream(data.file)) {
      multipleValidationData = { multipleValidationFile: data.file };
    } else {
      multipleValidationData = { multipleValidationFile: data.file };
    }

    return multipleValidationData;
  }

  async create(
    listId: string,
    data: MultipleValidationCreationData
  ): Promise<CreatedMultipleValidationJob> {
    if (!data || !data.file) {
      throw APIError.getUserDataError('"file" property expected.', 'Make sure second argument has "file" property.');
    }
    const multipleValidationData = this.convertToExpectedShape(data);
    const response = await this.request.postWithFD(`/v4/address/validate/bulk/${listId}`, multipleValidationData);
    return this.handleResponse<CreatedMultipleValidationJob>(response);
  }

  async destroy(listId: string): Promise<CanceledMultipleValidationJob> {
    const response = await this.request.delete(`/v4/address/validate/bulk/${listId}`);
    return this.handleResponse<CanceledMultipleValidationJob>(response);
  }
}
