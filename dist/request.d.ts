import * as NodeFormData from 'form-data';
import { RequestOptions } from './interfaces/RequestOptions';
import { InputFormData } from './interfaces/IFormData';
import APIResponse from './interfaces/ApiResponse';
import { IpPoolDeleteData } from './interfaces/IpPools';
declare class Request {
    private username;
    private key;
    private url;
    private timeout;
    private headers;
    private formDataBuilder;
    private maxBodyLength;
    constructor(options: RequestOptions, formData: InputFormData);
    request(method: string, url: string, onCallOptions?: Record<string, unknown | Record<string, unknown>>): Promise<APIResponse>;
    private getResponseBody;
    query(method: string, url: string, query?: Record<string, unknown> | Array<Array<string>>, options?: Record<string, unknown>): Promise<APIResponse>;
    command(method: string, url: string, data?: Record<string, unknown> | Record<string, unknown>[] | string | NodeFormData | FormData, options?: Record<string, unknown>, addDefaultHeaders?: boolean): Promise<APIResponse>;
    get(url: string, query?: Record<string, unknown> | Array<Array<string>>, options?: Record<string, unknown>): Promise<APIResponse>;
    post(url: string, data?: Record<string, unknown> | string, options?: Record<string, unknown>): Promise<APIResponse>;
    postWithFD(url: string, data: Record<string, unknown> | Record<string, unknown>[]): Promise<APIResponse>;
    putWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse>;
    patchWithFD(url: string, data: Record<string, unknown>): Promise<APIResponse>;
    put(url: string, data?: Record<string, unknown> | string, options?: Record<string, unknown>): Promise<APIResponse>;
    delete(url: string, data?: IpPoolDeleteData): Promise<APIResponse>;
}
export default Request;
