import { InboxPlacementsData, InboxPlacementsTestResult } from '../../Types/InboxPlacements';
import { IInboxPlacementsResultsClient } from './Results/InboxPlacementsResults';
import { ISeedsListsClient } from './SeedsLists/SeedsListsClient';
import { IInboxPlacementsProvidersClient } from './providers/InboxPlacementsProviders';
export interface IInboxPlacementsClient {
    seedsLists: ISeedsListsClient;
    results: IInboxPlacementsResultsClient;
    providers: IInboxPlacementsProvidersClient;
    runTest(data: InboxPlacementsData): Promise<InboxPlacementsTestResult>;
}
