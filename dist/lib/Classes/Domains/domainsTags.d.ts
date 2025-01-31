import Request from '../common/Request';
import { IDomainTagStatisticResult, IDomainTagsClient } from '../../Interfaces/Domains';
import NavigationThruPages from '../common/NavigationThruPages';
import { Resolution } from '../../Enums';
import { DomainTagsItem, DomainTagsItemInfo, DomainTagStatisticItem, DomainTagStatAPIResponse, DomainTagsList, DomainTagsResponseData, DomainTagsQuery, DomainTagsMessageRes, DomainTagsStatisticQuery, DomainTagCountriesAggregation, DomainTagProvidersAggregation, DomainTagDevicesAggregation } from '../../Types/Domains';
export declare class DomainTag implements DomainTagsItem {
    tag: string;
    description: string;
    'first-seen': Date;
    'last-seen': Date;
    constructor(tagInfo: DomainTagsItemInfo);
}
export declare class DomainTagStatistic implements IDomainTagStatisticResult {
    tag: string;
    description: string;
    start: Date;
    end: Date;
    resolution: Resolution;
    stats: DomainTagStatisticItem[];
    constructor(tagStatisticInfo: DomainTagStatAPIResponse);
}
export default class DomainTagsClient extends NavigationThruPages<DomainTagsList> implements IDomainTagsClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    protected parseList(response: DomainTagsResponseData): DomainTagsList;
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
