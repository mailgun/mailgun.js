import { ILogger, IInboxPlacementsAttributesClient, ISeedsListsClient, IInboxPlacementsFiltersClient } from '../../../Interfaces/index.js';
import { SeedsListsAPIResponse, SeedsListsCreatingData, SeedsListsQuery, SeedsListsResult, SeedsListsDestroyApiResponse, SeedsListsUpdatingData, SeedListResult } from '../../../Types/InboxPlacements/index.js';
import NavigationThruPages from '../../common/NavigationThruPages.js';
import Request from '../../common/Request.js';
export default class SeedsListsClient extends NavigationThruPages<SeedsListsResult> implements ISeedsListsClient {
    request: Request;
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    private logger;
    constructor(request: Request, attributes: IInboxPlacementsAttributesClient, filters: IInboxPlacementsFiltersClient, logger?: ILogger);
    private convertDateToUTC;
    private prepareQueryData;
    private prepareResult;
    private prepareSeedList;
    protected parseList(response: SeedsListsAPIResponse): SeedsListsResult;
    list(query: SeedsListsQuery): Promise<SeedsListsResult>;
    get(id: string): Promise<SeedListResult>;
    create(data: SeedsListsCreatingData): Promise<SeedListResult>;
    update(id: string, data: SeedsListsUpdatingData): Promise<SeedListResult>;
    destroy(id: string): Promise<SeedsListsDestroyApiResponse>;
}
