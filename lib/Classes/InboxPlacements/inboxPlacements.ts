import { IInboxPlacementsClient, IInboxPlacementsResultsClient } from '../../Interfaces';
import { ISeedsListsClient } from '../../Interfaces/InboxPlacements/SeedsLists/SeedsListsClient';
import { IInboxPlacementsProvidersClient } from '../../Interfaces/InboxPlacements/providers/InboxPlacementsProviders';
import { InboxPlacementsData, InboxPlacementsTestResult, InboxPlacementsTestResultAPIResponse } from '../../Types/InboxPlacements';
import Request from '../common/Request';

export default class InboxPlacementsClient implements IInboxPlacementsClient {
  request: Request;
  public seedsLists: ISeedsListsClient;
  public results: IInboxPlacementsResultsClient;
  public providers: IInboxPlacementsProvidersClient;

  constructor(
    request: Request,
    seedsListsClient: ISeedsListsClient,
    results: IInboxPlacementsResultsClient,
    providers: IInboxPlacementsProvidersClient
  ) {
    this.request = request;
    this.seedsLists = seedsListsClient;
    this.seedsLists = seedsListsClient;
    this.results = results;
    this.providers = providers;
  }

  async runTest(data: InboxPlacementsData): Promise<InboxPlacementsTestResult> {
    const response = await this.request.post('/v4/inbox/tests', data) as InboxPlacementsTestResultAPIResponse;
    return {
      ...response.body,
      status: response.status
    };
  }
}
