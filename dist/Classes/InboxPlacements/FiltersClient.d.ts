import { InboxPlacementsFiltersResult } from '../../Types/InboxPlacements';
import Request from '../common/Request';
import { IInboxPlacementsFiltersClient } from '../../Interfaces';
export default class InboxPlacementsFiltersClient implements IInboxPlacementsFiltersClient {
    request: Request;
    path: string;
    constructor(request: Request, path: string);
    list(): Promise<InboxPlacementsFiltersResult>;
}
