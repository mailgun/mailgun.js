import { IIPRSharingClient } from '../../../Interfaces';
import { IPRSharingResult, IPRSharingUpdateData, IPRSharingUpdateResult } from '../../../Types/InboxPlacements';
import Request from '../../common/Request';
export default class IPRSharingClient implements IIPRSharingClient {
    request: Request;
    constructor(request: Request);
    private prepareInboxPlacementsResultSharing;
    get(id: string): Promise<IPRSharingResult & {
        status: number;
    }>;
    update(id: string, data: IPRSharingUpdateData): Promise<IPRSharingUpdateResult & {
        status: number;
    }>;
}
