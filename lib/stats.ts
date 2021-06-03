import urljoin from 'url-join';
import Request from './request';
import StatsOptions from './interfaces/StatsOptions';

class Stats {
  start: Date;
  end: Date;
  resolution: string;
  stats: any;

  constructor(data: StatsOptions) {
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.resolution = data.resolution;
    this.stats = data.stats.map(function (stat: { time: string | Date }) {
      stat.time = new Date(stat.time);
      return stat;
    });
  }
}

export default class StatsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  _parseStats(response: { body: StatsOptions }) {
    return new Stats(response.body);
  }

  getDomain(domain: string, query: any) {
    return this.request.get(urljoin('/v3', domain, 'stats/total'), query)
      .then(this._parseStats);
  }

  getAccount(query: any) {
    return this.request.get('/v3/stats/total', query)
      .then(this._parseStats);
  }
}
