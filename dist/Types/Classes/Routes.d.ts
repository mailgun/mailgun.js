import { IRoutesClient } from '../Interfaces/index.js';
import { CreateUpdateRouteData, DestroyRouteResponse, Route, RoutesListQuery, UpdateRouteResponse } from '../Types/Routes/index.js';
import Request from './common/Request.js';
export default class RoutesClient implements IRoutesClient {
    request: Request;
    constructor(request: Request);
    list(query: RoutesListQuery): Promise<Route[]>;
    get(id: string): Promise<Route>;
    create(data: CreateUpdateRouteData): Promise<Route>;
    update(id: string, data: CreateUpdateRouteData): Promise<UpdateRouteResponse>;
    destroy(id: string): Promise<DestroyRouteResponse>;
}
