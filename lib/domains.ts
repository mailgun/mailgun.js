import urljoin from 'url-join';
import Request from './request';

interface DomainData {
  name: string;
  require_tls: any;
  skip_verification: any;
  state: any;
  wildcard: any;
  spam_action: any;
  created_at: string | Date;
  smtp_password: string;
  smtp_login: string;
  type: string;
}

class Domain {
  name: any;
  require_tls: any;
  skip_verification: any;
  state: any;
  wildcard: any;
  spam_action: any;
  created_at: any;
  smtp_password: any;
  smtp_login: any;
  type: any;
  receiving_dns_records: any;
  sending_dns_records: any;

  constructor(data: DomainData, receiving?: any, sending?: any) {
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

  _parseMessage(response: { body: any }) {
    return response.body;
  }

  _parseDomainList(response: { body: { items: DomainData[] } }) {
    return response.body.items.map(function (item) {
      return new Domain(item);
    });
  }

  _parseDomain(response: {
    body: {
      domain: any,
      receiving_dns_records: any,
      sending_dns_records: any
    }
  }) {
    return new Domain(
      response.body.domain,
      response.body.receiving_dns_records,
      response.body.sending_dns_records
    );
  }

  _parseTrackingSettings(response: { body: { tracking: any } }) {
    return response.body.tracking;
  }

  _parseTrackingUpdate(response: { body: any }) {
    return response.body;
  }

  list(query: any) {
    return this.request.get('/v2/domains', query)
      .then(this._parseDomainList);
  }

  get(domain: string) {
    return this.request.get(`/v2/domains/${domain}`)
      .then(this._parseDomain);
  }

  create(data: any) {
    return this.request.post('/v2/domains', data)
      .then(this._parseDomain);
  }

  destroy(domain: string) {
    return this.request.delete(`/v2/domains/${domain}`)
      .then(this._parseMessage);
  }

  // Tracking

  getTracking(domain: string) {
    return this.request.get(urljoin('/v2/domains', domain, 'tracking'))
      .then(this._parseTrackingSettings);
  }

  updateTracking(domain: string, type: string, data: any) {
    return this.request.put(urljoin('/v2/domains', domain, 'tracking', type), data)
      .then(this._parseTrackingUpdate);
  }

  // IPs

  getIps(domain: string) {
    return this.request.get(urljoin('/v2/domains', domain, 'ips'))
      .then((response: { body: { items: string[] } }) => response?.body?.items);
  }

  assignIp(domain: string, ip: string) {
    return this.request.post(urljoin('/v2/domains', domain, 'ips'), { ip });
  }

  deleteIp(domain: string, ip: string) {
    return this.request.delete(urljoin('/v2/domains', domain, 'ips', ip));
  }

  linkIpPool(domain: string, pool_id: string) {
    return this.request.post(urljoin('/v2/domains', domain, 'ips'), { pool_id });
  }

  unlinkIpPoll(domain: string, pool_id: string, ip: string) {
    return this.request.delete(urljoin('/v2/domains', domain, 'ips', 'ip_pool'), { pool_id, ip });
  }
}
