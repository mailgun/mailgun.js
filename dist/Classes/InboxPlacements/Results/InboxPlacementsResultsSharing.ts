import {
  IPRSharingResult,
  IPRSharingUpdateData,
  IPRSharingUpdateResult
} from '../../../Types/InboxPlacements';

export interface IIPRSharingClient {
  get(id: string): Promise<IPRSharingResult>;
  update(id: string, data: IPRSharingUpdateData): Promise<IPRSharingUpdateResult>;
}
