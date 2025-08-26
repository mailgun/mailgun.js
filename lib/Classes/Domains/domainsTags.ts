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

  constructor(request: Request) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/';
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

  async list(domain: string, query?: DomainTagsQuery): Promise<DomainTagsList> {
    return this.requestListWithPages(urljoin(this.baseRoute, domain, '/tags'), query);
  }

  get(domain: string, tag: string): Promise<DomainTagsItem> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag))
      .then(
        (res: APIResponse) => new DomainTag(res.body)
      );
  }

  update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes> {
    return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), { description })
      .then(
        (res: APIResponse) => res.body as DomainTagsMessageRes
      );
  }

  destroy(
    domain: string,
    tag: string
  ): Promise<DomainTagsMessageRes> {
    return this.request.delete(`${this.baseRoute}${domain}/tags/${tag}`)
      .then((res: APIResponse) => (
        {
          message: res.body.message,
          status: res.status
        } as DomainTagsMessageRes));
  }

  statistic(domain: string, tag: string, query: DomainTagsStatisticQuery)
    : Promise<DomainTagStatistic> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats'), query)
      .then(
        (res: APIResponse) => this._parseTagStatistic(res)
      );
  }

  countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/countries'))
      .then(
        (res: DomainTagCountriesAPIResponse) => res.body as DomainTagCountriesAggregation
      );
  }

  providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/providers'))
      .then(
        (res: DomainTagProvidersAPIResponse) => res.body as DomainTagProvidersAggregation
      );
  }

  devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/devices'))
      .then(
        (res: DomainTagDevicesAPIResponse) => res.body as DomainTagDevicesAggregation
      );
  }
}
