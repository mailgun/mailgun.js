import Request from './request';
import { DomainTagCountriesAggregation, DomainTagDevicesAggregation, DomainTagProvidersAggregation, DomainTagsItem, DomainTagsItemInfo, DomainTagsList, DomainTagsMessageRes, DomainTagsQuery, DomainTagsStatisticQuery, DomainTagStatAPIResponse, DomainTagStatisticItem, DomainTagStatisticResult, IDomainTagsClient, Resolution } from './interfaces/DomainTags';
export declare class DomainTag implements DomainTagsItem {
    tag: string;
    description: string;
    'first-seen': Date;
    'last-seen': Date;
    constructor(tagInfo: DomainTagsItemInfo);
}
export declare class DomainTagStatistic implements DomainTagStatisticResult {
    tag: string;
    description: string;
    start: Date;
    end: Date;
    resolution: Resolution;
    stats: DomainTagStatisticItem[];
    constructor(tagStatisticInfo: DomainTagStatAPIResponse);
}
export default class DomainTagsClient implements IDomainTagsClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    private _parsePageLinks;
    private _parseDomainTagsList;
    private _parseTagStatistic;
    list(domain: string, query?: DomainTagsQuery): Promise<DomainTagsList>;
    get(domain: string, tag: string): Promise<DomainTagsItem>;
    update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes>;
    destroy(domain: string, tag: string): Promise<DomainTagsMessageRes>;
    statistic(domain: string, tag: string, query: DomainTagsStatisticQuery): Promise<DomainTagStatistic>;
    countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation>;
    providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation>;
    devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation>;
}
