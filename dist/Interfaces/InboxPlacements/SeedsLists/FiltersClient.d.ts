import { SeedsListsFiltersResult } from '../../../Types/InboxPlacements';
export interface ISeedsListsFiltersClient {
    list(): Promise<SeedsListsFiltersResult>;
}
