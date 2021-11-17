/* eslint-disable camelcase */
import Request from './request';
import Options from './interfaces/Options';
import RequestOptions from './interfaces/RequestOptions';

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
import MailListsMembers from './mailListMembers';
import { InputFormData } from './interfaces/IFormData';
import DomainCredentialsClient from './domainsCredentials';
import MultipleValidationClient from './multipleValidation';

export default class Client {
  private request;

  public domains;
  public webhooks;
  public events;
  public stats;
  public suppressions;
  public messages;
  public routes;
  public validate;
  public ips;
  public ip_pools;
  public lists;

  constructor(options: Options, formData: InputFormData) {
    const config: RequestOptions = { ...options } as RequestOptions;

    if (!config.url) {
      config.url = 'https://api.mailgun.net';
    }

    if (!config.username) {
      throw new Error('Parameter "username" is required');
    }

    if (!config.key) {
      throw new Error('Parameter "key" is required');
    }

    /** @internal */
    this.request = new Request(config, formData);
    const mailListsMembers = new MailListsMembers(this.request);
    const domainCredentialsClient = new DomainCredentialsClient(this.request);
    const multipleValidationClient = new MultipleValidationClient(this.request);

    this.domains = new DomainClient(this.request, domainCredentialsClient);
    this.webhooks = new WebhookClient(this.request);
    this.events = new EventClient(this.request);
    this.stats = new StatsClient(this.request);
    this.suppressions = new SuppressionClient(this.request);
    this.messages = new MessagesClient(this.request);
    this.routes = new RoutesClient(this.request);
    this.ips = new IpsClient(this.request);
    this.ip_pools = new IpPoolsClient(this.request);
    this.lists = new ListsClient(this.request, mailListsMembers);
    this.validate = new ValidateClient(this.request, multipleValidationClient);
  }
}
