import urljoin from 'url-join';
import {
  IDomainTemplatesClient,
  IDomainTagsClient,
  IDomainCredentials,
  IDomainsClient
} from '../../Interfaces/Domains';

import { APIResponse } from '../../Types/Common/ApiResponse';
import APIError from '../common/Error';
import Request from '../common/Request';

import DomainCredentialsClient from './domainsCredentials';
import DomainTemplatesClient from './domainsTemplates';
import DomainTagsClient from './domainsTags';
import {
  DestroyedDomainResponse,
  MessageResponse,
  DomainListResponseData,
  DomainResponseData,
  DomainTrackingResponse,
  DomainTrackingData,
  UpdateDomainTrackingResponse,
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
  UpdatedDKIMAuthorityResponse,
  DKIMSelectorInfo,
  UpdatedDKIMSelectorResponse,
  WebPrefixInfo,
  UpdatedWebPrefixResponse,
  TDomain,
  DomainUpdateInfo,
  DomainUpdateInfoReq,
  DomainInfoReq,
  BoolToString,
  DomainGetQuery,
  UpdatedDKIMSelectorResult,
} from '../../Types/Domains';
import Domain from './domain';
import { ILogger } from '../../Interfaces';

export default class DomainsClient implements IDomainsClient {
  request: Request;
  public domainCredentials: IDomainCredentials;
  public domainTemplates: IDomainTemplatesClient;
  public domainTags: IDomainTagsClient;
  private logger: ILogger;

  constructor(
    request: Request,
    domainCredentialsClient: DomainCredentialsClient,
    domainTemplatesClient: DomainTemplatesClient,
    domainTagsClient: DomainTagsClient,
    logger: ILogger = console
  ) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
    this.logger = logger;
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

  private _parseTrackingSettings(response: DomainTrackingResponse) : DomainTrackingData {
    return response.body.tracking;
  }

  private _parseTrackingUpdate(response: UpdateDomainTrackingResponse) :UpdatedOpenTracking {
    return response.body;
  }

  private _isOpenTrackingInfoWitPlace(obj: unknown): obj is OpenTrackingInfo {
    return typeof obj === 'object' && 'place_at_the_top' in (obj as OpenTrackingInfo);
  }

  list(query?: DomainsQuery): Promise<TDomain[]> {
    return this.request.get('/v4/domains', query)
      .then((res : APIResponse) => this.parseDomainList(res as DomainListResponseData));
  }

  get(domain: string, query?: DomainGetQuery) : Promise<TDomain> {
    const preparedQuery = query ? {
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

  getTracking(domain: string) : Promise<DomainTrackingData> {
    return this.request.get(urljoin('/v3/domains', domain, 'tracking'))
      .then(this._parseTrackingSettings);
  }

  updateTracking(
    domain: string,
    type: string,
    data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo
  ): Promise<UpdatedOpenTracking> {
    const preparedData: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo = {
      ...data
    };
    if (typeof data?.active === 'boolean') {
      preparedData.active = (data?.active) ? 'yes' : 'no';
    }

    if (this._isOpenTrackingInfoWitPlace(data)) {
      if (typeof data?.place_at_the_top === 'boolean') {
        (preparedData as OpenTrackingInfo).place_at_the_top = (data?.place_at_the_top) ? 'yes' : 'no';
      }
    }
    return this.request.putWithFD(urljoin('/v3/domains', domain, 'tracking', type), preparedData)
      .then((res : APIResponse) => this._parseTrackingUpdate(res as UpdateDomainTrackingResponse));
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

  updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority> {
    return this.request.put(`/v3/domains/${domain}/dkim_authority`, {}, { query: `self=${data.self}` })
      .then((res : APIResponse) => res as UpdatedDKIMAuthorityResponse)
      .then((res : UpdatedDKIMAuthorityResponse) => res.body as UpdatedDKIMAuthority);
  }

  async updateDKIMSelector(
    domain: string,
    data: DKIMSelectorInfo
  ): Promise<UpdatedDKIMSelectorResult> {
    const res: UpdatedDKIMSelectorResponse = await this.request.put(`/v3/domains/${domain}/dkim_selector`, {}, { query: `dkim_selector=${data.dkimSelector}` });

    return {
      status: res.status,
      message: res?.body?.message
    };
  }

  /**
  * @deprecated "domains.updateWebPrefix" method is deprecated.
  * Please use domains.update to set new "web_prefix".
  * Current method will be removed in the future releases.
  */
  updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse> {
    this.logger.warn('"domains.updateWebPrefix" method is deprecated, please use domains.update to set new "web_prefix". Current method will be removed in the future releases.');
    return this.request.put(`/v3/domains/${domain}/web_prefix`, {}, { query: `web_prefix=${data.webPrefix}` })
      .then((res : APIResponse) => res as UpdatedWebPrefixResponse);
  }
}
