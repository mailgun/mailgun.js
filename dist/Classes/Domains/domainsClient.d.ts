import { IDomainTemplatesClient, IDomainTagsClient, IDomainCredentials, IDomainsClient } from '../../Interfaces/Domains';
import { APIResponse } from '../../Types/Common/ApiResponse';
import Request from '../common/Request';
import DomainCredentialsClient from './domainsCredentials';
import DomainTemplatesClient from './domainsTemplates';
import DomainTagsClient from './domainsTags';
import { MessageResponse, DomainTrackingData, UpdatedOpenTracking, DomainsQuery, DomainInfo, ConnectionSettings, UpdatedConnectionSettings, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, ReplacementForPool, DKIMAuthorityInfo, UpdatedDKIMAuthority, DKIMSelectorInfo, WebPrefixInfo, UpdatedWebPrefixResponse, TDomain, DomainUpdateInfo, DomainGetQuery, UpdatedDKIMSelectorResult } from '../../Types/Domains';
import { ILogger } from '../../Interfaces';
export default class DomainsClient implements IDomainsClient {
    request: Request;
    domainCredentials: IDomainCredentials;
    domainTemplates: IDomainTemplatesClient;
    domainTags: IDomainTagsClient;
    private logger;
    constructor(request: Request, domainCredentialsClient: DomainCredentialsClient, domainTemplatesClient: DomainTemplatesClient, domainTagsClient: DomainTagsClient, logger?: ILogger);
    private _handleBoolValues;
    private _parseMessage;
    private parseDomainList;
    private _parseDomain;
    private _parseTrackingSettings;
    private _parseTrackingUpdate;
    private _isOpenTrackingInfoWitPlace;
    list(query?: DomainsQuery): Promise<TDomain[]>;
    get(domain: string, query?: DomainGetQuery): Promise<TDomain>;
    create(data: DomainInfo): Promise<TDomain>;
    update(domain: string, data: DomainUpdateInfo): Promise<TDomain>;
    verify(domain: string): Promise<TDomain>;
    destroy(domain: string): Promise<MessageResponse>;
    getConnection(domain: string): Promise<ConnectionSettings>;
    updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings>;
    getTracking(domain: string): Promise<DomainTrackingData>;
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
