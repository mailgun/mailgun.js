import Request from './common/Request.js';
import { MailgunClientOptions, InputFormData } from '../Types/index.js';
import { IDomainsClient, IWebHooksClient, IMailgunClient, IMailingListsClient, IEventClient, IStatsClient, ISuppressionClient, IMessagesClient, IRoutesClient, IValidationClient, IIPsClient, IIPPoolsClient, ISubaccountsClient, IInboxPlacementsClient, IMetricsClient } from '../Interfaces/index.js';
export default class MailgunClient implements IMailgunClient {
    request: Request;
    domains: IDomainsClient;
    webhooks: IWebHooksClient;
    events: IEventClient;
    stats: IStatsClient;
    metrics: IMetricsClient;
    suppressions: ISuppressionClient;
    messages: IMessagesClient;
    routes: IRoutesClient;
    validate: IValidationClient;
    ips: IIPsClient;
    ip_pools: IIPPoolsClient;
    lists: IMailingListsClient;
    subaccounts: ISubaccountsClient;
    inboxPlacements: IInboxPlacementsClient;
    constructor(options: MailgunClientOptions, formData: InputFormData);
    setSubaccount(subaccountId: string): void;
    resetSubaccount(): void;
}
