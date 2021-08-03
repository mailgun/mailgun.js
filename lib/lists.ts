import Request from './request';
import {
  ListsQuery,
  CreateUpdateList,
  DestroyedList,
  MailingList
} from './interfaces/lists';
import {IMailListsMembers} from './interfaces/mailListMembers';

export default class ListsClient {
  baseRoute: string;
  request: Request;
  members: IMailListsMembers;

  constructor(request: Request, members:IMailListsMembers) {
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  list(query?: ListsQuery): Promise<MailingList[]> {
    return this.request.get(`${this.baseRoute}/pages`, query)
      .then((response) => response.body.items as MailingList[]);
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
}
