import { MetricsQuery, MetricsResult } from '../../Types/Metrics/index.js';
export interface IMetricsClient {
    getAccount(query?: MetricsQuery): Promise<MetricsResult>;
    getAccountUsage(query?: MetricsQuery): Promise<MetricsResult>;
}
