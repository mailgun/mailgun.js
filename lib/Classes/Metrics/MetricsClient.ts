import Request from '../common/Request';
import { ILogger } from '../../Interfaces/Common';
import { IMetricsClient } from '../../Interfaces/Metrics/MetricsClient';
import {
  MetricsAPIQuery, MetricsAPIResponse, MetricsQuery, MetricsResult
} from '../../Types/Metrics';

export default class MetricsClient implements IMetricsClient {
  request: Request;
  private logger: ILogger;

  constructor(request: Request, logger: ILogger = console) {
    this.request = request;
    this.logger = logger;
  }

  private convertDateToUTC(key:string, inputDate: Date): string {
    /*
      Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
      (plus 2 hours from the timezone)
      and because for API, we need to provide the date in the expected format
      ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
      Here we try auto-convert them to UTC
    */
    this.logger.warn(`Date:"${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toUTCString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
    return inputDate.toUTCString();
  }

  private prepareQuery(query: MetricsQuery | undefined): MetricsAPIQuery {
    let startDate;
    let endDate;
    if (query) {
      const qStart = query?.start;
      const qEnd = query?.end;
      startDate = qStart instanceof Date ? this.convertDateToUTC('start', qStart) : qStart ?? '';
      endDate = qEnd && qEnd instanceof Date ? this.convertDateToUTC('end', qEnd) : qEnd ?? '';
    }
    const result: MetricsAPIQuery = {
      ...query,
      start: startDate,
      end: endDate
    };
    return result;
  }

  private handleResponse(response: MetricsAPIResponse): MetricsResult {
    const resBody = response.body;
    const startDate = Date.parse(resBody.start) ? new Date(resBody.start) : null;
    const endDate = Date.parse(resBody.end) ? new Date(resBody.end) : null;
    const result: MetricsResult = {
      ...resBody,
      status: response.status,
      start: startDate,
      end: endDate
    };
    return result;
  }

  async getAccount(query?: MetricsQuery): Promise<MetricsResult> {
    const queryData = this.prepareQuery(query);
    const response: MetricsAPIResponse = await this.request.post('/v1/analytics/metrics', queryData);
    return this.handleResponse(response);
  }

  async getAccountUsage(query?: MetricsQuery): Promise<MetricsResult> {
    const queryData = this.prepareQuery(query);
    const response: MetricsAPIResponse = await this.request.post('/v1/analytics/usage/metrics', queryData);
    return this.handleResponse(response);
  }
}
