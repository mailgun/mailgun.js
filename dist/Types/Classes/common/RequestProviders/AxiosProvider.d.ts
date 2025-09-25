import { APIResponse, onCallReqConfig, RequestProviderConfig, RequestProviderData } from '../../../Types/index.js';
import { IRequestProvider } from '../../../Interfaces/index.js';
declare class AxiosProvider implements IRequestProvider {
    private timeout;
    private maxBodyLength;
    private proxy;
    private username;
    private key;
    private headers;
    private useFetch;
    constructor({ username, key, timeout, maxBodyLength, proxy, configHeaders, useFetch }: RequestProviderConfig);
    private getResponseBody;
    private getDataRelatedHeaders;
    private addRequestLevelHeaders;
    private makeHeadersFromObject;
    setSubAccountHeader(subAccountId: string): void;
    resetSubAccountHeader(): void;
    makeRequest(url: string, method: string, data: RequestProviderData, config?: onCallReqConfig): Promise<APIResponse>;
}
export default AxiosProvider;
