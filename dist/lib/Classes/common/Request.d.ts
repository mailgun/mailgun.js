import { RequestOptions, InputFormData, APIResponse, IpPoolDeleteData, FormDataInput, RequestData, GetQueryTypes, PostDataTypes, PutDataTypes, CommandQuery, PutOptionsType, PutQueryTypes, onCallReqConfig } from '../../Types';
declare class Request {
    private url;
    private formDataBuilder;
    private requestProvider;
    constructor(options: RequestOptions, formData: InputFormData);
    request(method: string, url: string, onCallOptions?: {
        body?: RequestData;
        query?: GetQueryTypes | PutQueryTypes;
    }, config?: onCallReqConfig): Promise<APIResponse>;
    setSubaccountHeader(subAccountId: string): void;
    resetSubaccountHeader(): void;
    query(method: string, url: string, query?: GetQueryTypes): Promise<APIResponse>;
    command(method: string, url: string, data?: RequestData, config?: onCallReqConfig, queryObject?: CommandQuery): Promise<APIResponse>;
    get(url: string, query?: GetQueryTypes): Promise<APIResponse>;
    post(url: string, data?: PostDataTypes, config?: Omit<onCallReqConfig, 'isFormURLEncoded' | 'isMultipartFormData'>): Promise<APIResponse>;
    postWithFD(url: string, data: FormDataInput): Promise<APIResponse>;
    putWithFD(url: string, data: FormDataInput): Promise<APIResponse>;
    patchWithFD(url: string, data: FormDataInput): Promise<APIResponse>;
    put(url: string, data?: PutDataTypes, queryObject?: PutOptionsType): Promise<APIResponse>;
    delete(url: string, data?: IpPoolDeleteData): Promise<APIResponse>;
}
export default Request;
