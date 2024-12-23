import { IInboxPlacementsProvidersClient } from '../../../Interfaces/InboxPlacements/providers/InboxPlacementsProviders';
import { InboxPlacementsProvidersList } from '../../../Types/InboxPlacements';
import Request from '../../common/Request';
export default class InboxPlacementsProvidersClient implements IInboxPlacementsProvidersClient {
    request: Request;
    path: string;
    constructor(request: Request);
    private parseList;
    list(): Promise<InboxPlacementsProvidersList>;
}
