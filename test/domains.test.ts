import formData from 'form-data';

import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/request';
import DomainClient from '../lib/domains';
import RequestOptions from '../lib/interfaces/RequestOptions';

// TODO: fix types
describe('DomainClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new DomainClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
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

      api.get('/v2/domains').reply(200, {
        items: domains
      });

      return client.list().then(function (dm: any[]) {
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

      api.get('/v2/domains/testing.example.com').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });

      return client.get('testing.example.com').then(function (domain: any) {
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

      api.post('/v2/domains').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });

      return client.create({ name: 'another.example.com' }).then(function (domain: any) {
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
      api.delete('/v2/domains/test.example.com').reply(200, {
        message: 'domain deleted'
      });

      return client.destroy('test.example.com').then(function (data: any) {
        data.should.eql({
          message: 'domain deleted'
        });
      });
    });
  });

  describe('getTracking', function () {
    it('fetches all tracking settings', function () {
      api.get('/v2/domains/domain.com/tracking').reply(200, {
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
      api.put('/v2/domains/domain.com/tracking/open').reply(200, {
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
      api.get('/v2/domains/domain.com/ips').reply(200, { items });

      return client.getIps('domain.com').then((response: string[]) => {
        response.should.eql(items);
      });
    });
  });
});
