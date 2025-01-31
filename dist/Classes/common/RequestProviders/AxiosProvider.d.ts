import { APIResponse, onCallReqConfig, RequestProviderConfig, RequestProviderData } from '../../../Types';
import { IRequestProvider } from '../../../Interfaces';
declare class AxiosProvider implements IRequestProvider {
    private timeout;
    private maxBodyLength;
    private proxy;
    private username;
    private key;
    private headers;
    constructor({ username, key, timeout, maxBodyLength, proxy, configHeaders }: RequestProviderConfig);
    private getResponseBody;
    private getDataRelatedHeaders;
    private addRequestLevelHeaders;
    private makeHeadersFromObject;
    setSubAccountHeader(subAccountId: string): void;
    resetSubAccountHeader(): void;
    makeRequest(url: string, method: string, data: RequestProviderData, config?: onCallReqConfig): Promise<APIResponse>;
}
export default AxiosProvider;
