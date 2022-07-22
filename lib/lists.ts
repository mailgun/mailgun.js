import Request from './request';
import {
  ListsQuery,
  CreateUpdateList,
  DestroyedList,
  MailingList,
  ValidationApiResponse,
  StartValidationResult,
  ValidationResult,
  CancelValidationResult,
  MailingListResult,
  MailingListApiResponse
} from './interfaces/lists';
import { IMailListsMembers } from './interfaces/mailListMembers';
import NavigationThruPages from './common/NavigationThruPages';

export default class ListsClient
  extends NavigationThruPages<MailingListResult> {
  baseRoute: string;
  request: Request;
  members: IMailListsMembers;

  constructor(request: Request, members:IMailListsMembers) {
    super();
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  private parseValidationResult(status: number, data: ValidationApiResponse): ValidationResult {
    return {
      status,
      validationResult: {
        ...data,
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
      }
    } as ValidationResult;
  }

  protected parseList(response: MailingListApiResponse): MailingListResult {
    const data = {} as MailingListResult;

    data.items = response.body.items;

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;

    return data;
  }

  async list(query?: ListsQuery): Promise<MailingListResult> {
    const { updatedQuery, url } = this.updateUrlAndQuery(`${this.baseRoute}/pages`, query);
    const response: MailingListApiResponse = await this.request.get(url, updatedQuery);
    return this.parseList(response);
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

  validationResult(mailListAddress: string): Promise<ValidationResult> {
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
