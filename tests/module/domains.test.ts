import formData from 'form-data';

import nock from 'nock';
import Request from '../../lib/Classes/common/Request.js';

import { InputFormData, APIResponse, RequestOptions } from '../../lib/Types/Common/index.js';
import DomainCredentialsClient from '../../lib/Classes/Domains/domainsCredentials.js';
import DomainTemplatesClient from '../../lib/Classes/Domains/domainsTemplates.js';
import DomainTagsClient from '../../lib/Classes/Domains/domainsTags.js';
import DomainTrackingClient from '../../lib/Classes/Domains/domainsTracking.js';

import {
  MessageResponse,
  ConnectionSettings,
  UpdatedConnectionSettings,
  UpdatedDKIMAuthority,
  UpdatedWebPrefixResponse,
  TDomain,
  UpdatedDKIMSelectorResult,
  DomainTrackingData
} from '../../lib/Types/Domains/index.js';
import DomainsClient from '../../lib/Classes/Domains/domainsClient.js';

// TODO: fix types
describe('DomainsClient', function () {
  let client: DomainsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const domainCredentialsClient = new DomainCredentialsClient(reqObject);
    const domainTemplatesClient = new DomainTemplatesClient(reqObject);
    const domainTagsClient = new DomainTagsClient(reqObject);
    const domainTrackingClient = new DomainTrackingClient(reqObject);
    client = new DomainsClient(
      reqObject,
      domainCredentialsClient,
      domainTemplatesClient,
      domainTagsClient,
      domainTrackingClient,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      { warn: () => {} }
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all domains', async () => {
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
        require_tls: true,
        id: 'test_id',
        is_disabled: false,
        use_automatic_sender_security: false,
        web_prefix: 'web_prefix_value',
        web_scheme: 'https'
      }];

      api.get('/v4/domains').reply(200, {
        items: domains
      });
      const dm = await client.list();
      expect(dm).toHaveLength(1);
      expect(dm[0]).toMatchObject({
        ...domains[0],
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: null,
        sending_dns_records: null,
      });
    });

    it('returns empty array if items property is empty', async () => {
      api.get('/v4/domains').reply(200, {
        items: null
      });
      const res :TDomain[] = await client.list();
      expect(res).toHaveLength(0);
    });
  });

  describe('get', function () {
    it('takes a specific domain and populates dns records', async () => {
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
        require_tls: true,
        id: 'test_id',
        is_disabled: false,
        web_prefix: 'email',
        web_scheme: 'https',
        use_automatic_sender_security: false,
      };

      api.get('/v4/domains/testing.example.com').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });
      const domain = await client.get('testing.example.com');
      expect(domain).toMatchObject({
        ...domainData,
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: [],
        sending_dns_records: [],
      });
    });

    it('returns additional props if presented', async () => {
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
        require_tls: true,
        id: 'test_id',
        is_disabled: false,
        web_prefix: 'email',
        web_scheme: 'https',
        use_automatic_sender_security: false,
        dkim_host: 'dkim_host_value', // property depends on request
        mailfrom_host: 'dkim_host_value' // property depends on request
      };
      const params = new URLSearchParams({
        'h:extended': 'true',
        'h:with_dns': 'false',
      });
      api.get('/v4/domains/testing.example.com').query(params).reply(200, {
        domain: domainData,
        receiving_dns_records: null,
        sending_dns_records: null
      });

      const domain = await client.get(
        'testing.example.com',
        {
          extended: true,
          with_dns: false
        }
      );

      expect(domain).toMatchObject({
        ...domainData,
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: null,
        sending_dns_records: null,
        dkim_host: 'dkim_host_value',
        mailfrom_host: 'dkim_host_value',
      });
    });
  });

  describe('create', function () {
    it('creates a domain', async () => {
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
        require_tls: true,
        // next properties exist only in get, create and update responses
        id: 'test_id',
        is_disabled: false,
        web_prefix: 'email',
        web_scheme: 'https',
        use_automatic_sender_security: false,
      };

      api.post('/v4/domains').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });
      const domain = await client.create({
        name: 'another.example.com',
        smtp_password: 'smtp_password',
        web_scheme: 'https'
      });

      expect(domain).toMatchObject({
        ...domainData,
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: [],
        sending_dns_records: [],
      });
    });

    it('converts boolean TRUE values to string', async () => {
      let requestObject;
      api.post('/v4/domains').reply(200, function (_uri, requestBody) {
        requestObject = requestBody as formData;
        return {
          domain: {
            name: 'another.example.com',
            smtp_password: 'smtp_password',
            web_scheme: 'https',
          }
        };
      });
      await client.create({
        name: 'another.example.com',
        smtp_password: 'smtp_password',
        web_scheme: 'https',
        force_dkim_authority: true,
        wildcard: true,
        encrypt_incoming_message: true,
        force_root_dkim_host: true,
        use_automatic_sender_security: true,
      });
      expect(requestObject).toEqual(expect.stringContaining('name="force_dkim_authority"\r\n\r\ntrue\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="wildcard"\r\n\r\ntrue\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="encrypt_incoming_message"\r\n\r\ntrue\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="force_root_dkim_host"\r\n\r\ntrue\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="use_automatic_sender_security"\r\n\r\ntrue\r\n----------------------------'));
    });

    it('converts boolean FALSE values to string', async () => {
      let requestObject;
      api.post('/v4/domains').reply(200, function (_uri, requestBody) {
        requestObject = requestBody as formData;
        return {
          domain: {
            name: 'another.example.com',
            smtp_password: 'smtp_password',
            web_scheme: 'https',
          }
        };
      });
      await client.create({
        name: 'another.example.com',
        smtp_password: 'smtp_password',
        web_scheme: 'https',
        force_dkim_authority: false,
        wildcard: false,
        encrypt_incoming_message: false,
        force_root_dkim_host: false,
        use_automatic_sender_security: false,
      });
      expect(requestObject).toEqual(expect.stringContaining('name="force_dkim_authority"\r\n\r\nfalse\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="wildcard"\r\n\r\nfalse\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="encrypt_incoming_message"\r\n\r\nfalse\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="force_root_dkim_host"\r\n\r\nfalse\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="use_automatic_sender_security"\r\n\r\nfalse\r\n----------------------------'));
    });
  });
  describe('update', function () {
    it('updates the domain', async () => {
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
        require_tls: true,
        // next properties exist only in get, create and update responses
        id: 'test_id',
        is_disabled: false,
        web_prefix: 'email',
        web_scheme: 'http',
        use_automatic_sender_security: false,
      };

      api.put('/v4/domains/testing.example.com').reply(200, {
        domain: domainData,
        receiving_dns_records: [],
        sending_dns_records: []
      });

      const domain: TDomain = await client.update('testing.example.com', {
        wildcard: 'true',
        web_scheme: 'http',
        spam_action: 'disabled'
      });

      expect(domain).toMatchObject({
        ...domainData,
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: [],
        sending_dns_records: [],
      });
    });

    it('converts boolean TRUE values to string', async () => {
      let requestObject;
      api.put('/v4/domains/testing.example.com').reply(200, function (_uri, requestBody) {
        requestObject = requestBody as formData;
        return {
          domain: {
            name: 'another.example.com',
            smtp_password: 'smtp_password',
            web_scheme: 'https',
          }
        };
      });
      await client.update('testing.example.com', {
        wildcard: true,
        web_scheme: 'http',
        spam_action: 'disabled',
        use_automatic_sender_security: true,
      });
      expect(requestObject).toEqual(expect.stringContaining('name="wildcard"\r\n\r\ntrue\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="use_automatic_sender_security"\r\n\r\ntrue\r\n----------------------------'));
    });

    it('converts boolean FALSE values to string', async () => {
      let requestObject;
      api.put('/v4/domains/testing.example.com').reply(200, function (_uri, requestBody) {
        requestObject = requestBody as formData;
        return {
          domain: {
            name: 'another.example.com',
            smtp_password: 'smtp_password',
            web_scheme: 'https',
          }
        };
      });
      await client.update('testing.example.com', {
        wildcard: false,
        web_scheme: 'http',
        spam_action: 'disabled',
        use_automatic_sender_security: false,
      });
      expect(requestObject).toEqual(expect.stringContaining('name="wildcard"\r\n\r\nfalse\r\n----------------------------'));
      expect(requestObject).toEqual(expect.stringContaining('name="use_automatic_sender_security"\r\n\r\nfalse\r\n----------------------------'));
    });
  });

  describe('verify', function () {
    it('verifies a domain', async () => {
      const domainData = {
        created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
        name: 'test.example.com',
        smtp_login: 'postmaster@test.example.com',
        smtp_password: 'password',
        spam_action: 'disabled',
        state: 'active',
        type: 'custom',
        wildcard: true,
        skip_verification: true,
        require_tls: true,
        id: 'test_id',
        is_disabled: false,
        use_automatic_sender_security: false,
        web_prefix: 'web_prefix_value',
        web_scheme: 'https'
      };

      api.put('/v4/domains/test.example.com/verify').reply(200, {
        domain: domainData,
        receiving_dns_records: [
          {
            cached: ['test-value1', 'test-value2'],
            priority: '10',
            record_type: 'MX',
            valid: 'valid',
            value: 'test-value'
          },
        ],
        sending_dns_records: [
          {
            cached: ['test-value'],
            name: 'test name',
            record_type: 'TXT',
            valid: 'valid',
            value: 'test-value'
          },
        ]
      });
      const domain = await client.verify('test.example.com');
      expect(domain).toMatchObject({
        ...domainData,
        created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
        receiving_dns_records: [
          {
            cached: ['test-value1', 'test-value2'],
            priority: '10',
            record_type: 'MX',
            valid: 'valid',
            value: 'test-value'
          }
        ],
        sending_dns_records: [
          {
            cached: ['test-value'],
            name: 'test name',
            record_type: 'TXT',
            valid: 'valid',
            value: 'test-value'
          }
        ]
      });
    });
  });

  describe('destroy', function () {
    it('deletes a domain', async () => {
      api.delete('/v3/domains/test.example.com').reply(200, {
        message: 'domain deleted'
      });
      const data = await client.destroy('test.example.com');
      expect(data).toMatchObject(
        {
          message: 'domain deleted'
        }
      );
    });
  });

  describe('getConnection', () => {
    it('returns connection settings for the defined domain', async () => {
      api.get('/v3/domains/test.example.com/connection').reply(200, {
        require_tls: false, skip_verification: false
      });
      const response: ConnectionSettings = await client.getConnection('test.example.com');
      expect(response).toMatchObject({ require_tls: false, skip_verification: false });
    });
  });

  describe('updateConnection', () => {
    it('Updates the connection settings for the defined domain.', async () => {
      const connection = {
        message: 'Domain connection settings have been updated, may take 10 minutes to fully propagate',
        require_tls: false,
        skip_verification: false
      };
      api.put('/v3/domains/test.example.com/connection').reply(200, {
        connection
      });

      const response: UpdatedConnectionSettings = await client.updateConnection('test.example.com', {
        require_tls: true,
        skip_verification: true
      });

      expect(response).toMatchObject({
        connection
      });
    });
  });

  describe('getTracking', () => {
    it('fetches all tracking settings', async () => {
      const trackingData = {
        open: { active: true },
        click: { active: true },
        unsubscribe: { active: true, html_footer: 'html', text_footer: 'text' }
      };
      api.get('/v3/domains/domain.com/tracking').reply(200, {
        tracking: trackingData
      });
      const tracking: DomainTrackingData = await client.getTracking('domain.com');
      expect(tracking).toMatchObject(trackingData);
    });
  });

  describe('updateTracking', () => {
    it('updates tracking settings', async () => {
      const open = { active: true };
      api.put('/v3/domains/domain.com/tracking/open').reply(200, {
        message: 'Tracking settings have been updated',
        open
      });

      const res = await client.updateTracking('domain.com', 'open', { active: 'yes' });

      expect(res).toMatchObject({
        message: 'Tracking settings have been updated',
        open
      });
    });
  });

  describe('getIps', () => {
    it('should return list of dedicated ips', async () => {
      const items = ['192.161.0.1', '192.168.0.2'];
      api.get('/v3/domains/domain.com/ips').reply(200, { items });
      const res = await client.getIps('domain.com');
      expect(res).toEqual(expect.arrayContaining(items));
    });
  });

  describe('assignIp', () => {
    it('should assign Ip', async () => {
      const ip = '127.0.0.1';
      api.post('/v3/domains/domain.com/ips').reply(200, { message: 'success' });
      const res = await client.assignIp('domain.com', ip);
      expect(res).toMatchObject({ status: 200, body: { message: 'success' } });
    });
  });

  describe('deleteIp', () => {
    it('should delete assigned Ip', async () => {
      const ip = '127.0.0.1';
      api.delete('/v3/domains/domain.com/ips/127.0.0.1').reply(200, { message: 'success' });
      const res = await client.deleteIp('domain.com', ip);
      expect(res).toMatchObject({ status: 200, body: { message: 'success' } });
    });
  });

  describe('linkIpPool', () => {
    it('should link ip pool', async () => {
      const ipPool = '121212121212121212121212';
      api.post('/v3/domains/domain.com/ips').reply(200, { message: 'success' });
      const res = await client.linkIpPool('domain.com', ipPool);
      expect(res).toMatchObject({ status: 200, body: { message: 'success' } });
    });
  });

  describe('unlinkIpPoll', () => {
    it('should unlink ip pool with new ip pool', async () => {
      const ipPool = '121212121212121212121212';
      api.delete(`/v3/domains/domain.com/ips/ip_pool?pool_id=${ipPool}`).reply(200, { message: 'success' });
      const res = await client.unlinkIpPoll('domain.com', { pool_id: ipPool });
      expect(res).toMatchObject({ status: 200, body: { message: 'success' } });
    });

    it('should unlink ip pool with ip', async () => {
      const ip = '127.0.0.1';
      api.delete(`/v3/domains/domain.com/ips/ip_pool?ip=${ip}`).reply(200, { message: 'success' });
      const res = await client.unlinkIpPoll('domain.com', { ip });
      expect(res).toMatchObject({ status: 200, body: { message: 'success' } });
    });

    it('should check replacement data', async () => {
      try {
        await client.unlinkIpPoll('domain.com', { ip: 'test', pool_id: 'test' });
      } catch (error) {
        expect(error).toMatchObject({
          status: 400,
          details: 'Please specify either pool_id or ip (not both)',
          message: 'Too much data for replacement'
        });
      }
    });
  });
  describe('updateDKIMAuthority', () => {
    it('changes the DKIM authority for a domain.', async () => {
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
      const res = await client.updateDKIMAuthority('test.example.com', { self: 'true' });
      expect(res).toMatchObject(expectedRes);
    });
  });

  describe('updateDKIMSelector', () => {
    it('updates the DKIM selector for a domains', async () => {
      api.put('/v3/domains/test.example.com/dkim_selector?dkim_selector=dkim_selector_value').reply(200, { message: 'Domain DKIM selector updated' });
      const response: UpdatedDKIMSelectorResult = await client.updateDKIMSelector('test.example.com', { dkimSelector: 'dkim_selector_value' });
      expect(response).toMatchObject({
        message: 'Domain DKIM selector updated',
        status: 200
      });
    });
  });

  describe('updateWebPrefix', () => {
    it('Update the CNAME used for tracking opens and clicks', async () => {
      api.put('/v3/domains/test.example.com/web_prefix?web_prefix=webprefixvalue').reply(200, { message: 'Domain web prefix updated' });
      const res = await client.updateWebPrefix('test.example.com', { webPrefix: 'webprefixvalue' });
      expect(res).toMatchObject({
        body: { message: 'Domain web prefix updated' }, status: 200
      });
    });
  });
});
