import {
  IIPRSharingClient,
  IInboxPlacementsAttributesClient,
  IInboxPlacementsFiltersClient,
  IInboxPlacementsResultsClient,
  ILogger
} from '../../../Interfaces/index.js';

import {
  InboxPlacementsBox,
  InboxPlacementsDestroyAPIResponse,
  InboxPlacementsDestroyResult,
  InboxPlacementsResult,
  InboxPlacementsResultAPIResponse,
  InboxPlacementsResultAPIShape,
  InboxPlacementsResultWithStatus,
  InboxPlacementsResultsApiQuery,
  InboxPlacementsResultsDates,
  InboxPlacementsResultsList,
  InboxPlacementsResultsListAPIResponse,
  InboxPlacementsResultsQuery
} from '../../../Types/InboxPlacements/index.js';

import NavigationThruPages from '../../common/NavigationThruPages.js';
import Request from '../../common/Request.js';

export default class InboxPlacementsResultsClient
  extends NavigationThruPages<InboxPlacementsResultsList>
  implements IInboxPlacementsResultsClient {
  request: Request;
  public attributes: IInboxPlacementsAttributesClient;
  public filters: IInboxPlacementsFiltersClient;
  public sharing: IIPRSharingClient;
  private logger: ILogger;

  constructor(
    request: Request,
    attributes: IInboxPlacementsAttributesClient,
    filters: IInboxPlacementsFiltersClient,
    sharing: IIPRSharingClient,
    logger: ILogger = console
  ) {
    super(request);
    this.request = request;
    this.attributes = attributes;
    this.filters = filters;
    this.sharing = sharing;
    this.logger = logger;
  }

  private convertDateToUTC(key:string, inputDate: Date): string {
    /*
      Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
      (plus 2 hours from the timezone)
      and because for API, we need to provide the date in the expected format
      ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
      Here we try auto-convert them to UTC
    */
    this.logger.warn(`Date: "${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toISOString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
    return inputDate.toISOString();
  }

  private prepareQueryData(
    queryData: InboxPlacementsResultsQuery
  ): InboxPlacementsResultsApiQuery {
    const propsForReplacement = queryData as InboxPlacementsResultsDates;
    const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
      const prop = key as keyof InboxPlacementsResultsDates;
      if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
        const value = queryData[prop] as Date;
        acc[prop] = this.convertDateToUTC(prop, value);
      }
      return acc;
    }, {} as Record<keyof InboxPlacementsResultsDates, string>);

    const result: InboxPlacementsResultsApiQuery = {
      ...queryData,
      ...replacedProps
    };
    return result;
  }

  private prepareInboxPlacementsResult(data: InboxPlacementsResultAPIShape): InboxPlacementsResult {
    let box = {} as InboxPlacementsBox;

    const handledSeedListDates = {
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      sharing_expires_at: new Date(data.sharing_expires_at),
    };

    if (data.Box) {
      box = {
        ...data.Box,
        created_at: new Date(data.Box.created_at),
        updated_at: new Date(data.Box.updated_at),
        last_result_at: new Date(data.Box.last_result_at),
      };
      delete (box as {ID?: string}).ID;
    }

    const inboxPlacementsResult: InboxPlacementsResult = {
      ...data,
      Box: box,
      ...handledSeedListDates,
      id: data.Id,
    };

    delete (inboxPlacementsResult as {ID?: string}).ID;

    return inboxPlacementsResult;
  }

  protected parseList(response: InboxPlacementsResultsListAPIResponse): InboxPlacementsResultsList {
    const data = {} as InboxPlacementsResultsList;

    data.items = response.body.items.map(
      (item: InboxPlacementsResultAPIShape)
        : InboxPlacementsResult => this.prepareInboxPlacementsResult(item)
    );

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;

    return data;
  }

  async list(query: InboxPlacementsResultsQuery): Promise<InboxPlacementsResultsList> {
    const queryData = this.prepareQueryData(query);
    const response = await this.request.get('/v4/inbox/results', { ...queryData }) as InboxPlacementsResultsListAPIResponse;
    return this.parseList(response);
  }

  async get(id: string): Promise<InboxPlacementsResultWithStatus> {
    const response: InboxPlacementsResultAPIResponse = await this.request.get(`/v4/inbox/results/${id}`) as InboxPlacementsResultAPIResponse;
    const inboxPlacementResult: InboxPlacementsResult = this.prepareInboxPlacementsResult(
      response.body.result
    );
    return {
      status: response.status,
      inboxPlacementResult
    };
  }

  async destroy(id: string) : Promise<InboxPlacementsDestroyResult> {
    const response = await this.request.delete(`/v4/inbox/results/${id}`) as InboxPlacementsDestroyAPIResponse;
    return {
      status: response.status,
      ...response.body
    };
  }

  async getResultByShareId(shareId: string): Promise<InboxPlacementsResultWithStatus> {
    const response = await this.request.get(`/v4/inbox/sharing/public/${shareId}`) as InboxPlacementsResultAPIResponse;
    const inboxPlacementResult: InboxPlacementsResult = this.prepareInboxPlacementsResult(
      response.body.result
    );
    return {
      status: response.status,
      inboxPlacementResult
    };
  }
}
