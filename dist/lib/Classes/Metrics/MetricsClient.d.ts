import Request from '../common/Request';
import { ILogger } from '../../Interfaces/Common';
import { IMetricsClient } from '../../Interfaces/Metrics/MetricsClient';
import { MetricsQuery, MetricsResult } from '../../Types/Metrics';
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
