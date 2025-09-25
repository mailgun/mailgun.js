import { APIResponse, onCallReqConfig, RequestData } from '../../../Types/index.js';
export interface IRequestProvider {
    makeRequest(url: string, method: string, data: RequestData, config?: onCallReqConfig): Promise<APIResponse>;
    setSubAccountHeader(subAccountId: string): void;
    resetSubAccountHeader(): void;
}
