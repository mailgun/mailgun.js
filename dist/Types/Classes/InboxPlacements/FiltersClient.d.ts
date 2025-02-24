import { InboxPlacementsFiltersResult } from '../../Types/InboxPlacements/index.js';
import Request from '../common/Request.js';
import { IInboxPlacementsFiltersClient } from '../../Interfaces/index.js';
export default class InboxPlacementsFiltersClient implements IInboxPlacementsFiltersClient {
    request: Request;
    path: string;
    constructor(request: Request, path: string);
    list(): Promise<InboxPlacementsFiltersResult>;
}
