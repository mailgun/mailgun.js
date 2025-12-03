import urljoin from 'url-join';

import Request from '../common/Request.js';
import {
  LogsEvent, LogsEventItem, LogsList, LogsParsedQuery, LogsQuery
} from '../../Types/Logs/Logs.js';
import { ILogsClient } from '../../Interfaces/Logs/ILogsClient.js';
import APIError from '../common/Error.js';
import { APIResponse } from '../../definitions.js';

export default class LogsClient implements ILogsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private parseListResponse(response: APIResponse): LogsList {
    const parsedResponse: LogsList = {
      start: new Date(response.body.start),
      end: new Date(response.body.end),
      status: response.status,
      pagination: response.body.pagination,
      items: response.body.items.map((item: LogsEvent) => {
        const responseItem: LogsEventItem = { ...item, '@timestamp': new Date(item['@timestamp']) };
        return responseItem;
      }),
      aggregates: response.body.aggregates
    };
    return parsedResponse;
  }

  private prepareDate(date: Date): string {
    // 'Wed, 03 Dec 2025 00:00:00 -0000'
    const formattedDate = `${date.toUTCString().slice(0, 25)} -0000`;
    return formattedDate;
  }

  private parseQuery(queryData: LogsQuery): LogsParsedQuery {
    const res: LogsParsedQuery = { ...queryData, start: '', end: '' };
    if (queryData.start) {
      res.start = this.prepareDate(queryData.start);
    }
    if (queryData.end) {
      res.end = this.prepareDate(queryData.end);
    }
    return res;
  }

  private validateQuery(queryData: LogsQuery): void {
    if (!queryData) {
      throw APIError.getUserDataError('Missed parameter', '"logs.list": Query data is required');
    }

    if (queryData?.start) {
      if ((!(queryData?.start instanceof Date) || Number.isNaN(queryData.start.getTime()))) {
        throw APIError.getUserDataError('Incorrect type', '"logs.list": Type of "start" must be valid JS Data object');
      }
    } else {
      throw APIError.getUserDataError('Missed property', '"logs.list": "start" property is required');
    }

    if (queryData?.end) {
      if ((!(queryData?.end instanceof Date) || Number.isNaN(queryData.end.getTime()))) {
        throw APIError.getUserDataError('Incorrect type', '"logs.list": Type of "end" must be valid JS Data object');
      }
    }

    if (queryData.filter) {
      if (!queryData.filter.AND) {
        throw APIError.getUserDataError('Incorrect filter', '"logs.list": Logs filter must have AND operator');
      }
      if (!Array.isArray(queryData.filter.AND) || queryData.filter.AND.length === 0) {
        throw APIError.getUserDataError('Incorrect filter', '"logs.list": Logs filter AND operator must be an array');
      }

      queryData.filter.AND.forEach((condition) => {
        if (!condition.attribute || !condition.comparator || !condition.values) {
          throw APIError.getUserDataError('Incorrect filter', '"logs.list": Each condition in Logs filter AND operator must have attribute, comparator and values');
        }
        if (!Array.isArray(condition.values) || condition.values.length === 0) {
          throw APIError.getUserDataError('Incorrect filter', '"logs.list": Values in each condition of Logs filter AND operator must be an array');
        }

        condition.values.forEach((value) => {
          if (!value.label || !value.value) {
            throw APIError.getUserDataError('Incorrect filter', '"logs.list": Each value in Logs filter condition must have label and value');
          }
        });
      });
    }
  }

  async list(queryData: LogsQuery) : Promise<LogsList> {
    this.validateQuery(queryData);
    const preparedQuery = this.parseQuery(queryData);
    const response = await this.request.post(urljoin('/v1/analytics/logs'), preparedQuery);
    return this.parseListResponse(response);
  }
}
