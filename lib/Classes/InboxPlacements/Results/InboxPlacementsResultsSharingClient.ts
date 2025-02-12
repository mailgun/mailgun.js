import { IIPRSharingClient } from '../../../Interfaces/index.js';
import {
  IPRSharingAPIResponse,
  IPRSharingApiShape,
  IPRSharingResult,
  IPRSharingUpdateAPIResponse,
  IPRSharingUpdateData,
  IPRSharingUpdateResult
} from '../../../Types/InboxPlacements/index.js';
import Request from '../../common/Request.js';

export default class IPRSharingClient implements IIPRSharingClient {
  request: Request;

  constructor(
    request: Request,
  ) {
    this.request = request;
  }

  private prepareInboxPlacementsResultSharing(data: IPRSharingApiShape): IPRSharingResult {
    const handledSeedListDates = {
      expires_at: new Date(data.expires_at),
    };

    const result: IPRSharingResult = {
      ...data,
      ...handledSeedListDates
    };

    return result;
  }

  async get(id: string): Promise<IPRSharingResult & {status: number}> {
    const response = await this.request.get(`/v4/inbox/sharing/${id}`) as IPRSharingAPIResponse;
    const result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
    return {
      status: response.status,
      ...result
    };
  }

  async update(
    id: string,
    data: IPRSharingUpdateData
  ): Promise<IPRSharingUpdateResult & { status: number }> {
    const response = await this.request.put(`/v4/inbox/sharing/${id}`, {}, { query: `enabled=${data.enabled}` }) as IPRSharingUpdateAPIResponse;
    const result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
    return {
      ...result,
      status: response.status
    };
  }
}
