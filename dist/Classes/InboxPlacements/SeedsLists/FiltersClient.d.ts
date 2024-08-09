import { SeedsListsFiltersResult } from '../../../Types/InboxPlacements';
import Request from '../../common/Request';
import { ISeedsListsFiltersClient } from '../../../Interfaces';
export default class SeedsListsFiltersClient implements ISeedsListsFiltersClient {
    request: Request;
    constructor(request: Request);
    list(): Promise<SeedsListsFiltersResult>;
}
