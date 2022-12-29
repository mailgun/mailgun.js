import Request from './common/Request';
import { StatsQuery, StatsOptions, Stat } from '../Types/Stats';
declare class Stats {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
    constructor(data: StatsOptions);
}
export default class StatsClient {
    request: Request;
    constructor(request: Request);
    private convertDateToEpochTimeString;
    private prepareSearchParams;
    _parseStats(response: {
        body: StatsOptions;
    }): Stats;
    getDomain(domain: string, query?: StatsQuery): Promise<Stats>;
    getAccount(query?: StatsQuery): Promise<Stats>;
}
export {};
