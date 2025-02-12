import Request from '../common/Request.js';
import { StatsQuery } from '../../Types/Stats/index.js';
import { ILogger, IStatsClient, IStatsContainer } from '../../Interfaces/index.js';
export default class StatsClient implements IStatsClient {
    request: Request;
    private logger;
    constructor(request: Request, logger?: ILogger);
    private convertDateToUTC;
    private prepareSearchParams;
    private parseStats;
    getDomain(domain: string, query?: StatsQuery): Promise<IStatsContainer>;
    getAccount(query?: StatsQuery): Promise<IStatsContainer>;
}
