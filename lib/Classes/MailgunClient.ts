/* eslint-disable camelcase */
import Request from './common/Request';
import MailgunClientOptions from '../interfaces/MailgunClientOptions';

import DomainClient from './Domains/domains';
import EventClient from './Events';
import StatsClient from './Stats';
import SuppressionClient from './Suppressions/SuppressionsClient';
import WebhooksClient from './Webhooks';
import MessagesClient from './Messages';
import RoutesClient from './Routes';
import ValidateClient from './Validations/validate';
import IpsClient from './IPs';
import IpPoolsClient from './IPPools';
import ListsClient from './MailingLists/mailingLists';
import MailListsMembers from './MailingLists/mailListMembers';
import { InputFormData, RequestOptions } from '../Types/Common';
import DomainCredentialsClient from './Domains/domainsCredentials';
import MultipleValidationClient from './Validations/multipleValidation';
import DomainTemplatesClient from './Domains/domainsTemplates';
import DomainTagsClient from './Domains/domainsTags';
import { IMailgunClient } from '../interfaces/IMailgunClient';

export default class MailgunClient implements IMailgunClient {
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

  constructor(options: MailgunClientOptions, formData: InputFormData) {
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
    const domainTemplatesClient = new DomainTemplatesClient(this.request);
    const domainTagsClient = new DomainTagsClient(this.request);
    const multipleValidationClient = new MultipleValidationClient(this.request);

    this.domains = new DomainClient(
      this.request,
      domainCredentialsClient,
      domainTemplatesClient,
      domainTagsClient
    );
    this.webhooks = new WebhooksClient(this.request);
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
