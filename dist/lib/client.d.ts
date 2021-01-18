import Request from './request';
import Options from './interfaces/Options';
import DomainClient from './domains';
import EventClient from './events';
import StatsClient from './stats';
import SuppressionClient from './suppressions';
import WebhookClient from './webhooks';
import MessagesClient from './messages';
import RoutesClient from './routes';
import ValidateClient from './validate';
import ParseClient from './parse';
export default class Client {
    private request;
    domains: DomainClient;
    webhooks: WebhookClient;
    events: EventClient;
    stats: StatsClient;
    suppressions: SuppressionClient;
    messages: MessagesClient;
    routes: RoutesClient;
    public_request: Request;
    validate: ValidateClient;
    parse: ParseClient;
    constructor(options: Options, formData: FormData);
}
