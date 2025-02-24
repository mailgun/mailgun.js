import { IInboxPlacementsAttributesClient } from '../../Interfaces/index.js';
import { InboxPlacementsAttributesResult, InboxPlacementsValuesResult } from '../../Types/InboxPlacements/index.js';
import Request from '../common/Request.js';
export default class InboxPlacementsAttributesClient implements IInboxPlacementsAttributesClient {
    request: Request;
    path: string;
    constructor(request: Request, path: string);
    list(): Promise<InboxPlacementsAttributesResult>;
    get(attributeName: string): Promise<InboxPlacementsValuesResult>;
}
