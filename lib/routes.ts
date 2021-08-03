import {
  CreateUpdateRouteData, DestroyRouteResponse, Route, RoutesListQuery, UpdateRouteResponse
} from './interfaces/routes';
import Request from './request';

export default class RoutesClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  list(query: RoutesListQuery): Promise<Route[]> {
    return this.request.get('/v3/routes', query)
      .then((response) => response.body.items);
  }

  get(id: string): Promise<Route> {
    return this.request.get(`/v3/routes/${id}`)
      .then((response) => response.body.route);
  }

  create(data: CreateUpdateRouteData): Promise<Route> {
    return this.request.postWithFD('/v3/routes', data)
      .then((response) => response.body.route);
  }

  update(id: string, data: CreateUpdateRouteData): Promise<UpdateRouteResponse> {
    return this.request.putWithFD(`/v3/routes/${id}`, data)
      .then((response) => response.body);
  }

  destroy(id: string): Promise<DestroyRouteResponse> {
    return this.request.delete(`/v3/routes/${id}`)
      .then((response) => response.body);
  }
}
