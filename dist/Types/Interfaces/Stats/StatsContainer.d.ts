import { Stat } from '../../Types/Stats/index.js';
export interface IStatsContainer {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
}
