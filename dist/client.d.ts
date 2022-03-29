import Options from './interfaces/Options';
import DomainClient from './domains';
import EventClient from './events';
import StatsClient from './stats';
import SuppressionClient from './suppressions';
import WebhookClient from './webhooks';
import MessagesClient from './messages';
import RoutesClient from './routes';
import ValidateClient from './validate';
import IpsClient from './ips';
import IpPoolsClient from './ip-pools';
import ListsClient from './lists';
import { InputFormData } from './interfaces/IFormData';
import { IMailgunClient } from './interfaces/IMailgunClient';
export default class Client implements IMailgunClient {
    private request;
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
    constructor(options: Options, formData: InputFormData);
}
