/* eslint-disable camelcase */
import DomainClient from '../Classes/Domains/domains';
import EventClient from '../Classes/Events';
import IpPoolsClient from '../Classes/IPPools';
import IpsClient from '../Classes/IPs';
import ListsClient from '../Classes/MailingLists/mailingLists';
import MessagesClient from '../Classes/Messages';
import RoutesClient from '../Classes/Routes';
import StatsClient from '../Classes/Stats';
import SuppressionClient from '../Classes/Suppressions/SuppressionsClient';
import ValidateClient from '../Classes/Validations/validate';
import WebhookClient from '../Classes/Webhooks';

export interface IMailgunClient {
    domains: DomainClient;
    webhooks: WebhookClient;
    events: EventClient;
    stats: StatsClient;
    suppressions: SuppressionClient;
    messages: MessagesClient;
    routes: RoutesClient;
    validate: ValidateClient;
    ips: IpsClient;
    ip_pools: IpPoolsClient;
    lists: ListsClient;
}
