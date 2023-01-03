import Request from './common/Request';
import { StatsQuery, StatsOptions, Stat } from '../Types/Stats';
import { ILogger } from '../Interfaces/Common';
declare class Stats {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
    constructor(data: StatsOptions);
}
export default class StatsClient {
    request: Request;
    private logger;
    constructor(request: Request, logger?: ILogger);
    private convertDateToUTC;
    private prepareSearchParams;
    _parseStats(response: {
        body: StatsOptions;
    }): Stats;
    getDomain(domain: string, query?: StatsQuery): Promise<Stats>;
    getAccount(query?: StatsQuery): Promise<Stats>;
}
export {};
