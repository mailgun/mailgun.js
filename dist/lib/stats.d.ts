import Request from './request';
import StatsOptions from './interfaces/StatsOptions';
declare class Stats {
    start: Date;
    end: Date;
    resolution: string;
    stats: any;
    constructor(data: StatsOptions);
}
export default class StatsClient {
    request: Request;
    constructor(request: Request);
    _parseStats(response: {
        body: StatsOptions;
    }): Stats;
    getDomain(domain: string, query: any): Promise<Stats>;
    getAccount(query: any): Promise<Stats>;
}
export {};
