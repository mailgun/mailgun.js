import urljoin from 'url-join';
import { APIResponse } from '../../Types/Common/ApiResponse.js';
import Request from '../common/Request.js';

import {
  IDomainTagStatisticResult,
  IDomainTagsClient
} from '../../Interfaces/Domains/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { Resolution } from '../../Enums/index.js';
import {
  DomainTagsItem,
  DomainTagsItemInfo,
  DomainTagStatisticItem,
  DomainTagStatAPIResponse,
  DomainTagAPIResponseStatsItem,
  DomainTagsList,
  DomainTagsResponseData,
  DomainTagsQuery,
  DomainTagsMessageRes,
  DomainTagsStatisticQuery,
  DomainTagCountriesAggregation,
  DomainTagCountriesAPIResponse,
  DomainTagProvidersAggregation,
  DomainTagProvidersAPIResponse,
  DomainTagDevicesAggregation,
  DomainTagDevicesAPIResponse
} from '../../Types/Domains/index.js';
import { ILogger } from '../../Interfaces/index.js';

export class DomainTag implements DomainTagsItem {
  tag: string;
  description: string;
  'first-seen': Date;
  'last-seen': Date;

  constructor(tagInfo: DomainTagsItemInfo) {
    this.tag = tagInfo.tag;
    this.description = tagInfo.description;
    this['first-seen'] = new Date(tagInfo['first-seen']);
    this['last-seen'] = new Date(tagInfo['last-seen']);
  }
}

export class DomainTagStatistic implements IDomainTagStatisticResult {
  tag: string;
  description: string;
  start: Date;
  end: Date;
  resolution: Resolution;
  stats: DomainTagStatisticItem[];

  constructor(tagStatisticInfo: DomainTagStatAPIResponse) {
    this.tag = tagStatisticInfo.body.tag;
    this.description = tagStatisticInfo.body.description;
    this.start = new Date(tagStatisticInfo.body.start);
    this.end = new Date(tagStatisticInfo.body.end);
    this.resolution = tagStatisticInfo.body.resolution;
    this.stats = tagStatisticInfo.body.stats.map(function (stat: DomainTagAPIResponseStatsItem) {
      const res = { ...stat, time: new Date(stat.time) };
      return res;
    });
  }
}

export default class DomainTagsClient
  extends NavigationThruPages<DomainTagsList>
  implements IDomainTagsClient {
  baseRoute: string;
  request: Request;
  private logger: ILogger;

  constructor(request: Request, logger: ILogger = console) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/';
    this.logger = logger;
  }

  protected parseList(
    response: DomainTagsResponseData,
  ): DomainTagsList {
    const data = {} as DomainTagsList;
    data.items = response.body.items.map((tagInfo: DomainTagsItemInfo) => new DomainTag(tagInfo));

    data.pages = this.parsePageLinks(response, '?', 'tag');
    data.status = response.status;
    return data;
  }

  private _parseTagStatistic(
    response: DomainTagStatAPIResponse
  ): IDomainTagStatisticResult {
    return new DomainTagStatistic(response);
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  async list(domain: string, query?: DomainTagsQuery): Promise<DomainTagsList> {
    this.logger.warn(`
      'domains.domainTags.list' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.requestListWithPages(urljoin(this.baseRoute, domain, '/tags'), query);
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  get(domain: string, tag: string): Promise<DomainTagsItem> {
    this.logger.warn(`
      'domains.domainTags.get' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag))
      .then(
        (res: APIResponse) => new DomainTag(res.body)
      );
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes> {
    this.logger.warn(`
      'domains.domainTags.update' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), { description })
      .then(
        (res: APIResponse) => res.body as DomainTagsMessageRes
      );
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  destroy(
    domain: string,
    tag: string
  ): Promise<DomainTagsMessageRes> {
    this.logger.warn(`
      'domains.domainTags.destroy' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.delete(`${this.baseRoute}${domain}/tags/${tag}`)
      .then((res: APIResponse) => (
        {
          message: res.body.message,
          status: res.status
        } as DomainTagsMessageRes));
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  statistic(domain: string, tag: string, query: DomainTagsStatisticQuery)
    : Promise<DomainTagStatistic> {
    this.logger.warn(`
      'domains.domainTags.statistic' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats'), query)
      .then(
        (res: APIResponse) => this._parseTagStatistic(res)
      );
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation> {
    this.logger.warn(`
      'domains.domainTags.countries' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/countries'))
      .then(
        (res: DomainTagCountriesAPIResponse) => res.body as DomainTagCountriesAggregation
      );
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation> {
    this.logger.warn(`
      'domains.domainTags.providers' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/providers'))
      .then(
        (res: DomainTagProvidersAPIResponse) => res.body as DomainTagProvidersAggregation
      );
  }

  /**
  * @deprecated This method is deprecated in favor of new Tags Client.
  * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
  * */
  devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation> {
    this.logger.warn(`
      'domains.domainTags.devices' method is deprecated, and will be removed. Please use 'tags' client instead.
    `);
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/devices'))
      .then(
        (res: DomainTagDevicesAPIResponse) => res.body as DomainTagDevicesAggregation
      );
  }
}
