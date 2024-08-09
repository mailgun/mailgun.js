/* eslint-disable camelcase */
import Request from './common/Request';
import { MailgunClientOptions, InputFormData, RequestOptions } from '../Types';

import DomainsClient from './Domains/domainsClient';
import EventClient from './Events';
import StatsClient from './Stats/StatsClient';
import SuppressionClient from './Suppressions/SuppressionsClient';
import WebhooksClient from './Webhooks';
import MessagesClient from './Messages';
import RoutesClient from './Routes';
import ValidateClient from './Validations/validate';
import IpsClient from './IPs';
import IpPoolsClient from './IPPools';
import MailingListsClient from './MailingLists/mailingLists';
import MailListsMembers from './MailingLists/mailListMembers';
import DomainCredentialsClient from './Domains/domainsCredentials';
import MultipleValidationClient from './Validations/multipleValidation';
import DomainTemplatesClient from './Domains/domainsTemplates';
import DomainTagsClient from './Domains/domainsTags';
import SubaccountsClient from './Subaccounts';

import {
  IDomainsClient,
  IWebHooksClient,
  IMailgunClient,
  IMailingListsClient,
  IEventClient,
  IStatsClient,
  ISuppressionClient,
  IMessagesClient,
  IRoutesClient,
  IValidationClient,
  IIPsClient,
  IIPPoolsClient,
  ISubaccountsClient,
  IInboxPlacementsClient,
} from '../Interfaces';
import SeedsListsClient from './InboxPlacements/SeedsLists/SeedsListsClient';
import InboxPlacementsClient from './InboxPlacements/inboxPlacements';
import InboxPlacementsResultsClient from './InboxPlacements/Results/InboxPlacementsResultsClient';
import InboxPlacementsAttributesClient from './InboxPlacements/AttributesClient';
import InboxPlacementsFiltersClient from './InboxPlacements/FiltersClient';
import IPRSharingClient from './InboxPlacements/Results/InboxPlacementsResultsSharingClient';
import InboxPlacementsProvidersClient from './InboxPlacements/providers/InboxPlacementsProviders';

export default class MailgunClient implements IMailgunClient {
  private request;

  public domains: IDomainsClient;
  public webhooks: IWebHooksClient;
  public events: IEventClient;
  public stats: IStatsClient;
  public suppressions: ISuppressionClient;
  public messages: IMessagesClient;
  public routes: IRoutesClient;
  public validate: IValidationClient;
  public ips: IIPsClient;
  public ip_pools: IIPPoolsClient;
  public lists: IMailingListsClient;
  public subaccounts: ISubaccountsClient;
  public inboxPlacements: IInboxPlacementsClient;

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
    const InboxPlacementsResultsSharingClient = new IPRSharingClient(this.request);

    const seedsListsAttributes = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/seedlists/a');
    const resultsAttributesClient = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/results/a');

    const seedsListsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/seedlists/_filters');
    const resultsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/results/_filters');

    const seedsListsClient = new SeedsListsClient(
      this.request,
      seedsListsAttributes,
      seedsListsFiltersClient
    );

    const inboxPlacementsResultsClient = new InboxPlacementsResultsClient(
      this.request,
      resultsAttributesClient,
      resultsFiltersClient,
      InboxPlacementsResultsSharingClient
    );

    const inboxPlacementsProvidersClient = new InboxPlacementsProvidersClient(
      this.request
    );

    this.domains = new DomainsClient(
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
    this.lists = new MailingListsClient(this.request, mailListsMembers);
    this.validate = new ValidateClient(this.request, multipleValidationClient);
    this.subaccounts = new SubaccountsClient(this.request);
    this.inboxPlacements = new InboxPlacementsClient(
      this.request,
      seedsListsClient,
      inboxPlacementsResultsClient,
      inboxPlacementsProvidersClient,
    );
  }

  setSubaccount(subaccountId: string): void {
    this.request?.setSubaccountHeader(subaccountId);
  }

  resetSubaccount(): void {
    this.request?.resetSubaccountHeader();
  }
}
