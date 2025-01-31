import { Stat } from '../../Types/Stats';
export interface IStatsContainer {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
}
