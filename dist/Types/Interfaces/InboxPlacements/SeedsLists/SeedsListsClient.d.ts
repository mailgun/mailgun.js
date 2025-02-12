import { SeedListResult, SeedsListsCreatingData, SeedsListsDestroyApiResponse, SeedsListsQuery, SeedsListsResult, SeedsListsUpdatingData } from '../../../Types/InboxPlacements/index.js';
import { IInboxPlacementsAttributesClient } from '../AttributesClient.js';
import { IInboxPlacementsFiltersClient } from '../FiltersClient.js';
export interface ISeedsListsClient {
    attributes: IInboxPlacementsAttributesClient;
    filters: IInboxPlacementsFiltersClient;
    list(query: SeedsListsQuery): Promise<SeedsListsResult>;
    get(address: string): Promise<SeedListResult>;
    create(data: SeedsListsCreatingData): Promise<SeedListResult>;
    update(address: string, data: SeedsListsUpdatingData): Promise<SeedListResult>;
    destroy(address: string): Promise<SeedsListsDestroyApiResponse>;
}
