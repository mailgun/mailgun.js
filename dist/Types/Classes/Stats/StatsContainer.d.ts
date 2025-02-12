import { IStatsContainer } from '../../Interfaces/Stats/index.js';
import { Stat, StatsOptions } from '../../Types/Stats/index.js';
export default class StatsContainer implements IStatsContainer {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
    constructor(data: StatsOptions);
}
