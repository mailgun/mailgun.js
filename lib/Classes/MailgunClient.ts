/* eslint-disable camelcase */
import Request from './common/Request.js';
import { MailgunClientOptions, InputFormData, RequestOptions } from '../Types/index.js';

import DomainsClient from './Domains/domainsClient.js';
import EventClient from './Events.js';
import StatsClient from './Stats/StatsClient.js';
import SuppressionClient from './Suppressions/SuppressionsClient.js';
import WebhooksClient from './Webhooks.js';
import MessagesClient from './Messages.js';
import RoutesClient from './Routes.js';
import ValidateClient from './Validations/validate.js';
import IpsClient from './IPs.js';
import IpPoolsClient from './IPPools.js';
import MailingListsClient from './MailingLists/mailingLists.js';
import MailListsMembers from './MailingLists/mailListMembers.js';
import DomainCredentialsClient from './Domains/domainsCredentials.js';
import MultipleValidationClient from './Validations/multipleValidation.js';
import DomainTemplatesClient from './Domains/domainsTemplates.js';
import DomainTagsClient from './Domains/domainsTags.js';
import SubaccountsClient from './Subaccounts.js';

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
  IMetricsClient,
  IDKIMManagementClient,
  ILogsClient
} from '../Interfaces/index.js';
import SeedsListsClient from './InboxPlacements/SeedsLists/SeedsListsClient.js';
import InboxPlacementsClient from './InboxPlacements/inboxPlacements.js';
import InboxPlacementsResultsClient from './InboxPlacements/Results/InboxPlacementsResultsClient.js';
import InboxPlacementsAttributesClient from './InboxPlacements/AttributesClient.js';
import InboxPlacementsFiltersClient from './InboxPlacements/FiltersClient.js';
import IPRSharingClient from './InboxPlacements/Results/InboxPlacementsResultsSharingClient.js';
import InboxPlacementsProvidersClient from './InboxPlacements/providers/InboxPlacementsProviders.js';
import MetricsClient from './Metrics/MetricsClient.js';
import DomainTrackingClient from './Domains/domainsTracking.js';
import DomainKeysClient from './Domains/domainsKeys.js';
import LogsClient from './Logs/LogsClient.js';
import DKIMManagementClient from './DKIM/DKIMManagment.js';

export default class MailgunClient implements IMailgunClient {
  public request;

  public domains: IDomainsClient;
  public webhooks: IWebHooksClient;
  public events: IEventClient;
  public stats: IStatsClient;
  public metrics: IMetricsClient;
  public suppressions: ISuppressionClient;
  public messages: IMessagesClient;
  public routes: IRoutesClient;
  public validate: IValidationClient;
  public ips: IIPsClient;
  public ip_pools: IIPPoolsClient;
  public lists: IMailingListsClient;
  public subaccounts: ISubaccountsClient;
  public inboxPlacements: IInboxPlacementsClient;
  public logs: ILogsClient;
  public dkimManagement: IDKIMManagementClient

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

    if (config.useFetch && config.proxy) {
      throw new Error('Proxy can not be used with fetch provider');
    }

    /** @internal */
    this.request = new Request(config, formData);
    const mailListsMembers = new MailListsMembers(this.request);
    const domainCredentialsClient = new DomainCredentialsClient(this.request);
    const domainTemplatesClient = new DomainTemplatesClient(this.request);
    const domainTagsClient = new DomainTagsClient(this.request);
    const domainTrackingClient = new DomainTrackingClient(this.request);
    const domainKeysClient = new DomainKeysClient(this.request);
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
      domainTagsClient,
      domainTrackingClient,
      domainKeysClient
    );
    this.webhooks = new WebhooksClient(this.request);
    this.events = new EventClient(this.request);
    this.stats = new StatsClient(this.request);
    this.metrics = new MetricsClient(this.request);
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
    this.logs = new LogsClient(this.request);
    this.dkimManagement = new DKIMManagementClient(this.request);
  }

  setSubaccount(subaccountId: string): void {
    this.request?.setSubaccountHeader(subaccountId);
  }

  resetSubaccount(): void {
    this.request?.resetSubaccountHeader();
  }
}
