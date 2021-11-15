/* eslint-disable camelcase */
import urljoin from 'url-join';
import {
  DomainResponseData,
  DestroyedDomainResponse,
  DomainsQuery,
  DomainInfo,
  DomainListResponseData,
  DomainShortData,
  DNSRecord,
  ConnectionSettingsResponse,
  ConnectionSettings,
  UpdatedConnectionSettings,
  UpdatedConnectionSettingsRes,
  DKIMAuthorityInfo,
  UpdatedDKIMAuthority,
  UpdatedDKIMAuthorityResponse,
  DKIMSelectorInfo,
  UpdatedDKIMSelectorResponse,
  WebPrefixInfo,
  UpdatedWebPrefixResponse,
  ReplacementForPool,
  MessageResponse,
} from './interfaces/Domains';

import APIResponse from './interfaces/ApiResponse';
import APIError from './error';
import APIErrorOptions from './interfaces/APIErrorOptions';

import Request from './request';
import {
  DomainTrackingResponse,
  DomainTrackingData,
  OpenTrackingInfo,
  ClickTrackingInfo,
  UnsubscribeTrackingInfo,
  UpdateDomainTrackingResponse,
  UpdatedOpenTracking
} from './interfaces/DomainTracking';
import DomainCredentialsClient from './domainsCredentials';

export class Domain {
  name: string;
  require_tls: boolean;
  skip_verification: boolean;
  state: string;
  wildcard: boolean;
  spam_action: string;
  created_at: string;
  smtp_password: string;
  smtp_login: string;
  type: string;
  receiving_dns_records: DNSRecord[] | null;
  sending_dns_records: DNSRecord[] | null;

  constructor(data: DomainShortData, receiving?: DNSRecord[] | null, sending?: DNSRecord[] | null) {
    this.name = data.name;
    this.require_tls = data.require_tls;
    this.skip_verification = data.skip_verification;
    this.state = data.state;
    this.wildcard = data.wildcard;
    this.spam_action = data.spam_action;
    this.created_at = data.created_at;
    this.smtp_password = data.smtp_password;
    this.smtp_login = data.smtp_login;
    this.type = data.type;

    this.receiving_dns_records = receiving || null;
    this.sending_dns_records = sending || null;
  }
}

export default class DomainClient {
  request: Request;
  public domainCredentials: DomainCredentialsClient;

  constructor(request: Request, domainCredentialsClient: DomainCredentialsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
  }

  private _parseMessage(response: DestroyedDomainResponse) : MessageResponse {
    return response.body;
  }

  private _parseDomainList(response: DomainListResponseData): Domain[] {
    return response.body.items.map(function (item) {
      return new Domain(item);
    });
  }

  private _parseDomain(response: DomainResponseData): Domain {
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

  list(query?: DomainsQuery): Promise<Domain[]> {
    return this.request.get('/v3/domains', query)
      .then((res : APIResponse) => this._parseDomainList(res as DomainListResponseData));
  }

  get(domain: string) : Promise<Domain> {
    return this.request.get(`/v3/domains/${domain}`)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  create(data: DomainInfo) : Promise<Domain> {
    const postObj = { ...data };
    if ('force_dkim_authority' in postObj && typeof postObj.force_dkim_authority === 'boolean') {
      postObj.force_dkim_authority = postObj.toString() === 'true' ? 'true' : 'false';
    }

    return this.request.postWithFD('/v3/domains', postObj)
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
      throw new APIError({ status: 400, statusText: '', body: { message: 'Property "active" must contain string value.' } } as APIErrorOptions);
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

  linkIpPool(domain: string, pool_id: string): Promise<APIResponse> {
    return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { pool_id });
  }

  unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse> {
    let searchParams = '';
    if (replacement.pool_id && replacement.ip) {
      throw new APIError({ status: 400, statusText: '', body: { message: 'Please specify either pool_id or ip (not both)' } } as APIErrorOptions);
    } else if (replacement.pool_id) {
      searchParams = `?pool_id=${replacement.pool_id}`;
    } else if (replacement.ip) {
      searchParams = `?ip=${replacement.ip}`;
    }
    return this.request.delete(urljoin('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
  }

  updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority> {
    return this.request.put(`/v3/domains/${domain}/dkim_authority`, {}, { query: `self=${data.self}` })
      .then((res : APIResponse) => res)
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
