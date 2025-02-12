import { SubaccountListResponseData, SubaccountResponseData, SubaccountsQuery } from '../../Types/index.js';
export interface ISubaccountsClient {
    list(query?: SubaccountsQuery): Promise<SubaccountListResponseData>;
    get(id: string): Promise<SubaccountResponseData>;
    create(name: string): Promise<SubaccountResponseData>;
    disable(id: string): Promise<SubaccountResponseData>;
    enable(id: string): Promise<SubaccountResponseData>;
}
