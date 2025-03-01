import { WebhooksIds } from '../Enums/index.js';
import { IWebHooksClient } from '../Interfaces/Webhooks/index.js';
import { WebhookValidationResponse, WebhookList, WebhookResponse, WebhooksQuery, WebhookResult } from '../Types/Webhooks/index.js';
import Request from './common/Request.js';
export declare class Webhook implements WebhookResult {
    id: string;
    url: string | undefined;
    urls: string[];
    constructor(id: string, url: string | undefined, urls: string[]);
}
export default class WebhooksClient implements IWebHooksClient {
    request: Request;
    constructor(request: Request);
    private _parseWebhookList;
    _parseWebhookWithID(id: string): (response: WebhookResponse) => WebhookResult;
    private _parseWebhookTest;
    list(domain: string, query: WebhooksQuery): Promise<WebhookList>;
    get(domain: string, id: WebhooksIds): Promise<WebhookResult>;
    create(domain: string, id: string, url: string, test?: boolean): Promise<WebhookResult | WebhookValidationResponse>;
    update(domain: string, id: string, urlValues: string | string[]): Promise<WebhookResult>;
    destroy(domain: string, id: string): Promise<WebhookResult>;
}
