export interface APIWebhook {
    url?: string
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
        urls: string[]
    }
}

export interface WebhooksQuery {
    limit?: number;
    skip?: number;
}

export interface ValidationResponse {
    code: number;
    message: string;
}
