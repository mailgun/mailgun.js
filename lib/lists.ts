import Request from './request';
import {
  ListsQuery,
  CreateUpdateList,
  DestroyedList,
  MailingList
} from './interfaces/lists';

export default class ListsClient {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v3/lists';
  }

  list(query?: ListsQuery) {
    return this.request.get(`${this.baseRoute}/pages`, query)
      .then((response) =>  response.body.items as [MailingList]);
  }

  get(mailListAddress: string) {
    return this.request.get(`${this.baseRoute}/${mailListAddress}`)
      .then((response) => response.body.list as MailingList);
  }

  create(data: CreateUpdateList) {
    return this.request.postMulti(this.baseRoute, data)
      .then((response) => {
        return response.body.list as MailingList
      });
  }

  update(mailListAddress: string, data: CreateUpdateList) {
    return this.request.putMulti(`${this.baseRoute}/${mailListAddress}`, data)
      .then((response) => response.body as MailingList);
  }

  destroy(mailListAddress: string) {
    return this.request.delete(`${this.baseRoute}/${mailListAddress}`)
      .then((response) => response.body as DestroyedList);
  }
}
