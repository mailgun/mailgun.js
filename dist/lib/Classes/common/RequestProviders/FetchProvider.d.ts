import { IRequestProvider } from '../../../Interfaces';
import { APIResponse, onCallReqConfig, RequestHeaders, RequestProviderConfig, RequestProviderData } from '../../../Types';
declare class FetchProvider implements IRequestProvider {
    private timeout;
    private maxBodyLength;
    private proxy;
    private username;
    private key;
    private headers;
    constructor({ username, key, timeout, maxBodyLength, proxy, configHeaders }: RequestProviderConfig);
    private getResponseBody;
    private extendUrl;
    private getDataRelatedHeaders;
    private prepareReqBody;
    private checkSize;
    makeRequest(url: string, method: string, reqData: RequestProviderData, config?: onCallReqConfig): Promise<APIResponse>;
    setSubAccountHeader(subAccountId: string): void;
    resetSubAccountHeader(): void;
    makeHeadersFromObject(headersObject?: RequestHeaders | Headers): Headers;
    addRequestLevelHeaders(config?: onCallReqConfig): Headers;
    private isHeaders;
    private hasKeysMethod;
}
export default FetchProvider;
