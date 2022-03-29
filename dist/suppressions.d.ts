import Request from './request';
import { BounceData, ComplaintData, ParsedPage, ParsedPagesList, SuppressionCreationData, SuppressionCreationResult, SuppressionDestroyResult, SuppressionList, SuppressionListQuery, SuppressionListResponse, SuppressionModels, UnsubscribeData, WhiteListData } from './interfaces/Supressions';
export declare class Suppression {
    type: string;
    constructor(type: SuppressionModels);
}
export declare class Bounce extends Suppression {
    address: string;
    code: number;
    error: string;
    created_at: Date;
    constructor(data: BounceData);
}
export declare class Complaint extends Suppression {
    address: string | undefined;
    created_at: Date;
    constructor(data: ComplaintData);
}
export declare class Unsubscribe extends Suppression {
    address: string;
    tags: string[];
    created_at: Date;
    constructor(data: UnsubscribeData);
}
export declare class WhiteList extends Suppression {
    value: string;
    reason: string;
    createdAt: Date;
    constructor(data: WhiteListData);
}
export default class SuppressionClient {
    request: Request;
    models: Map<string, any>;
    constructor(request: Request);
    _parsePage(id: string, pageUrl: string): ParsedPage;
    _parsePageLinks(response: SuppressionListResponse): ParsedPagesList;
    _parseList(response: SuppressionListResponse, Model: {
        new (data: BounceData | ComplaintData | UnsubscribeData | WhiteListData): Bounce | Complaint | Unsubscribe | WhiteList;
    }): SuppressionList;
    _parseItem<T extends Suppression>(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData, Model: {
        new (data: BounceData | ComplaintData | UnsubscribeData | WhiteListData): T;
    }): T;
    private createWhiteList;
    private checkType;
    private prepareResponse;
    list(domain: string, type: string, query?: SuppressionListQuery): Promise<SuppressionList>;
    get(domain: string, type: string, address: string): Promise<Bounce | Complaint | Unsubscribe | WhiteList>;
    create(domain: string, type: string, data: SuppressionCreationData | SuppressionCreationData[]): Promise<SuppressionCreationResult>;
    destroy(domain: string, type: string, address: string): Promise<SuppressionDestroyResult>;
}
