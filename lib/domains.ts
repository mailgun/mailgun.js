/* eslint-disable camelcase */
import urljoin from 'url-join';
import {
  DomainResponseData,
  DestroyedDomain,
  DestroyedDomainResponse,
  DomainsQuery,
  DomainInfo,
  DomainListResponseData,
  DomainShortData,
  DNSRecord
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

class Domain {
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

  constructor(request: Request) {
    this.request = request;
  }

  _parseMessage(response: DestroyedDomainResponse) : DestroyedDomain {
    return response.body;
  }

  _parseDomainList(response: DomainListResponseData): Domain[] {
    return response.body.items.map(function (item) {
      return new Domain(item);
    });
  }

  _parseDomain(response: DomainResponseData): Domain {
    return new Domain(
      response.body.domain,
      response.body.receiving_dns_records,
      response.body.sending_dns_records
    );
  }

  _parseTrackingSettings(response: DomainTrackingResponse) : DomainTrackingData {
    return response.body.tracking;
  }

  _parseTrackingUpdate(response: UpdateDomainTrackingResponse) :UpdatedOpenTracking {
    return response.body;
  }

  list(query: DomainsQuery): Promise<Domain[]> {
    return this.request.get('/v2/domains', query)
      .then((res : APIResponse) => this._parseDomainList(res as DomainListResponseData));
  }

  get(domain: string) : Promise<Domain> {
    return this.request.get(`/v2/domains/${domain}`)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  create(data: DomainInfo) : Promise<Domain> {
    return this.request.postWithFD('/v2/domains', data)
      .then((res : APIResponse) => this._parseDomain(res as DomainResponseData));
  }

  destroy(domain: string): Promise<DestroyedDomain> {
    return this.request.delete(`/v2/domains/${domain}`)
      .then((res : APIResponse) => this._parseMessage(res as DestroyedDomainResponse));
  }

  // Tracking

  getTracking(domain: string) : Promise<DomainTrackingData> {
    return this.request.get(urljoin('/v2/domains', domain, 'tracking'))
      .then(this._parseTrackingSettings);
  }

  updateTracking(
    domain: string,
    type: string,
    data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo
  ): Promise<UpdatedOpenTracking> {
    if (!('html_footer' in data) && !('text_footer' in data) && typeof data?.active === 'boolean') {
      throw new APIError({ status: 400, statusText: '', body: { message: 'Value "active" must contain string value.' } } as APIErrorOptions);
    }
    return this.request.putWithFD(urljoin('/v2/domains', domain, 'tracking', type), data)
      .then(this._parseTrackingUpdate);
  }

  // IPs

  getIps(domain: string): Promise<string[]> {
    return this.request.get(urljoin('/v2/domains', domain, 'ips'))
      .then((response: APIResponse) => response?.body?.items);
  }

  assignIp(domain: string, ip: string): Promise<APIResponse> {
    return this.request.postWithFD(urljoin('/v2/domains', domain, 'ips'), { ip });
  }

  deleteIp(domain: string, ip: string): Promise<APIResponse> {
    return this.request.delete(urljoin('/v2/domains', domain, 'ips', ip));
  }

  linkIpPool(domain: string, pool_id: string): Promise<APIResponse> {
    return this.request.postWithFD(urljoin('/v2/domains', domain, 'ips'), { pool_id });
  }

  unlinkIpPoll(domain: string, pool_id: string, ip: string): Promise<APIResponse> {
    return this.request.delete(urljoin('/v2/domains', domain, 'ips', 'ip_pool'), { pool_id, ip });
  }
}
