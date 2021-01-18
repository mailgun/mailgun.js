import Request from './request';
declare class Webhook {
    id: string;
    url: string;
    constructor(id: string, data: {
        url: string;
    });
}
export default class WebhookClient {
    request: any;
    constructor(request: Request);
    _parseWebhookList(response: {
        body: {
            webhooks: any;
        };
    }): any;
    _parseWebhookWithID(id: string): (response: {
        body: {
            webhook: any;
        };
    }) => Webhook;
    _parseWebhookTest(response: {
        body: {
            code: number;
            message: string;
        };
    }): {
        code: number;
        message: string;
    };
    list(domain: string, query: any): any;
    get(domain: string, id: string): any;
    create(domain: string, id: string, url: string, test: boolean): any;
    update(domain: string, id: string, url: string): any;
    destroy(domain: string, id: string): any;
}
export {};
