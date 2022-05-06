export interface APIWebhook {
    url?: string;
    urls?: string[];
}
export interface WebhookResponseBody {
    message: string;
    webhook: APIWebhook;
}
export interface WebhookResponse {
    status: number;
    body: WebhookResponseBody;
}
export interface WebhookList {
    [id: string]: {
        urls: string[];
    };
}
export declare type WebhooksQuery = {
    limit?: number;
    skip?: number;
};
export interface ValidationResponse {
    code: number;
    message: string;
}
export declare enum WebhooksIds {
    CLICKED = "clicked",
    COMPLAINED = "complained",
    DELIVERED = "delivered",
    OPENED = "opened",
    PERMANENT_FAIL = "permanent_fail",
    TEMPORARY_FAIL = "temporary_fail",
    UNSUBSCRIBED = "unsubscribe"
}
