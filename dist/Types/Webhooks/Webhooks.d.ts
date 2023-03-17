export declare type APIWebhook = {
    url?: string;
    urls?: string[];
};
export declare type WebhookResponseBody = {
    message: string;
    webhook: APIWebhook;
};
export declare type WebhookResponse = {
    status: number;
    body: WebhookResponseBody;
};
export declare type WebhookList = {
    [id: string]: {
        urls: string[];
    };
};
export declare type WebhooksQuery = {
    limit?: number;
    skip?: number;
};
export declare type WebhookValidationResponse = {
    code: number;
    message: string;
};
