import { ValidationResponse, WebhookList, WebhookResponse, WebhooksIds, WebhooksQuery } from './interfaces/Webhooks';
import Request from './request';
declare class Webhook {
    id: string;
    url: string | undefined;
    constructor(id: string, url: string | undefined);
}
export default class WebhookClient {
    request: Request;
    constructor(request: Request);
    _parseWebhookList(response: {
        body: {
            webhooks: WebhookList;
        };
    }): WebhookList;
    _parseWebhookWithID(id: string): (response: WebhookResponse) => Webhook;
    _parseWebhookTest(response: {
        body: {
            code: number;
            message: string;
        };
    }): {
        code: number;
        message: string;
    };
    list(domain: string, query: WebhooksQuery): Promise<WebhookList>;
    get(domain: string, id: WebhooksIds): Promise<Webhook>;
    create(domain: string, id: string, url: string, test?: boolean): Promise<Webhook | ValidationResponse>;
    update(domain: string, id: string, url: string): Promise<Webhook>;
    destroy(domain: string, id: string): Promise<Webhook>;
}
export {};
