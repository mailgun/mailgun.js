import { InboxPlacementsProvidersList } from '../../../Types/InboxPlacements/index.js';
export interface IInboxPlacementsProvidersClient {
    list(): Promise<InboxPlacementsProvidersList>;
}
