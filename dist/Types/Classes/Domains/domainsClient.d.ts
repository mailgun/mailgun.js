import { IDomainTemplatesClient, IDomainTagsClient, IDomainCredentials, IDomainsClient } from '../../Interfaces/Domains/index.js';
import { APIResponse } from '../../Types/Common/ApiResponse.js';
import Request from '../common/Request.js';
import { MessageResponse, DomainTrackingData, UpdatedOpenTracking, DomainsQuery, DomainInfo, ConnectionSettings, UpdatedConnectionSettings, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, ReplacementForPool, DKIMAuthorityInfo, UpdatedDKIMAuthority, DKIMSelectorInfo, WebPrefixInfo, UpdatedWebPrefixResponse, TDomain, DomainUpdateInfo, DomainGetQuery, UpdatedDKIMSelectorResult } from '../../Types/Domains/index.js';
import { ILogger, IDomainTrackingClient } from '../../Interfaces/index.js';
export default class DomainsClient implements IDomainsClient {
    request: Request;
    domainCredentials: IDomainCredentials;
    domainTemplates: IDomainTemplatesClient;
    domainTags: IDomainTagsClient;
    domainTracking: IDomainTrackingClient;
    private logger;
    constructor(request: Request, domainCredentialsClient: IDomainCredentials, domainTemplatesClient: IDomainTemplatesClient, domainTagsClient: IDomainTagsClient, domainTracking: IDomainTrackingClient, logger?: ILogger);
    private _handleBoolValues;
    private _parseMessage;
    private parseDomainList;
    private _parseDomain;
    list(query?: DomainsQuery): Promise<TDomain[]>;
    get(domain: string, query?: DomainGetQuery): Promise<TDomain>;
    create(data: DomainInfo): Promise<TDomain>;
    update(domain: string, data: DomainUpdateInfo): Promise<TDomain>;
    verify(domain: string): Promise<TDomain>;
    destroy(domain: string): Promise<MessageResponse>;
    getConnection(domain: string): Promise<ConnectionSettings>;
    updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings>;
    /**
    * @deprecated 'domains.getTracking' method is deprecated, and will be removed.
    * Please use 'domains.domainTracking.getTracking' instead.
    */
    getTracking(domain: string): Promise<DomainTrackingData>;
    /**
    * @deprecated 'domains.updateTracking' method is deprecated, and will be removed.
    * Please use 'domains.domainTracking.updateTracking' instead.
    */
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
    /**
    * @deprecated "domains.getIps" method is deprecated, and will be removed in the future releases.
    */
    getIps(domain: string): Promise<string[]>;
    /**
    * @deprecated "domains.assignIp" method is deprecated, and will be removed in the future releases.
    */
    assignIp(domain: string, ip: string): Promise<APIResponse>;
    /**
    * @deprecated "domains.deleteIp" method is deprecated, and will be moved to the IpsClient.
    */
    deleteIp(domain: string, ip: string): Promise<APIResponse>;
    /**
    * @deprecated "domains.linkIpPool" method is deprecated, and will be removed
    * in the future releases.
    */
    linkIpPool(domain: string, poolId: string): Promise<APIResponse>;
    /**
    * @deprecated "domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient
    * in the future releases.
    */
    unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse>;
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>;
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResult>;
    /**
    * @deprecated "domains.updateWebPrefix" method is deprecated.
    * Please use domains.update to set new "web_prefix".
    * Current method will be removed in the future releases.
    */
    updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse>;
}
