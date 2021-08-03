import { CreateUpdateRouteData, DestroyRouteResponse, Route, RoutesListQuery, UpdateRouteResponse } from './interfaces/routes';
import Request from './request';
export default class RoutesClient {
    request: Request;
    constructor(request: Request);
    list(query: RoutesListQuery): Promise<Route[]>;
    get(id: string): Promise<Route>;
    create(data: CreateUpdateRouteData): Promise<Route>;
    update(id: string, data: CreateUpdateRouteData): Promise<UpdateRouteResponse>;
    destroy(id: string): Promise<DestroyRouteResponse>;
}
