import type Request from './common/Request.js';
import { ISubaccountsClient } from '../Interfaces/index.js';
import { SubaccountDestroyResponse, SubaccountFeaturesData, SubaccountFeaturesResult, SubaccountListResponseData, SubaccountResponseData, SubaccountSendingLimitResponse, SubaccountSetSendingLimitResponse, SubaccountsQuery } from '../Types/index.js';
export default class SubaccountsClient implements ISubaccountsClient {
    request: Request;
    static SUBACCOUNT_HEADER: string;
    constructor(request: Request);
    private convertToDate;
    list(query?: SubaccountsQuery): Promise<SubaccountListResponseData>;
    get(id: string): Promise<SubaccountResponseData>;
    create(name: string): Promise<SubaccountResponseData>;
    destroy(id: string): Promise<SubaccountDestroyResponse>;
    getMonthlySendingLimit(id: string): Promise<SubaccountSendingLimitResponse>;
    setMonthlySendingLimit(id: string, limit: number): Promise<SubaccountSetSendingLimitResponse>;
    updateSubaccountFeature(id: string, features: SubaccountFeaturesData): Promise<SubaccountFeaturesResult>;
    enable(id: string): Promise<SubaccountResponseData>;
    disable(id: string): Promise<SubaccountResponseData>;
}
