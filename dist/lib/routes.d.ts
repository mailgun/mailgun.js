import Request from './request';
export default class RoutesClient {
    request: Request;
    constructor(request: Request);
    list(query: any): Promise<any>;
    get(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    destroy(id: string): Promise<any>;
}
