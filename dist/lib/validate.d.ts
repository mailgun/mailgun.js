import Request from './request';
export default class ValidateClient {
    request: Request;
    constructor(request: Request);
    get(address: string): Promise<any>;
}
