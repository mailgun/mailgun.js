import MailgunClientOptions from '../interfaces/MailgunClientOptions';
import DomainClient from './Domains/domains';
import EventClient from './Events';
import StatsClient from './Stats';
import SuppressionClient from './SuppressionsClient';
import WebhooksClient from './Webhooks';
import MessagesClient from './Messages';
import RoutesClient from './Routes';
import ValidateClient from './Validations/validate';
import IpsClient from './IPs';
import IpPoolsClient from './IPPools';
import ListsClient from './MailingLists/mailingLists';
import { InputFormData } from '../interfaces/IFormData';
import { IMailgunClient } from '../interfaces/IMailgunClient';
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
