import { InboxPlacementsAttributesResult, InboxPlacementsValuesResult } from '../../Types/InboxPlacements/index.js';
export interface IInboxPlacementsAttributesClient {
    list(): Promise<InboxPlacementsAttributesResult>;
    get(attributeName: string): Promise<InboxPlacementsValuesResult>;
}
