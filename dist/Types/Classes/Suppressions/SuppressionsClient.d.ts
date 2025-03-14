import Request from '../common/Request.js';
import NavigationThruPages from '../common/NavigationThruPages.js';
import Suppression from './Suppression.js';
import { IBounce, IComplaint, ISuppressionClient, IUnsubscribe, IWhiteList } from '../../Interfaces/Suppressions/index.js';
import { SuppressionList, SuppressionListResponse, SuppressionDataType, SuppressionCreationData, SuppressionCreationResult, SuppressionListQuery, SuppressionDestroyResult } from '../../Types/Suppressions/index.js';
export default class SuppressionClient extends NavigationThruPages<SuppressionList> implements ISuppressionClient {
    request: Request;
    models: object;
    constructor(request: Request);
    protected parseList(response: SuppressionListResponse, Model: {
        new (data: SuppressionDataType): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): SuppressionList;
    _parseItem<T extends Suppression>(data: SuppressionDataType, Model: {
        new (dataType: SuppressionDataType): T;
    }): T;
    private createWhiteList;
    private createUnsubscribe;
    private getModel;
    private prepareResponse;
    list(domain: string, type: string, query?: SuppressionListQuery): Promise<SuppressionList>;
    get(domain: string, type: string, address: string): Promise<IBounce | IComplaint | IUnsubscribe | IWhiteList>;
    create(domain: string, type: string, data: SuppressionCreationData | SuppressionCreationData[]): Promise<SuppressionCreationResult>;
    destroy(domain: string, type: string, address: string): Promise<SuppressionDestroyResult>;
}
