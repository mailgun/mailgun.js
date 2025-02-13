import { IStatsContainer } from '../../Interfaces/Stats/index.js';
import { Stat, StatsOptions } from '../../Types/Stats/index.js';

export default class StatsContainer implements IStatsContainer {
    start: Date;
    end: Date;
    resolution: string;
    stats: Stat[];
    constructor(data: StatsOptions) {
      this.start = new Date(data.start);
      this.end = new Date(data.end);
      this.resolution = data.resolution;
      this.stats = data.stats.map(function (stat: Stat) {
        const res = { ...stat };
        res.time = new Date(stat.time);
        return res;
      });
    }
}
