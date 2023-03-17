import { MailgunClientOptions } from '../Types/MailgunClient';
import { InputFormData } from '../Types/Common';
import { IDomainsClient, IWebHooksClient, IMailgunClient, IMailingListsClient, IEventClient, IStatsClient, ISuppressionClient, IMessagesClient, IRoutesClient, IValidationClient, IIPsClient, IIPPoolsClient } from '../Interfaces';
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
    constructor(options: MailgunClientOptions, formData: InputFormData);
}
