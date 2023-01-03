import { MailgunClientOptions } from '../Types/MailgunClient';
import DomainClient from './Domains/domains';
import EventClient from './Events';
import StatsClient from './Stats/StatsClient';
import SuppressionClient from './Suppressions/SuppressionsClient';
import WebhooksClient from './Webhooks';
import MessagesClient from './Messages';
import RoutesClient from './Routes';
import ValidateClient from './Validations/validate';
import IpsClient from './IPs';
import IpPoolsClient from './IPPools';
import ListsClient from './MailingLists/mailingLists';
import { InputFormData } from '../Types/Common';
import { IMailgunClient } from '../Interfaces/MailgunClient';
export default class MailgunClient implements IMailgunClient {
    private request;
    domains: DomainClient;
    webhooks: WebhooksClient;
    events: EventClient;
    stats: StatsClient;
    suppressions: SuppressionClient;
    messages: MessagesClient;
    routes: RoutesClient;
    validate: ValidateClient;
    ips: IpsClient;
    ip_pools: IpPoolsClient;
    lists: ListsClient;
    constructor(options: MailgunClientOptions, formData: InputFormData);
}
