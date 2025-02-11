import { IRoutesClient } from '../Interfaces';
import { CreateUpdateRouteData, DestroyRouteResponse, Route, RoutesListQuery, UpdateRouteResponse } from '../Types/Routes';
import Request from './common/Request';
export default class RoutesClient implements IRoutesClient {
    request: Request;
    constructor(request: Request);
    list(query: RoutesListQuery): Promise<Route[]>;
    get(id: string): Promise<Route>;
    create(data: CreateUpdateRouteData): Promise<Route>;
    update(id: string, data: CreateUpdateRouteData): Promise<UpdateRouteResponse>;
    destroy(id: string): Promise<DestroyRouteResponse>;
}
