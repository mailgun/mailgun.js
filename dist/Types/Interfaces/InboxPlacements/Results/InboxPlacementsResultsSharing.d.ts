import { IPRSharingResult, IPRSharingUpdateData, IPRSharingUpdateResult } from '../../../Types/InboxPlacements/index.js';
export interface IIPRSharingClient {
    get(id: string): Promise<IPRSharingResult>;
    update(id: string, data: IPRSharingUpdateData): Promise<IPRSharingUpdateResult>;
}
