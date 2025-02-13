import { IIPRSharingClient } from '../../../Interfaces/index.js';
import { IPRSharingResult, IPRSharingUpdateData, IPRSharingUpdateResult } from '../../../Types/InboxPlacements/index.js';
import Request from '../../common/Request.js';
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
