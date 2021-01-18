declare const MgRequest: any;
export default class EventClient {
    request: typeof MgRequest;
    constructor(request: typeof MgRequest);
    _parsePageNumber(url: string): string;
    _parsePage(id: string, url: string): {
        id: string;
        number: string;
        url: string;
    };
    _parsePageLinks(response: {
        body: {
            paging: any;
        };
    }): any;
    _parseEventList(response: {
        body: {
            items: any;
            paging: any;
        };
    }): {
        items: any;
        pages: any;
    };
    get(domain: string, query: {
        page: any;
    }): any;
}
export {};
