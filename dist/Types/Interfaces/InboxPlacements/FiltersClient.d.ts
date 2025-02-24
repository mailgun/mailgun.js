import { InboxPlacementsFiltersResult } from '../../Types/InboxPlacements/index.js';
export interface IInboxPlacementsFiltersClient {
    list(): Promise<InboxPlacementsFiltersResult>;
}
