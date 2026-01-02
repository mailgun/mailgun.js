import Request from '../common/Request.js';
import { IBounceClassificationClient } from '../../Interfaces/index.js';
import {
  BounceClassificationAPIQuery,
  BounceClassificationAPIResponse,
  BounceClassificationQueryData,
  BounceClassificationResult
} from '../../Types/index.js';

export default class BounceClassificationClient implements IBounceClassificationClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private prepareDate(date: Date): string {
    const formattedDate = `${date.toUTCString().slice(0, 25)} -0000`; // expected format 'Wed, 03 Dec 2025 00:00:00 -0000'
    return formattedDate;
  }

  private parseQuery(queryData: BounceClassificationQueryData): BounceClassificationAPIQuery {
    const res: BounceClassificationAPIQuery = {
      ...queryData,
      start: undefined,
      end: undefined,
      include_subaccounts: undefined
    };
    if (queryData.start) {
      res.start = this.prepareDate(queryData.start);
    }
    if (queryData.end) {
      res.end = this.prepareDate(queryData.end);
    }
    return res;
  }

  private parseResponse(body: BounceClassificationAPIResponse): BounceClassificationResult {
    const res: BounceClassificationResult = {
      ...body,
      start: new Date(body.start),
      end: new Date(body.end)
    };
    return res;
  }

  async list(queryData: BounceClassificationQueryData): Promise<BounceClassificationResult> {
    const preparedQueryData = this.parseQuery(queryData);
    const response = await this.request.post('/v2/bounce-classification/metrics', preparedQueryData);
    return this.parseResponse(response.body);
  }
}
