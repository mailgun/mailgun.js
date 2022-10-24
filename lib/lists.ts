import Request from './request';
import {
  ListsQuery,
  CreateUpdateList,
  DestroyedList,
  MailingList,
  ValidationApiResponse,
  StartValidationResult,
  ListValidationResult,
  CancelValidationResult,
  MailingListResult,
  MailingListApiResponse
} from './types/lists';
import { IMailListsMembers } from './types/mailListMembers';
import NavigationThruPages from './common/NavigationThruPages';

export default class ListsClient
  extends NavigationThruPages<MailingListResult> {
  baseRoute: string;
  request: Request;
  members: IMailListsMembers;

  constructor(request: Request, members:IMailListsMembers) {
    super(request);
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  private parseValidationResult(status: number, data: ValidationApiResponse): ListValidationResult {
    return {
      status,
      validationResult: {
        ...data,
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
      }
    } as ListValidationResult;
  }

  protected parseList(response: MailingListApiResponse): MailingListResult {
    const data = {} as MailingListResult;

    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;

    return data;
  }

  async list(query?: ListsQuery): Promise<MailingListResult> {
    return this.requestListWithPages(`${this.baseRoute}/pages`, query);
  }

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

  validationResult(mailListAddress: string): Promise<ListValidationResult> {
    return this.request.get(`${this.baseRoute}/${mailListAddress}/validate`)
      .then(
        (response) => this.parseValidationResult(
          response.status,
           response.body as ValidationApiResponse
        )
      );
  }

  cancelValidation(mailListAddress: string): Promise<CancelValidationResult> {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}/validate`)
      .then((response) => ({
        status: response.status,
        message: response.body.message
      } as CancelValidationResult));
  }
}
