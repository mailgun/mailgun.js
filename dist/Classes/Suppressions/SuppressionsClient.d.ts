import Request from '../common/Request';
import NavigationThruPages from '../common/NavigationThruPages';
import Bounce from './Bounce';
import Complaint from './Complaint';
import Unsubscribe from './Unsubscribe';
import WhiteList from './WhiteList';
import Suppression from './Suppression';
import { IBounce, IComplaint, IUnsubscribe, IWhiteList } from '../../Interfaces/Suppressions';
import { SuppressionList, SuppressionListResponse, SuppressionDataType, SuppressionCreationData, SuppressionCreationResult, SuppressionListQuery, SuppressionDestroyResult } from '../../Types/Suppressions';
export default class SuppressionClient extends NavigationThruPages<SuppressionList> {
    request: Request;
    models: Map<string, any>;
    constructor(request: Request);
    protected parseList(response: SuppressionListResponse, Model: {
        new (data: SuppressionDataType): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): SuppressionList;
    _parseItem<T extends Suppression>(data: SuppressionDataType, Model: {
        new (dataType: SuppressionDataType): T;
    }): T;
    private createWhiteList;
    private checkType;
    private prepareResponse;
    list(domain: string, type: string, query?: SuppressionListQuery): Promise<SuppressionList>;
    get(domain: string, type: string, address: string): Promise<Bounce | Complaint | Unsubscribe | WhiteList>;
    create(domain: string, type: string, data: SuppressionCreationData | SuppressionCreationData[]): Promise<SuppressionCreationResult>;
    destroy(domain: string, type: string, address: string): Promise<SuppressionDestroyResult>;
}
