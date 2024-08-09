import { InboxPlacementsFiltersApiResponse, InboxPlacementsFiltersResult } from '../../Types/InboxPlacements';
import Request from '../common/Request';
import { IInboxPlacementsFiltersClient } from '../../Interfaces';

export default class InboxPlacementsFiltersClient implements IInboxPlacementsFiltersClient {
  request: Request;
  path: string;

  constructor(
    request: Request,
    path: string
  ) {
    this.request = request;
    this.path = path;
  }

  async list(): Promise<InboxPlacementsFiltersResult> {
    const result = await this.request.get(this.path) as InboxPlacementsFiltersApiResponse;
    return {
      status: result.status,
      supported_filters: result.body.supported_filters
    };
  }
}
