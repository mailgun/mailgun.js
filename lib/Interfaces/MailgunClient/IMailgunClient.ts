import { IWebHooksClient } from '../Webhooks';
/* eslint-disable camelcase */
import { IDomainsClient } from '../Domains';
import { IEventClient } from '../EventClient';
import { IStatsClient } from '../Stats';
import { IMessagesClient } from '../Messages';
import { ISuppressionClient } from '../Suppressions';
import { IRoutesClient } from '../Routes';
import { IValidationClient } from '../Validations';
import { IIPsClient } from '../IPs';
import { IIPPoolsClient } from '../IPPools';
import { IMailingListsClient } from '../MailingLists';
import { ISubaccountsClient } from '../Subaccounts';
import { ISecureTrackingClient } from '../SecureTracking';

export interface IMailgunClient {
    domains: IDomainsClient;
    webhooks: IWebHooksClient;
    events: IEventClient;
    stats: IStatsClient;
    suppressions: ISuppressionClient;
    messages: IMessagesClient;
    routes: IRoutesClient;
    validate: IValidationClient;
    ips: IIPsClient;
    ip_pools: IIPPoolsClient;
    lists: IMailingListsClient;
    subaccounts: ISubaccountsClient;
    secure_tracking: ISecureTrackingClient;
    setSubaccount(subaccountId: string): void;
    resetSubaccount(): void;
}
