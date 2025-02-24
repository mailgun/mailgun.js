import { IInboxPlacementsProvidersClient } from '../../../Interfaces/index.js';
import {
  InboxPlacementsProvider,
  InboxPlacementsProviderAPIShape,
  InboxPlacementsProvidersList,
  InboxPlacementsProvidersListAPIResponse
} from '../../../Types/InboxPlacements/index.js';
import Request from '../../common/Request.js';

export default class InboxPlacementsProvidersClient implements IInboxPlacementsProvidersClient {
  request: Request;
  path: string;

  constructor(
    request: Request,
  ) {
    this.path = '/v4/inbox/providers';
    this.request = request;
  }

  private parseList(
    response: InboxPlacementsProvidersListAPIResponse
  ): InboxPlacementsProvidersList {
    const data = {} as InboxPlacementsProvidersList;

    data.items = response.body.items.map(
      (item: InboxPlacementsProviderAPIShape): InboxPlacementsProvider => {
        const handledProviderDates = {
          created_at: new Date(item.created_at),
          updated_at: new Date(item.updated_at),
        };
        const result: InboxPlacementsProvider = {
          ...item,
          ...handledProviderDates
        };
        return result;
      }
    );

    data.status = response.status;

    return data;
  }

  async list(): Promise<InboxPlacementsProvidersList> {
    const response = await this.request.get(this.path) as InboxPlacementsProvidersListAPIResponse;
    return this.parseList(response);
  }
}
