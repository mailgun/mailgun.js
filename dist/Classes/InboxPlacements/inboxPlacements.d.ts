import { IInboxPlacementsClient, IInboxPlacementsResultsClient } from '../../Interfaces';
import { ISeedsListsClient } from '../../Interfaces/InboxPlacements/SeedsLists/SeedsListsClient';
import { IInboxPlacementsProvidersClient } from '../../Interfaces/InboxPlacements/providers/InboxPlacementsProviders';
import { InboxPlacementsData, InboxPlacementsTestResult } from '../../Types/InboxPlacements';
import Request from '../common/Request';
export default class InboxPlacementsClient implements IInboxPlacementsClient {
    request: Request;
    seedsLists: ISeedsListsClient;
    results: IInboxPlacementsResultsClient;
    providers: IInboxPlacementsProvidersClient;
    constructor(request: Request, seedsListsClient: ISeedsListsClient, results: IInboxPlacementsResultsClient, providers: IInboxPlacementsProvidersClient);
    runTest(data: InboxPlacementsData): Promise<InboxPlacementsTestResult>;
}
