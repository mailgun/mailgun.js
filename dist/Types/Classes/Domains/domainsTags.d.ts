import Request from '../common/Request.js';
import { IDomainTagStatisticResult, IDomainTagsClient } from '../../Interfaces/Domains/index.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { Resolution } from '../../Enums/index.js';
import { DomainTagsItem, DomainTagsItemInfo, DomainTagStatisticItem, DomainTagStatAPIResponse, DomainTagsList, DomainTagsResponseData, DomainTagsQuery, DomainTagsMessageRes, DomainTagsStatisticQuery, DomainTagCountriesAggregation, DomainTagProvidersAggregation, DomainTagDevicesAggregation } from '../../Types/Domains/index.js';
import { ILogger } from '../../Interfaces/index.js';
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
    private logger;
    constructor(request: Request, logger?: ILogger);
    protected parseList(response: DomainTagsResponseData): DomainTagsList;
    private _parseTagStatistic;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    list(domain: string, query?: DomainTagsQuery): Promise<DomainTagsList>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    get(domain: string, tag: string): Promise<DomainTagsItem>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    update(domain: string, tag: string, description: string): Promise<DomainTagsMessageRes>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    destroy(domain: string, tag: string): Promise<DomainTagsMessageRes>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    statistic(domain: string, tag: string, query: DomainTagsStatisticQuery): Promise<DomainTagStatistic>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    countries(domain: string, tag: string): Promise<DomainTagCountriesAggregation>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    providers(domain: string, tag: string): Promise<DomainTagProvidersAggregation>;
    /**
    * @deprecated This method is deprecated in favor of new Tags Client.
    * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/tags-new
    * */
    devices(domain: string, tag: string): Promise<DomainTagDevicesAggregation>;
}
