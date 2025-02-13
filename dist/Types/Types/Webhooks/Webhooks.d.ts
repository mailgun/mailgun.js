export type APIWebhook = {
    url?: string;
    urls?: string[];
};
export type WebhookResponseBody = {
    message: string;
    webhook: APIWebhook;
};
export type WebhookResponse = {
    status: number;
    body: WebhookResponseBody;
};
export type WebhookList = {
    [id: string]: {
        urls: string[];
    };
};
export type WebhooksQuery = {
    limit?: number;
    skip?: number;
};
export type WebhookValidationResponse = {
    code: number;
    message: string;
};
export type WebhookResult = {
    id: string;
    /**
     * @deprecated url property is deprecated. Use "urls" instead.
     */
    url: string | undefined;
    urls: string[];
};
