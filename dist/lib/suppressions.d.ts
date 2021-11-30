import Request from './request';
import { BounceData, ComplaintData, UnsubscribeData, WhiteListData } from './interfaces/Supressions';
declare class Bounce {
    type: string;
    address: string;
    code: number;
    error: string;
    created_at: Date;
    constructor(data: BounceData);
}
declare class Complaint {
    type: string;
    address: any;
    created_at: Date;
    constructor(data: ComplaintData);
}
declare class Unsubscribe {
    type: string;
    address: string;
    tags: any;
    created_at: Date;
    constructor(data: UnsubscribeData);
}
declare class WhiteList {
    type: string;
    value: string;
    reason: string;
    createdAt: Date;
    constructor(data: WhiteListData);
}
declare type TModel = typeof Bounce | typeof Complaint | typeof Unsubscribe | typeof WhiteList;
export default class SuppressionClient {
    request: any;
    models: {
        bounces: typeof Bounce;
        complaints: typeof Complaint;
        unsubscribes: typeof Unsubscribe;
        whitelists: typeof WhiteList;
    };
    constructor(request: Request);
    _parsePage(id: string, pageUrl: string): {
        id: string;
        page: string | string[];
        address: string | string[];
        url: string;
    };
    _parsePageLinks(response: {
        body: {
            paging: any;
        };
    }): any;
    _parseList(response: {
        body: {
            items: any;
            paging: any;
        };
    }, Model: TModel): any;
    _parseItem(response: {
        body: any;
    }, Model: TModel): Bounce | Complaint | Unsubscribe | WhiteList;
    private createWhiteList;
    list(domain: string, type: string, query: any): any;
    get(domain: string, type: string, address: string): any;
    create(domain: string, type: string, data: any): any;
    destroy(domain: string, type: string, address: string): any;
}
export {};
