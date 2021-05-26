import Request from './request';

interface ListsQuery {
  address?: string;
  limit?: number;
  skip?: number;
}

interface CreateUpdateList {
  address: string;
  name?: string;
  description?: string;
  access_level?: string;
}

export default class ListsClient {
  baseRoute: '/v3/lists';
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(query?: ListsQuery) {
    return this.request.get(this.baseRoute, query)
      .then((response) => response.body.items);
  }

  get(address: string) {
    return this.request.get(`${this.baseRoute}/${address}`)
      .then((response) => response.body.list);
  }

  create(data: CreateUpdateList) {
    return this.request.post(this.baseRoute, data)
      .then((response) => response.body.lists);
  }

  update(address: string, data: CreateUpdateList) {
    return this.request.put(`${this.baseRoute}/${address}`, data)
      .then((response) => response.body);
  }

  destroy(address: string) {
    return this.request.delete(`${this.baseRoute}/${address}`)
      .then((response) => response.body);
  }
}
