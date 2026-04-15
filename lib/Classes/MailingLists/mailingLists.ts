import Request from '../common/Request.js';
import APIError from '../common/Error.js';
import {
  ListsQuery,
  CreateUpdateList,
  DestroyedList,
  MailingList,
  MailingListValidationApiResponse,
  StartValidationResult,
  MailingListValidationResult,
  MailingListCancelValidationResult,
  MailingListResult,
  MailingListApiResponse,
} from '../../Types/MailingLists/index.js';
import { IMailListsMembers } from '../../Interfaces/MailingLists/MailingListMembers.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import { IMailingListsClient } from '../../Interfaces/index.js';

export default class MailingListsClient
  extends NavigationThruPages<MailingListResult>
  implements IMailingListsClient {
  baseRoute: string;
  request: Request;
  public members: IMailListsMembers;

  constructor(request: Request, members: IMailListsMembers) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  private parseValidationResult(
    status: number,
    data: MailingListValidationApiResponse
  ): MailingListValidationResult {
    return {
      status,
      validationResult: {
        ...data,
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
      }
    } as MailingListValidationResult;
  }

  protected parseList(response: MailingListApiResponse): MailingListResult {
    const data = {} as MailingListResult;

    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;

    return data;
  }

  private validateQuery(query?: ListsQuery): void {
    if (!query) {
      return;
    }

    const allowedQueryKeys: Array<keyof ListsQuery> = ['limit', 'page'];
    const invalidKeys = Object.keys(query).filter(
      (key) => !allowedQueryKeys.includes(key as keyof ListsQuery)
    );

    if (invalidKeys.length) {
      throw APIError.getUserDataError(
        'Unknown query key',
        `"lists.list": Unknown query key(s) ${invalidKeys.join(', ')}. Allowed keys are [${allowedQueryKeys.join(', ')}]`
      );
    }
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/mailing-lists/get-v3-lists-pages
  // pagination with page parameter in query
  async list(query?: ListsQuery): Promise<MailingListResult> {
    this.validateQuery(query);
    return this.requestListWithPages(`${this.baseRoute}/pages`, query);
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/mailing-lists/get-v3-lists-address
  // list's email provided as part of url
  get(mailListAddress: string): Promise<MailingList> {
    return this.request.get(`${this.baseRoute}/${mailListAddress}`)
      .then((response) => response.body.list as MailingList);
  }

  create(data: CreateUpdateList): Promise<MailingList> {
    return this.request.postWithFD(this.baseRoute, data)
      .then((response) => response.body.list as MailingList);
  }

  update(mailListAddress: string, data: CreateUpdateList): Promise<MailingList> {
    return this.request.putWithFD(`${this.baseRoute}/${mailListAddress}`, data)
      .then((response) => response.body.list as MailingList);
  }

  destroy(mailListAddress: string): Promise<DestroyedList> {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}`)
      .then((response) => response.body as DestroyedList);
  }

  validate(mailListAddress: string): Promise<StartValidationResult> {
    return this.request.post(`${this.baseRoute}/${mailListAddress}/validate`, {})
      .then((response) => ({
        status: response.status,
        ...response.body
      }) as StartValidationResult);
  }

  validationResult(mailListAddress: string): Promise<MailingListValidationResult> {
    return this.request.get(`${this.baseRoute}/${mailListAddress}/validate`)
      .then(
        (response) => this.parseValidationResult(
          response.status,
           response.body as MailingListValidationApiResponse
        )
      );
  }

  cancelValidation(mailListAddress: string): Promise<MailingListCancelValidationResult> {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}/validate`)
      .then((response) => ({
        status: response.status,
        message: response.body.message
      } as MailingListCancelValidationResult));
  }
}
