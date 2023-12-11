import { MailgunClientOptions, InputFormData } from '../Types';
import { IDomainsClient, IWebHooksClient, IMailgunClient, IMailingListsClient, IEventClient, IStatsClient, ISuppressionClient, IMessagesClient, IRoutesClient, IValidationClient, IIPsClient, IIPPoolsClient, ISubaccountsClient } from '../Interfaces';
export default class MailgunClient implements IMailgunClient {
    private request;
    domains: IDomainsClient;
    webhooks: IWebHooksClient;
    events: IEventClient;
    stats: IStatsClient;
    suppressions: ISuppressionClient;
    messages: IMessagesClient;
    routes: IRoutesClient;
    validate: IValidationClient;
    ips: IIPsClient;
    ip_pools: IIPPoolsClient;
    lists: IMailingListsClient;
    subaccounts: ISubaccountsClient;
    constructor(options: MailgunClientOptions, formData: InputFormData);
    setSubaccount(subaccountId: string): void;
    resetSubaccount(): void;
}
