import { IInboxPlacementsAttributesClient } from '../../../Interfaces';
import { InboxPlacementsAttributesResult, InboxPlacementsValuesResult } from '../../../Types/InboxPlacements';
import Request from '../../common/Request';
export default class InboxPlacementsAttributesClient implements IInboxPlacementsAttributesClient {
    request: Request;
    path: string;
    constructor(request: Request, path: string);
    list(): Promise<InboxPlacementsAttributesResult>;
    get(attributeName: string): Promise<InboxPlacementsValuesResult>;
}
