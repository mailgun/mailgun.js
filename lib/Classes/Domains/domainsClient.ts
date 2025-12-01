import urljoin from 'url-join';
import {
  IDomainTemplatesClient,
  IDomainTagsClient,
  IDomainCredentials,
  IDomainsClient,
  IDomainKeysClient
} from '../../Interfaces/Domains/index.js';

import { APIResponse } from '../../Types/Common/ApiResponse.js';
import APIError from '../common/Error.js';
import Request from '../common/Request.js';

import {
  DestroyedDomainResponse,
  MessageResponse,
  DomainListResponseData,
  DomainResponseData,
  DomainTrackingData,
  UpdatedOpenTracking,
  DomainsQuery,
  DomainInfo,
  ConnectionSettings,
  ConnectionSettingsResponse,
  UpdatedConnectionSettings,
  UpdatedConnectionSettingsRes,
  OpenTrackingInfo,
  ClickTrackingInfo,
  UnsubscribeTrackingInfo,
  ReplacementForPool,
  DKIMAuthorityInfo,
  UpdatedDKIMAuthority,
  DKIMSelectorInfo,
  WebPrefixInfo,
  UpdatedWebPrefixResponse,
  TDomain,
  DomainUpdateInfo,
  DomainUpdateInfoReq,
  DomainInfoReq,
  BoolToString,
  DomainGetQuery,
  UpdatedDKIMSelectorResult,
  DomainGetAPIQuery,
} from '../../Types/Domains/index.js';
import Domain from './domain.js';
import { ILogger, IDomainTrackingClient } from '../../Interfaces/index.js';
import { PutOptionsType } from '../../Types/index.js';

export default class DomainsClient implements IDomainsClient {
  request: Request;
  public domainCredentials: IDomainCredentials;
  public domainTemplates: IDomainTemplatesClient;
  public domainTags: IDomainTagsClient;
  public domainTracking: IDomainTrackingClient;
  public domainKeys: IDomainKeysClient;
  private logger: ILogger;

