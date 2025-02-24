import Request from '../common/Request.js';
import { MetricsQuery, MetricsResult } from '../../Types/Metrics/index.js';
import { ILogger, IMetricsClient } from '../../Interfaces/index.js';
export default class MetricsClient implements IMetricsClient {
    request: Request;
    private logger;
    constructor(request: Request, logger?: ILogger);
    private convertDateToUTC;
    private prepareQuery;
    private handleResponse;
    getAccount(query?: MetricsQuery): Promise<MetricsResult>;
    getAccountUsage(query?: MetricsQuery): Promise<MetricsResult>;
}
