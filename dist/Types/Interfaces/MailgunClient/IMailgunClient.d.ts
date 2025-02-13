import { IWebHooksClient } from '../Webhooks/index.js';
import { IDomainsClient } from '../Domains/index.js';
import { IEventClient } from '../EventClient/index.js';
import { IStatsClient } from '../Stats/index.js';
import { IMessagesClient } from '../Messages/index.js';
import { ISuppressionClient } from '../Suppressions/index.js';
import { IRoutesClient } from '../Routes/index.js';
import { IValidationClient } from '../Validations/index.js';
import { IIPsClient } from '../IPs/index.js';
import { IIPPoolsClient } from '../IPPools/index.js';
import { IMailingListsClient } from '../MailingLists/index.js';
import { ISubaccountsClient } from '../Subaccounts/index.js';
import { IInboxPlacementsClient } from '../InboxPlacements/index.js';
import { IMetricsClient } from '../Metrics/MetricsClient.js';
import type Request from '../../Classes/common/Request.js';
export interface IMailgunClient {
    request: Request;
    domains: IDomainsClient;
    webhooks: IWebHooksClient;
    events: IEventClient;
    stats: IStatsClient;
    metrics: IMetricsClient;
    suppressions: ISuppressionClient;
    messages: IMessagesClient;
    routes: IRoutesClient;
    validate: IValidationClient;
    ips: IIPsClient;
    ip_pools: IIPPoolsClient;
    lists: IMailingListsClient;
    subaccounts: ISubaccountsClient;
    inboxPlacements: IInboxPlacementsClient;
    setSubaccount(subaccountId: string): void;
    resetSubaccount(): void;
}
