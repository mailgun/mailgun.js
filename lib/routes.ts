import Request from './request';

export default class RoutesClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(query: any) {
    return this.request.get('/v3/routes', query)
      .then((response) => response.body.items);
  }

  get(id: string) {
    return this.request.get(`/v3/routes/${id}`)
      .then((response) => response.body.route);
  }

  create(data: any) {
    return this.request.post('/v3/routes', data)
      .then((response) => response.body.route);
  }

  update(id: string, data: any) {
    return this.request.put(`/v3/routes/${id}`, data)
      .then((response) => response.body);
  }

  destroy(id: string) {
    return this.request.delete(`/v3/routes/${id}`)
      .then((response) => response.body);
  }
}