  constructor(
    request: Request,
    domainCredentialsClient: IDomainCredentials,
    domainTemplatesClient: IDomainTemplatesClient,
    domainTagsClient: IDomainTagsClient,
    domainTracking: IDomainTrackingClient,
    domainKeysClient: IDomainKeysClient,
    logger: ILogger = console
  ) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
    this.logger = logger;
    this.domainTracking = domainTracking;
    this.domainKeys = domainKeysClient;
  }

  private _handleBoolValues(
    data: DomainInfo | DomainUpdateInfo
  ): DomainInfoReq | DomainUpdateInfoReq {
    const propsForReplacement = data as BoolToString;
    const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
      const prop = key as keyof BoolToString;
      if (typeof propsForReplacement[prop] === 'boolean') {
        const value = propsForReplacement[prop] as boolean;
        acc[prop] = (value.toString() === 'true') ? 'true' : 'false';
      }
      return acc;
    }, {} as Record<keyof BoolToString, 'true'| 'false'>);
    return { ...data, ...replacedProps } as DomainUpdateInfoReq | DomainInfoReq;
  }

  private _parseMessage(response: DestroyedDomainResponse) : MessageResponse {
    return response.body;
  }

  private parseDomainList(response: DomainListResponseData): TDomain[] {
    if (response.body && response.body.items) {
      return response.body.items.map(function (item) {
        return new Domain(item);
      });
    }
    return [];
  }

  private _parseDomain(response: DomainResponseData): TDomain {
    return new Domain(
      response.body.domain,
      response.body.receiving_dns_records,
      response.body.sending_dns_records
    );
  }

  list(query?: DomainsQuery): Promise<TDomain[]> {
    return this.request.get('/v4/domains', query)
      .then((res : APIResponse) => this.parseDomainList(res as DomainListResponseData));
  }

  get(domain: string, query?: DomainGetQuery) : Promise<TDomain> {
    const preparedQuery: DomainGetAPIQuery = query ? {
      'h:extended': query?.extended ?? false,
      'h:with_dns': query?.with_dns ?? true,
    } : {};
    return this.request.get(`/v4/domains/${domain}`, preparedQuery)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  create(data: DomainInfo) : Promise<TDomain> {
    const postObj = this._handleBoolValues(data);
    return this.request.postWithFD('/v4/domains', postObj)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  update(domain: string, data: DomainUpdateInfo) : Promise<TDomain> {
    const putData = this._handleBoolValues(data);
    return this.request.putWithFD(`/v4/domains/${domain}`, putData)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  verify(domain: string): Promise<TDomain> {
    return this.request.put(`/v4/domains/${domain}/verify`)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  destroy(domain: string): Promise<MessageResponse> {
    return this.request.delete(`/v3/domains/${domain}`)
      .then((res : APIResponse) => this._parseMessage(res as DestroyedDomainResponse));
  }

  getConnection(domain: string): Promise<ConnectionSettings> {
    return this.request.get(`/v3/domains/${domain}/connection`)
      .then((res : APIResponse) => res as ConnectionSettingsResponse)
      .then((res:ConnectionSettingsResponse) => res.body as ConnectionSettings);
  }

  updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings> {
    return this.request.put(`/v3/domains/${domain}/connection`, data)
      .then((res : APIResponse) => res as UpdatedConnectionSettingsRes)
      .then((res:UpdatedConnectionSettingsRes) => res.body as UpdatedConnectionSettings);
  }

  // Tracking
  /**
  * @deprecated 'domains.getTracking' method is deprecated, and will be removed.
  * Please use 'domains.domainTracking.getTracking' instead.
  */

  getTracking(domain: string) : Promise<DomainTrackingData> {
    this.logger.warn(`
      'domains.getTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.getTracking' instead.
    `);
    return this.domainTracking.getTracking(domain);
  }

  /**
  * @deprecated 'domains.updateTracking' method is deprecated, and will be removed.
  * Please use 'domains.domainTracking.updateTracking' instead.
  */
  updateTracking(
    domain: string,
    type: string,
    data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo
  ): Promise<UpdatedOpenTracking> {
    this.logger.warn(`
      'domains.updateTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.updateTracking' instead.
    `);
    return this.domainTracking.updateTracking(domain, type, data);
  }

  // IPs
  /**
  * @deprecated "domains.getIps" method is deprecated, and will be removed in the future releases.
  */
  getIps(domain: string): Promise<string[]> {
    this.logger.warn('"domains.getIps" method is deprecated and will be removed in the future releases.');
    return this.request.get(urljoin('/v3/domains', domain, 'ips'))
      .then((response: APIResponse) => response?.body?.items);
  }

  /**
  * @deprecated "domains.assignIp" method is deprecated, and will be removed in the future releases.
  */
  assignIp(domain: string, ip: string): Promise<APIResponse> {
    this.logger.warn('"domains.assignIp" method is deprecated and will be removed in the future releases.');
    return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { ip });
  }

  /**
  * @deprecated "domains.deleteIp" method is deprecated, and will be moved to the IpsClient.
  */
  deleteIp(domain: string, ip: string): Promise<APIResponse> {
    this.logger.warn('"domains.deleteIp" method is deprecated and will be moved into the IpsClient in the future releases.');
    return this.request.delete(urljoin('/v3/domains', domain, 'ips', ip));
  }

  /**
  * @deprecated "domains.linkIpPool" method is deprecated, and will be removed
  * in the future releases.
  */
  linkIpPool(domain: string, poolId: string): Promise<APIResponse> {
    this.logger.warn('"domains.linkIpPool" method is deprecated, and will be removed in the future releases.');
    return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { pool_id: poolId });
  }

  /**
  * @deprecated "domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient
  * in the future releases.
  */
  unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse> {
    this.logger.warn('"domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient in the future releases.');
    let searchParams = '';
    if (replacement.pool_id && replacement.ip) {
      throw APIError.getUserDataError('Too much data for replacement', 'Please specify either pool_id or ip (not both)');
    } else if (replacement.pool_id) {
      searchParams = `?pool_id=${replacement.pool_id}`;
    } else if (replacement.ip) {
      searchParams = `?ip=${replacement.ip}`;
    }
    return this.request.delete(urljoin('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
  }

  /**
  * @deprecated "domains.updateDKIMAuthority" method is deprecated,
  * and moved into the "domains.domainKeys.updateDKIMAuthority".
  * Current method will be removed in the future releases.
  */
  updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority> {
    this.logger.warn('"domains.updateDKIMAuthority" method is deprecated. Please use "domains.domainKeys.updateDKIMAuthority" instead');
    return this.domainKeys.updateDKIMAuthority(domain, data);
  }

  /**
  * @deprecated "domains.updateDKIMSelector" method is deprecated,
  * and moved into the "domains.domainKeys.updateDKIMSelector".
  * Current method will be removed in the future releases.
  */
  async updateDKIMSelector(
    domain: string,
    data: DKIMSelectorInfo
  ): Promise<UpdatedDKIMSelectorResult> {
    this.logger.warn('"domains.updateDKIMSelector" method is deprecated. Please use domains.domainKeys.updateDKIMSelector instead');
    return this.domainKeys.updateDKIMSelector(domain, data);
  }

  /**
  * @deprecated "domains.updateWebPrefix" method is deprecated.
  * Please use domains.update to set new "web_prefix".
  * Current method will be removed in the future releases.
  */
  updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse> {
    this.logger.warn('"domains.updateWebPrefix" method is deprecated, please use domains.update to set new "web_prefix". Current method will be removed in the future releases.');
    const options: PutOptionsType = { query: `web_prefix=${data.webPrefix}` };
    return this.request.put(`/v3/domains/${domain}/web_prefix`, {}, options)
      .then((res : APIResponse) => res as UpdatedWebPrefixResponse);
  }
}
