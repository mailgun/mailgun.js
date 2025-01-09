import {
  DNSRecord,
  DomainData,
  DomainDynamicPropsType,
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
  created_at: Date;
  smtp_password: string;
  smtp_login: string;
  type: string;
  receiving_dns_records: DNSRecord[] | null;
  sending_dns_records: DNSRecord[] | null;
  id: string;
  is_disabled: boolean;
  web_prefix: string;
  web_scheme: string;
  use_automatic_sender_security: boolean;
  dkim_host?: string;
  mailfrom_host?: string;

  constructor(
    data: DomainData,
    receiving?: DNSRecord[] | null,
    sending?: DNSRecord[] | null
  ) {
    this.name = data.name;
    this.require_tls = data.require_tls;
    this.skip_verification = data.skip_verification;
    this.state = data.state;
    this.wildcard = data.wildcard;
    this.spam_action = data.spam_action;
    this.created_at = new Date(data.created_at);
    this.smtp_password = data.smtp_password;
    this.smtp_login = data.smtp_login;
    this.type = data.type;
    this.receiving_dns_records = receiving || null;
    this.sending_dns_records = sending || null;
    this.id = data.id;
    this.is_disabled = data.is_disabled;
    this.web_prefix = data.web_prefix;
    this.web_scheme = data.web_scheme;
    this.use_automatic_sender_security = data.use_automatic_sender_security;

    /*
      domain get and update methods may have richer response than create method.
    */
    const dynamicKeys: (keyof DomainDynamicPropsType)[] = ['dkim_host', 'mailfrom_host'];

    const dynamicProperties = dynamicKeys.reduce((acc, propertyName) => {
      if (data[propertyName]) {
        const prop = propertyName as keyof DomainDynamicPropsType;
        acc[prop] = data[propertyName];
      }
      return acc;
    }, {} as DomainDynamicPropsType);
    Object.assign(this, dynamicProperties);
  }
}
