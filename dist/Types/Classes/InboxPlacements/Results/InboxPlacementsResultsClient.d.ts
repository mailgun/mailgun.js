import { IIPRSharingClient, IInboxPlacementsAttributesClient, IInboxPlacementsFiltersClient, IInboxPlacementsResultsClient, ILogger } from '../../../Interfaces/index.js';
import { InboxPlacementsDestroyResult, InboxPlacementsResultWithStatus, InboxPlacementsResultsList, InboxPlacementsResultsListAPIResponse, InboxPlacementsResultsQuery } from '../../../Types/InboxPlacements/index.js';
import NavigationThruPages from '../../common/NavigationThruPages.js';
import Request from '../../common/Request.js';
export default class InboxPlacementsResultsClient extends NavigationThruPages<InboxPlacementsResultsList> implements IInboxPlacementsResultsClient {
    request: Request;
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    sharing: IIPRSharingClient;
    private logger;
    constructor(request: Request, attributes: IInboxPlacementsAttributesClient, filters: IInboxPlacementsFiltersClient, sharing: IIPRSharingClient, logger?: ILogger);
    private convertDateToUTC;
    private prepareQueryData;
    private prepareInboxPlacementsResult;
    protected parseList(response: InboxPlacementsResultsListAPIResponse): InboxPlacementsResultsList;
    list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsList>;
    get(id: string): Promise<InboxPlacementsResultWithStatus>;
    destroy(id: string): Promise<InboxPlacementsDestroyResult>;
    getResultByShareId(shareId: string): Promise<InboxPlacementsResultWithStatus>;
}
