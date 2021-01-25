declare const MgRequest: any;
export default class IpsClient {
    request: typeof MgRequest;
    constructor(request: typeof MgRequest);
    list(query: any): any;
    get(ip: string): any;
    private parseIpsResponse;
}
export {};
