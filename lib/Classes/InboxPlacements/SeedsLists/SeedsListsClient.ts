import {
  ILogger,
  IInboxPlacementsAttributesClient,
  ISeedsListsClient,
  IInboxPlacementsFiltersClient
} from '../../../Interfaces';
import {
  SeedList,
  SeedListAPIShape,
  SeedsListsAPIQuery,
  SeedsListsAPIQueryDates,
  SeedsListsAPIResponse,
  SeedsListsCreatingData,
  SeedsListsQuery,
  SeedsListsResult,
  Seed,
  SeedAPIShape,
  SeedsListsDestroyApiResponse,
  SeedsListsUpdatingData,
  SeedListResult,
  SeedListGetAPIResponse,
  SeedListAPIResponse
} from '../../../Types/InboxPlacements';
import NavigationThruPages from '../../common/NavigationThruPages';
import Request from '../../common/Request';

export default class SeedsListsClient
  extends NavigationThruPages<SeedsListsResult>
  implements ISeedsListsClient {
  request: Request;
  public attributes: IInboxPlacementsAttributesClient;
  public filters: IInboxPlacementsFiltersClient;
  private logger: ILogger;

  constructor(
    request: Request,
    attributes: IInboxPlacementsAttributesClient,
    filters: IInboxPlacementsFiltersClient,
    logger: ILogger = console
  ) {
    super(request);
    this.request = request;
    this.attributes = attributes;
    this.filters = filters;
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

  private prepareQueryData(queryData: SeedsListsQuery) : SeedsListsAPIQuery {
    const propsForReplacement = queryData as SeedsListsAPIQueryDates;
    const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
      const prop = key as keyof SeedsListsAPIQueryDates;
      if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
        const value = queryData[prop] as Date;
        acc[prop] = this.convertDateToUTC(prop, value);
      }
      return acc;
    }, {} as Record<keyof SeedsListsAPIQueryDates, string>);

    const result: SeedsListsAPIQuery = {
      ...queryData,
      ...replacedProps
    };
    return result;
  }

  private prepareResult(data: SeedListAPIResponse): SeedListResult {
    let result = {} as SeedListResult;
    const seedList = this.prepareSeedList(data.body);
    result = {
      ...seedList,
      status: data.status
    };
    return result;
  }

  private prepareSeedList(data: SeedListAPIShape): SeedList {
    let seeds: Seed[] | null;

    const handledSeedListDates = {
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      last_result_at: new Date(data.last_result_at),
    };

    if (data.Seeds) {
      seeds = data.Seeds.map((seedItem: SeedAPIShape): Seed => {
        let seed = {} as Seed;
        const handledSeedDates = {
          created_at: new Date(seedItem.created_at),
          updated_at: new Date(seedItem.updated_at),
          max_email_count_hit_at: new Date(seedItem.max_email_count_hit_at),
          last_sent_to_at: new Date(seedItem.last_sent_to_at),
          last_delivered_at: new Date(seedItem.last_delivered_at),
        };
        seed = {
          ...seedItem,
          ...handledSeedDates
        };
        return seed;
      });
    } else {
      seeds = null;
    }

    const seedList: SeedList = {
      ...data,
      Seeds: seeds,
      ...handledSeedListDates
    };

    delete (seedList as {Id?: string}).Id;

    return seedList;
  }

  protected parseList(response: SeedsListsAPIResponse): SeedsListsResult {
    const data = {
      items: []
    } as SeedsListsResult;

    data.items = response.body.items?.map(
      (item: SeedListAPIShape): SeedList => this.prepareSeedList(item)
    );

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;

    return data;
  }

  async list(query: SeedsListsQuery): Promise<SeedsListsResult> {
    const queryData = this.prepareQueryData(query);
    const response: SeedsListsAPIResponse = await this.request.get('/v4/inbox/seedlists', queryData) as SeedsListsAPIResponse;
    return {
      ...this.parseList(response),
      status: 200
    };
  }

  async get(id: string): Promise<SeedListResult> {
    const response: SeedListGetAPIResponse = await this.request.get(`/v4/inbox/seedlists/${id}`) as SeedListGetAPIResponse;
    const updatedSeedsList = this.prepareSeedList(response.body.seedlist);
    return {
      ...updatedSeedsList,
      status: response.status
    };
  }

  async create(data: SeedsListsCreatingData): Promise<SeedListResult> {
    const response = await this.request.postWithFD('/v4/inbox/seedlists', data) as SeedListAPIResponse;
    return this.prepareResult(response);
  }

  async update(id: string, data: SeedsListsUpdatingData): Promise<SeedListResult> {
    const response = await this.request.put(`/v4/inbox/seedlists/${id}`, data) as SeedListAPIResponse;
    return this.prepareResult(response);
  }

  async destroy(id: string): Promise<SeedsListsDestroyApiResponse> {
    return this.request.delete(`/v4/inbox/seedlists/${id}`) as unknown as SeedsListsDestroyApiResponse;
  }
}
