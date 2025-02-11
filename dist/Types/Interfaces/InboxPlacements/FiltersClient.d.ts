import { InboxPlacementsFiltersResult } from '../../Types/InboxPlacements';
export interface IInboxPlacementsFiltersClient {
    list(): Promise<InboxPlacementsFiltersResult>;
}
