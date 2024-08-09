import { InboxPlacementsProvidersList } from '../../../Types/InboxPlacements';
export interface IInboxPlacementsProvidersClient {
    list(): Promise<InboxPlacementsProvidersList>;
}
