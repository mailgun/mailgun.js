import { InboxPlacementsData, InboxPlacementsTestResult } from '../../Types/InboxPlacements/index.js';
import { IInboxPlacementsResultsClient } from './Results/InboxPlacementsResults.js';
import { ISeedsListsClient } from './SeedsLists/SeedsListsClient.js';
import { IInboxPlacementsProvidersClient } from './providers/InboxPlacementsProviders.js';
export interface IInboxPlacementsClient {
    seedsLists: ISeedsListsClient;
    results: IInboxPlacementsResultsClient;
    providers: IInboxPlacementsProvidersClient;
    runTest(data: InboxPlacementsData): Promise<InboxPlacementsTestResult>;
}
