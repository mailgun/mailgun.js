import Request from './request';
import Options from './interfaces/Options';
export default class Client {
    private request;
    domains: any;
    webhooks: any;
    events: any;
    stats: any;
    suppressions: any;
    messages: any;
    routes: any;
    public_request: Request;
    validate: any;
    parse: any;
    constructor(options: Options, formData: FormData);
}
