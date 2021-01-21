import Request from './request';
export default class ParseClient {
    request: Request;
    constructor(request: Request);
    get(addresses: string[] | string, enableDnsEspChecks: boolean): Promise<any>;
}
