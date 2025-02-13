import type Request from './common/Request.js';
import { ISubaccountsClient } from '../Interfaces/index.js';
import { SubaccountListResponseData, SubaccountResponseData, SubaccountsQuery } from '../Types/index.js';
export default class SubaccountsClient implements ISubaccountsClient {
    request: Request;
    static SUBACCOUNT_HEADER: string;
    constructor(request: Request);
    list(query?: SubaccountsQuery): Promise<SubaccountListResponseData>;
    get(id: string): Promise<SubaccountResponseData>;
    create(name: string): Promise<SubaccountResponseData>;
    enable(id: string): Promise<SubaccountResponseData>;
    disable(id: string): Promise<SubaccountResponseData>;
}
