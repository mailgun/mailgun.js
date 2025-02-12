import { CreateUpdateRouteData, DestroyRouteResponse, Route, RoutesListQuery, UpdateRouteResponse } from '../../Types/Routes/index.js';
export interface IRoutesClient {
    list(query: RoutesListQuery): Promise<Route[]>;
    get(id: string): Promise<Route>;
    create(data: CreateUpdateRouteData): Promise<Route>;
    update(id: string, data: CreateUpdateRouteData): Promise<UpdateRouteResponse>;
    destroy(id: string): Promise<DestroyRouteResponse>;
}
