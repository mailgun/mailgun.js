import { StatsQuery } from '../../Types/Stats/index.js';
import { IStatsContainer } from './StatsContainer.js';
export interface IStatsClient {
    getDomain(domain: string, query?: StatsQuery): Promise<IStatsContainer>;
    getAccount(query?: StatsQuery): Promise<IStatsContainer>;
}
