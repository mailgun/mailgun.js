import { StatsQuery } from '../../Types/Stats';
import { IStatsContainer } from './StatsContainer';
export interface IStatsClient {
    getDomain(domain: string, query?: StatsQuery): Promise<IStatsContainer>;
    getAccount(query?: StatsQuery): Promise<IStatsContainer>;
}
