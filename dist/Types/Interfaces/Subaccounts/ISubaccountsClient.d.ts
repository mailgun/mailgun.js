import { SubaccountDestroyResponse, SubaccountListResponseData, SubaccountResponseData, SubaccountSendingLimitResponse, SubaccountSetSendingLimitResponse, SubaccountsQuery } from '../../Types/index.js';
export interface ISubaccountsClient {
    list(query?: SubaccountsQuery): Promise<SubaccountListResponseData>;
    get(id: string): Promise<SubaccountResponseData>;
    create(name: string): Promise<SubaccountResponseData>;
    disable(id: string): Promise<SubaccountResponseData>;
    enable(id: string): Promise<SubaccountResponseData>;
    destroy(id: string): Promise<SubaccountDestroyResponse>;
    getMonthlySendingLimit(id: string): Promise<SubaccountSendingLimitResponse>;
    setMonthlySendingLimit(id: string, limit: number): Promise<SubaccountSetSendingLimitResponse>;
}
