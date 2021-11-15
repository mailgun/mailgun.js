import formData from 'form-data';

import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/request';
import DomainClient, { Domain } from '../lib/domains';
import RequestOptions from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import DomainCredentialsClient from '../lib/domainsCredentials';
import {
  ConnectionSettings,
  MessageResponse,
  UpdatedConnectionSettings,
  UpdatedDKIMAuthority,
  UpdatedDKIMSelectorResponse, UpdatedWebPrefixResponse
} from '../lib/interfaces/Domains';

// TODO: fix types
describe('DomainClient', function () {
  let client: DomainClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const domainCredentialsClient = new DomainCredentialsClient(reqObject);
    client = new DomainClient(reqObject, domainCredentialsClient);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all domains', function () {
      const domains = [{
        created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
        name: 'testing.example.com',
        smtp_login: 'postmaster@testing.example.com',
        smtp_password: 'password',
        spam_action: 'disabled',
        state: 'unverified',
        type: 'custom',
        wildcard: true,
        skip_verification: true,
        require_tls: true
      }];

      api.get('/v3/domains').reply(200, {
        items: domains
      });

      return client.list().then(function (dm: Domain[]) {
        dm[0].should.eql({
          created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
          name: 'testing.example.com',
          receiving_dns_records: null,
          require_tls: true,
          sending_dns_records: null,
          skip_verification: true,
          smtp_login: 'postmaster@testing.example.com',
          smtp_password: 'password',
          spam_action: 'disabled',
          state: 'unverified',
          type: 'custom',
          wildcard: true
        });
      });
    });
  });

  describe('get', function () {
    it('gets a specific domain and populates dns records', function () {
      const domainData = {
        created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
        name: 'testing.example.com',
        smtp_login: 'postmaster@testing.example.com',
        smtp_password: 'password',
        spam_action: 'disabled',
        state: 'unverified',
        type: 'custom',
        wildcard: true,
        skip_verification: true,
        require_tls: true
      };

      api.get('/v3/domains/testing.example.com').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });

      return client.get('testing.example.com').then(function (domain: Domain) {
        domain.should.eql({
          created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
          name: 'testing.example.com',
          receiving_dns_records: [],
          require_tls: true,
          sending_dns_records: [],
          skip_verification: true,
          smtp_login: 'postmaster@testing.example.com',
          smtp_password: 'password',
          spam_action: 'disabled',
          state: 'unverified',
          type: 'custom',
          wildcard: true
        });
      });
    });
  });

  describe('create', function () {
    it('creates a domain', function () {
      const domainData = {
        created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
        name: 'another.example.com',
        smtp_login: 'postmaster@another.example.com',
        smtp_password: 'password',
        spam_action: 'disabled',
        state: 'unverified',
        type: 'custom',
        wildcard: true,
        skip_verification: true,
        require_tls: true
      };

      api.post('/v3/domains').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });

      return client.create({
        name: 'another.example.com',
        smtp_password: 'smtp_password',
        web_scheme: 'https'
      }).then(function (domain: Domain) {
        domain.should.eql({
          created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
          name: 'another.example.com',
          receiving_dns_records: [],
          require_tls: true,
          sending_dns_records: [],
          skip_verification: true,
          smtp_login: 'postmaster@another.example.com',
          smtp_password: 'password',
          spam_action: 'disabled',
          state: 'unverified',
          type: 'custom',
          wildcard: true
        });
      });
    });
  });

  describe('destroy', function () {
    it('deletes a domain', function () {
      api.delete('/v3/domains/test.example.com').reply(200, {
        message: 'domain deleted'
      });

      return client.destroy('test.example.com').then(function (data: MessageResponse) {
        data.should.eql({
          message: 'domain deleted'
        });
      });
    });
  });

  describe('getConnection', function () {
    it('returns connection settings for the defined domain', function () {
      api.get('/v3/domains/test.example.com/connection').reply(200, {
        connection: { require_tls: false, skip_verification: false }
      });

      return client.getConnection('test.example.com').then(function (data: ConnectionSettings) {
        data.should.eql({ require_tls: false, skip_verification: false });
      });
    });
  });

  describe('updateConnection', function () {
    it('Updates the connection settings for the defined domain.', function () {
      api.put('/v3/domains/test.example.com/connection').reply(200, {
        connection: {
          message: 'Domain connection settings have been updated, may take 10 minutes to fully propagate',
          require_tls: false,
          skip_verification: false
        }
      });

      return client.updateConnection('test.example.com', {
        require_tls: true,
        skip_verification: true
      }).then(function (data: UpdatedConnectionSettings) {
        data.should.eql({
          connection: {
            message: 'Domain connection settings have been updated, may take 10 minutes to fully propagate',
            require_tls: false,
            skip_verification: false
          }
        });
      });
    });
  });

  describe('getTracking', function () {
    it('fetches all tracking settings', function () {
      api.get('/v3/domains/domain.com/tracking').reply(200, {
        tracking: {
          open: { active: true },
          click: { active: true },
          unsubscribe: { active: true, html_footer: 'html', text_footer: 'text' }
        }
      });

      return client.getTracking('domain.com').then(function (tracking: { open: { active: boolean } }) {
        tracking.open.should.eql({ active: true });
      });
    });
  });

  describe('updateTracking', function () {
    it('updates tracking settings', async function () {
      const open = { active: true };
      api.put('/v3/domains/domain.com/tracking/open').reply(200, {
        message: 'Tracking settings have been updated',
        open
      });

      const res = await client.updateTracking('domain.com', 'open', { active: 'yes' });

      expect(res).to.eql({
        message: 'Tracking settings have been updated',
        open: {
          active: true
        }
      });
    });
  });

  describe('getIps', () => {
    it('should return list of dedicated ips', () => {
      const items = ['192.161.0.1', '192.168.0.2'];
      api.get('/v3/domains/domain.com/ips').reply(200, { items });

      return client.getIps('domain.com').then((response: string[]) => {
        response.should.eql(items);
      });
    });
  });

  describe('updateDKIMAuthority', () => {
    it('changes the DKIM authority for a domain.', () => {
      const expectedRes = {
        changed: true,
        message: 'Domain DKIM authority has been changed',
        sending_dns_records: [
          {
            cached: ['a'],
            name: 'test.example.com',
            record_type: 'record_type',
            valid: 'valid',
            value: 'value'
          }
        ]
      };

      api.put('/v3/domains/test.example.com/dkim_authority?self=true').reply(200, expectedRes);

      return client.updateDKIMAuthority('test.example.com', { self: 'true' }).then((response: UpdatedDKIMAuthority) => {
        response.should.eql(expectedRes);
      });
    });
  });

  describe('updateDKIMSelector', () => {
    it('updates the DKIM selector for a domains', () => {
      api.put('/v3/domains/test.example.com/dkim_selector?dkim_selector=dkim_selector_value').reply(200, { message: 'Domain DKIM selector updated' });

      return client.updateDKIMSelector('test.example.com', { dkimSelector: 'dkim_selector_value' }).then((response: UpdatedDKIMSelectorResponse) => {
        response.should.eql(
          {
            body: { message: 'Domain DKIM selector updated' }, status: 200
          }
        );
      });
    });
  });

  describe('updateWebPrefix', () => {
    it('Update the CNAME used for tracking opens and clicks', () => {
      api.put('/v3/domains/test.example.com/web_prefix?web_prefix=webprefixvalue').reply(200, { message: 'Domain web prefix updated' });

      return client.updateWebPrefix('test.example.com', { webPrefix: 'webprefixvalue' }).then((response: UpdatedWebPrefixResponse) => {
        response.should.eql(
          {
            body: { message: 'Domain web prefix updated' }, status: 200
          }
        );
      });
    });
  });
});
