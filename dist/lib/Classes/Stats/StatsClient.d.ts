import Request from '../common/Request';
import { StatsQuery } from '../../Types/Stats';
import { ILogger } from '../../Interfaces/Common';
import { IStatsClient, IStatsContainer } from '../../Interfaces/Stats';
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
