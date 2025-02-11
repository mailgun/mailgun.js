import { InboxPlacementsDestroyResult, InboxPlacementsResultWithStatus, InboxPlacementsResultsList, InboxPlacementsResultsQuery } from '../../../Types/InboxPlacements';
import { IInboxPlacementsAttributesClient } from '../AttributesClient';
import { IInboxPlacementsFiltersClient } from '../FiltersClient';
import { IIPRSharingClient } from './InboxPlacementsResultsSharing';
export interface IInboxPlacementsResultsClient {
    sharing: IIPRSharingClient;
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsList>;
    get(address: string): Promise<InboxPlacementsResultWithStatus>;
    destroy(id: string): Promise<InboxPlacementsDestroyResult>;
    getResultByShareId(shareId: string): Promise<InboxPlacementsResultWithStatus>;
}
