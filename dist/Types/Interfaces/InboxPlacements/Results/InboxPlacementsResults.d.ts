import { InboxPlacementsDestroyResult, InboxPlacementsResultWithStatus, InboxPlacementsResultsList, InboxPlacementsResultsQuery } from '../../../Types/InboxPlacements/index.js';
import { IInboxPlacementsAttributesClient } from '../AttributesClient.js';
import { IInboxPlacementsFiltersClient } from '../FiltersClient.js';
import { IIPRSharingClient } from './InboxPlacementsResultsSharing.js';
export interface IInboxPlacementsResultsClient {
    sharing: IIPRSharingClient;
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsList>;
    get(address: string): Promise<InboxPlacementsResultWithStatus>;
    destroy(id: string): Promise<InboxPlacementsDestroyResult>;
    getResultByShareId(shareId: string): Promise<InboxPlacementsResultWithStatus>;
}
