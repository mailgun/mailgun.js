import { IInboxPlacementsProvidersClient } from '../../../Interfaces/index.js';
import { InboxPlacementsProvidersList } from '../../../Types/InboxPlacements/index.js';
import Request from '../../common/Request.js';
export default class InboxPlacementsProvidersClient implements IInboxPlacementsProvidersClient {
    request: Request;
    path: string;
    constructor(request: Request);
    private parseList;
    list(): Promise<InboxPlacementsProvidersList>;
}
