import RequestOptions from './interfaces/RequestOptions';
declare class Request {
    private username;
    private key;
    private url;
    private headers;
    private formData;
    constructor(options: RequestOptions, formData: FormData);
    request(method: string, url: string, options: any): void;
    query(method: string, url: string, params: any, options: any): void;
    command(method: string, url: string, data: any, options: any): void;
    get(url: string, params: any, options: any): void;
    head(url: string, params: any, options: any): void;
    options(url: string, params: any, options: any): void;
    post(url: string, data: any, options: any): void;
    postMulti(url: string, data: any): void;
    put(url: string, data: any, options: any): void;
    patch(url: string, data: any, options: any): void;
    delete(url: string, data: any, options: any): void;
}
export default Request;
