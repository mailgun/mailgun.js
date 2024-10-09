import { IInboxPlacementsAttributesClient } from '../../Interfaces';
import {
  InboxPlacementsAttributesApiResponse,
  InboxPlacementsAttributesResult,
  InboxPlacementsValuesApiResponse,
  InboxPlacementsValuesResult
} from '../../Types/InboxPlacements';
import Request from '../common/Request';

export default class InboxPlacementsAttributesClient implements IInboxPlacementsAttributesClient {
  request: Request;
  path: string;

  constructor(
    request: Request,
    path: string
  ) {
    this.path = path;
    this.request = request;
  }

  async list(): Promise<InboxPlacementsAttributesResult> {
    const response = await this.request.get(this.path) as InboxPlacementsAttributesApiResponse;
    return {
      items: response.body.items,
      status: response.status,
    } as InboxPlacementsAttributesResult;
  }

  async get(attributeName: string): Promise<InboxPlacementsValuesResult> {
    const response = await this.request.get(`${this.path}/${attributeName}`) as InboxPlacementsValuesApiResponse;
    return {
      ...response.body,
      status: response.status
    };
  }
}
