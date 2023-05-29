import urljoin from 'url-join';
import {
  IDomainTemplatesClient,
  IDomainTagsClient,
  IDomainCredentials,
  IDomainsClient
} from '../../Interfaces/Domains';

import { APIResponse } from '../../Types/Common/ApiResponse';
import APIError from '../common/Error';
import { APIErrorOptions } from '../../Types/Common';

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
} from '../../Types/Domains';
import Domain from './domain';

export default class DomainsClient implements IDomainsClient {
  request: Request;
  public domainCredentials: IDomainCredentials;
  public domainTemplates: IDomainTemplatesClient;
  public domainTags: IDomainTagsClient;

  constructor(
    request: Request,
    domainCredentialsClient: DomainCredentialsClient,
    domainTemplatesClient: DomainTemplatesClient,
    domainTagsClient: DomainTagsClient
  ) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
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

  list(query?: DomainsQuery): Promise<TDomain[]> {
    return this.request.get('/v3/domains', query)
      .then((res : APIResponse) => this.parseDomainList(res as DomainListResponseData));
  }

  get(domain: string) : Promise<TDomain> {
    return this.request.get(`/v3/domains/${domain}`)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  create(data: DomainInfo) : Promise<TDomain> {
    const postObj = { ...data };
    if ('force_dkim_authority' in postObj && typeof postObj.force_dkim_authority === 'boolean') {
      postObj.force_dkim_authority = postObj.force_dkim_authority.toString() === 'true' ? 'true' : 'false';
    }

    return this.request.postWithFD('/v3/domains', postObj)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  verify(domain: string): Promise<TDomain> {
    return this.request.put(`/v3/domains/${domain}/verify`)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  destroy(domain: string): Promise<MessageResponse> {
    return this.request.delete(`/v3/domains/${domain}`)
      .then((res : APIResponse) => this._parseMessage(res as DestroyedDomainResponse));
  }

  getConnection(domain: string): Promise<ConnectionSettings> {
    return this.request.get(`/v3/domains/${domain}/connection`)
      .then((res : APIResponse) => res as ConnectionSettingsResponse)
      .then((res:ConnectionSettingsResponse) => res.body.connection as ConnectionSettings);
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
    if (typeof data?.active === 'boolean') {
      throw new APIError({ status: 400, statusText: 'Received boolean value for active property', body: { message: 'Property "active" must contain string value.' } } as APIErrorOptions);
    }
    return this.request.putWithFD(urljoin('/v3/domains', domain, 'tracking', type), data)
      .then((res : APIResponse) => this._parseTrackingUpdate(res as UpdateDomainTrackingResponse));
  }

  // IPs

  getIps(domain: string): Promise<string[]> {
    return this.request.get(urljoin('/v3/domains', domain, 'ips'))
      .then((response: APIResponse) => response?.body?.items);
  }

  assignIp(domain: string, ip: string): Promise<APIResponse> {
    return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { ip });
  }

  deleteIp(domain: string, ip: string): Promise<APIResponse> {
    return this.request.delete(urljoin('/v3/domains', domain, 'ips', ip));
  }

  linkIpPool(domain: string, poolId: string): Promise<APIResponse> {
    return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { pool_id: poolId });
  }

  unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse> {
    let searchParams = '';
    if (replacement.pool_id && replacement.ip) {
      throw new APIError(
        {
          status: 400,
          statusText: 'Too much data for replacement',
          body: { message: 'Please specify either pool_id or ip (not both)' }
        } as APIErrorOptions
      );
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

  updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResponse> {
    return this.request.put(`/v3/domains/${domain}/dkim_selector`, {}, { query: `dkim_selector=${data.dkimSelector}` })
      .then((res : APIResponse) => res as UpdatedDKIMSelectorResponse);
  }

  updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse> {
    return this.request.put(`/v3/domains/${domain}/web_prefix`, {}, { query: `web_prefix=${data.webPrefix}` })
      .then((res : APIResponse) => res as UpdatedWebPrefixResponse);
  }
}
