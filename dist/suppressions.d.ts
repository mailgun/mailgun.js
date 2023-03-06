import Request from './request';
import { SuppressionCreationData, SuppressionCreationResult, SuppressionDataType, SuppressionDestroyResult, SuppressionList, SuppressionListQuery, SuppressionListResponse, SuppressionModels } from './interfaces/Suppressions/Suppressions';
import { IBounce, BounceData } from './interfaces/Suppressions/Bounce';
import { IComplaint, ComplaintData } from './interfaces/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from './interfaces/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from './interfaces/Suppressions/WhiteList';
import NavigationThruPages from './common/NavigationThruPages';
export declare class Suppression {
    type: string;
    constructor(type: SuppressionModels);
}
export declare class Bounce extends Suppression implements IBounce {
    address: string;
    code: number;
    error: string;
    created_at: Date;
    constructor(data: BounceData);
}
export declare class Complaint extends Suppression implements IComplaint {
    address: string;
    created_at: Date;
    constructor(data: ComplaintData);
}
export declare class Unsubscribe extends Suppression implements IUnsubscribe {
    address: string;
    tags: string[];
    created_at: Date;
    constructor(data: UnsubscribeData);
}
export declare class WhiteList extends Suppression implements IWhiteList {
    value: string;
    reason: string;
    createdAt: Date;
    constructor(data: WhiteListData);
}
export default class SuppressionClient extends NavigationThruPages<SuppressionList> {
    request: Request;
    models: Map<string, any>;
    constructor(request: Request);
    protected parseList(response: SuppressionListResponse, Model: {
        new (data: SuppressionDataType): IBounce | IComplaint | IUnsubscribe | IWhiteList;
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
