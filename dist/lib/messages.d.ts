import Request from "./request";
export default class MessagesClient {
    request: Request;
    constructor(request: Request);
    _parseResponse(response: {
        body: any;
    }): any;
    create(domain: string, data: any): Promise<any>;
}
