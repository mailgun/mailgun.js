import { IInboxPlacementsAttributesClient, IInboxPlacementsFiltersClient, IInboxPlacementsResultsClient, ILogger } from '../../../Interfaces';
import { InboxPlacementsDestroyResult, InboxPlacementsResultWithStatus, InboxPlacementsResultsList, InboxPlacementsResultsListAPIResponse, InboxPlacementsResultsQuery } from '../../../Types/InboxPlacements';
import NavigationThruPages from '../../common/NavigationThruPages';
import Request from '../../common/Request';
export default class InboxPlacementsResultsClient extends NavigationThruPages<InboxPlacementsResultsList> implements IInboxPlacementsResultsClient {
    request: Request;
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    private logger;
    constructor(request: Request, attributes: IInboxPlacementsAttributesClient, filters: IInboxPlacementsFiltersClient, logger?: ILogger);
    private convertDateToUTC;
    private prepareQueryData;
    private prepareInboxPlacementsResult;
    protected parseList(response: InboxPlacementsResultsListAPIResponse): InboxPlacementsResultsList;
    list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsList>;
    get(id: string): Promise<InboxPlacementsResultWithStatus>;
    destroy(id: string): Promise<InboxPlacementsDestroyResult>;
}
