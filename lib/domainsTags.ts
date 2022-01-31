import urljoin from 'url-join';
import APIResponse from './interfaces/ApiResponse';
import Request from './request';

import {
  DomainTagAPIResponseStatsItem,
  DomainTagCountriesAggregation,
  DomainTagCountriesAPIResponse,
  DomainTagDevicesAggregation,
  DomainTagDevicesAPIResponse,
  DomainTagProvidersAggregation,
  DomainTagProvidersAPIResponse,
  DomainTagsItem,
  DomainTagsItemInfo,
  DomainTagsList,
  DomainTagsMessageRes,
  DomainTagsQuery,
  DomainTagsResponseData,
  DomainTagsStatisticQuery,
  DomainTagStatAPIResponse,
  DomainTagStatisticItem,
  DomainTagStatisticResult,
  IDomainTagsClient,
  PagesList,
  PagesListAccumulator,
  ParsedPagesList,
  Resolution
} from './interfaces/DomainTags';

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

export class DomainTagStatistic implements DomainTagStatisticResult {
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

export default class DomainTagsClient implements IDomainTagsClient {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v3/';
  }

  private _parsePageLinks(response: DomainTagsResponseData): ParsedPagesList {
    const pages = Object.entries(response.body.paging as PagesList);
    return pages.reduce(
      (acc: PagesListAccumulator, entrie: [url: string, id: string]) => {
        const id = entrie[0];
        const url = entrie[1];
        acc[id] = {
          id,
          url
        };
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  private _parseDomainTagsList(
    response: DomainTagsResponseData
  ): DomainTagsList {
    return {
      items: response.body.items.map((tagInfo) => new DomainTag(tagInfo)),
      pages: this._parsePageLinks(response)
    };
  }

  private _parseTagStatistic(
    response: DomainTagStatAPIResponse
  ): DomainTagStatistic {
    return new DomainTagStatistic(response);
  }

  list(domain: string, query?: DomainTagsQuery): Promise<DomainTagsList> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags'), query)
      .then(
        (res: APIResponse) => this._parseDomainTagsList(res as DomainTagsResponseData)
      );
  }

  get(domain: string, tag: string): Promise<DomainTagsItem> {
    return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag))
      .then(
        (res: APIResponse) => new DomainTag(res.body)
      );
  }

  update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes> {
    return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), description)
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
