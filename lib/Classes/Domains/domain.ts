import {
  DNSRecord,
  DomainData,
  DomainShortData,
  TDomain
} from '../../Types/Domains';

/* eslint-disable camelcase */
export default class Domain implements TDomain {
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
  id?: string;
  is_disabled?: boolean;
  web_prefix?: string;
  web_scheme?: string;

  constructor(
    data: DomainShortData | DomainData,
    receiving?: DNSRecord[] | null,
    sending?: DNSRecord[] | null
  ) {
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
    /*
      domain list has shorter response then get, create, and update methods.
    */

    const dynamicKeys: (keyof DomainData)[] = ['id', 'is_disabled', 'web_prefix', 'web_scheme'];

    const dynamicProperties = dynamicKeys.reduce((acc, propertyName) => {
      if (propertyName in data) {
        const prop = propertyName as keyof Domain;
        acc[prop] = (data as DomainData)[propertyName];
      }
      return acc;
    }, {} as Record<keyof Domain, string | boolean>);
    Object.assign(this, dynamicProperties);
  }
}
