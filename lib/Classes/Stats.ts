import urljoin from 'url-join';
import Request from './common/Request';
import { StatsQuery, StatsOptions, Stat } from '../Types/Stats';

class Stats {
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

export default class StatsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private convertDateToEpochTimeString(inputDate: Date): string {
    // https://stackoverflow.com/questions/3367415/get-epoch-for-a-specific-date-using-javascript
    const timezoneDiff = new Date(1970, 0, 1).getTime();
    const timeUTC = inputDate.getTime() - timezoneDiff;
    const timeUTCinSeconds = timeUTC / 1000; // Time since Epoch in seconds
    return timeUTCinSeconds.toString();
  }

  private prepareSearchParams(query: StatsQuery | undefined): Array<Array<string>> {
    let searchParams = [] as Array<Array<string>>;
    if (typeof query === 'object' && Object.keys(query).length) {
      searchParams = Object.entries(query).reduce((arrayWithPairs, currentPair) => {
        const [key, value] = currentPair;

        if (Array.isArray(value) && value.length) { // event: ['delivered', 'accepted']
          const repeatedProperty = value.map((item) => [key, item]);
          return [...arrayWithPairs, ...repeatedProperty]; // [[event,delivered], [event,accepted]]
        }

        if (value instanceof Date) {
          arrayWithPairs.push([key, this.convertDateToEpochTimeString(value)]);
          return arrayWithPairs;
        }

        if (typeof value === 'string') {
          arrayWithPairs.push([key, value]);
        }

        return arrayWithPairs;
      }, [] as Array<Array<string>>);
    }

    return searchParams;
  }

  _parseStats(response: { body: StatsOptions }): Stats {
    return new Stats(response.body);
  }

  getDomain(domain: string, query?: StatsQuery): Promise<Stats> {
    const searchParams = this.prepareSearchParams(query);
    return this.request.get(urljoin('/v3', domain, 'stats/total'), searchParams)
      .then(this._parseStats);
  }

  getAccount(query?: StatsQuery): Promise<Stats> {
    const searchParams = this.prepareSearchParams(query);
    return this.request.get('/v3/stats/total', searchParams)
      .then(this._parseStats);
  }
}
