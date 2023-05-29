import { WebhooksIds } from '../../Enums';
import { WebhookList, WebhookResult, WebhooksQuery, WebhookValidationResponse } from '../../Types/Webhooks';
export interface IWebHooksClient {
    list(domain: string, query: WebhooksQuery): Promise<WebhookList>;
    get(domain: string, id: WebhooksIds): Promise<WebhookResult>;
    create(domain: string, id: string, url: string, test: boolean): Promise<WebhookResult | WebhookValidationResponse>;
    update(domain: string, id: string, url: string): Promise<WebhookResult>;
    destroy(domain: string, id: string): Promise<WebhookResult>;
}
