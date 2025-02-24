import { IInboxPlacementsClient, IInboxPlacementsProvidersClient, IInboxPlacementsResultsClient, ISeedsListsClient } from '../../Interfaces/index.js';
import { InboxPlacementsData, InboxPlacementsTestResult } from '../../Types/InboxPlacements/index.js';
import Request from '../common/Request.js';
export default class InboxPlacementsClient implements IInboxPlacementsClient {
    request: Request;
    seedsLists: ISeedsListsClient;
    results: IInboxPlacementsResultsClient;
    providers: IInboxPlacementsProvidersClient;
    constructor(request: Request, seedsListsClient: ISeedsListsClient, results: IInboxPlacementsResultsClient, providers: IInboxPlacementsProvidersClient);
    runTest(data: InboxPlacementsData): Promise<InboxPlacementsTestResult>;
}
