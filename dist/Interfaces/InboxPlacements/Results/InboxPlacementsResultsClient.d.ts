import { InboxPlacementsResultsListResult, InboxPlacementsResultsQuery } from '../../../Types/InboxPlacements';
import { ISeedsListsAttributesClient } from '../SeedsLists/AttributesClient';
import { ISeedsListsFiltersClient } from '../SeedsLists/FiltersClient';
export interface IInboxPlacementsResultsClient {
    attributes: ISeedsListsAttributesClient;
    filters: ISeedsListsFiltersClient;
    list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsListResult>;
}
