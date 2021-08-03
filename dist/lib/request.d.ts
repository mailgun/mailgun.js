import RequestOptions from './interfaces/RequestOptions';
import IFormData from './interfaces/IFormData';
import APIResponse from './interfaces/ApiResponse';
declare class Request {
    private username;
    private key;
    private url;
    private timeout;
    private headers;
    private formData;
    constructor(options: RequestOptions, formData: new () => IFormData);
    request(method: string, url: string, inputOptions?: any): Promise<APIResponse>;
    query(method: string, url: string, query: any, options?: any): Promise<APIResponse>;
    command(method: string, url: string, data: any, options?: any): Promise<APIResponse>;
    get(url: string, query?: any, options?: any): Promise<APIResponse>;
    head(url: string, query: any, options: any): Promise<APIResponse>;
    options(url: string, query: any, options: any): Promise<APIResponse>;
    post(url: string, data: any, options?: any): Promise<APIResponse>;
    postWithFD(url: string, data: any): Promise<APIResponse>;
    putWithFD(url: string, data: any): Promise<APIResponse>;
    createFormData(data: any): IFormData;
    put(url: string, data: any, options?: any): Promise<APIResponse>;
    patch(url: string, data: any, options?: any): Promise<APIResponse>;
    delete(url: string, data?: any, options?: any): Promise<APIResponse>;
}
export default Request;
