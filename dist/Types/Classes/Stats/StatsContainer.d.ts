import { IStatsContainer } from '../../Interfaces/Stats';
import { Stat, StatsOptions } from '../../Types/Stats';
export default class StatsContainer implements IStatsContainer {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
    constructor(data: StatsOptions);
}
