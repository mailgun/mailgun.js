import urljoin from 'url-join';
import Request from '../common/Request';
import { StatsQuery, StatsOptions } from '../../Types/Stats';
import { ILogger } from '../../Interfaces/Common';
import StatsContainer from './StatsContainer';
import { IStatsClient, IStatsContainer } from '../../Interfaces/Stats';

export default class StatsClient implements IStatsClient {
  request: Request;
  private logger: ILogger;

  constructor(request: Request, logger: ILogger = console) {
    this.request = request;
    this.logger = logger;
  }

  private convertDateToUTC(key:string, inputDate: Date): Array<string> {
    /*
      Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
      (plus 2 hours from the timezone)
      and because for API, we need to provide the date in the expected format
      ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
      Here we try auto-convert them to UTC
    */
    this.logger.warn(`Date:"${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toUTCString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
    return [key, inputDate.toUTCString()];
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
          arrayWithPairs.push(this.convertDateToUTC(key, value));
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

  private parseStats(response: { body: StatsOptions }): IStatsContainer {
    return new StatsContainer(response.body);
  }

  getDomain(domain: string, query?: StatsQuery): Promise<IStatsContainer> {
    const searchParams = this.prepareSearchParams(query);
    return this.request.get(urljoin('/v3', domain, 'stats/total'), searchParams)
      .then(this.parseStats);
  }

  getAccount(query?: StatsQuery): Promise<IStatsContainer> {
    const searchParams = this.prepareSearchParams(query);
    return this.request.get('/v3/stats/total', searchParams)
      .then(this.parseStats);
  }
}
