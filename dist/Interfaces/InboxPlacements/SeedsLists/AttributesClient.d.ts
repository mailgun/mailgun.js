import { InboxPlacementsAttributesResult, InboxPlacementsValuesResult } from '../../../Types/InboxPlacements';
export interface IInboxPlacementsAttributesClient {
    list(): Promise<InboxPlacementsAttributesResult>;
    get(attributeName: string): Promise<InboxPlacementsValuesResult>;
}
