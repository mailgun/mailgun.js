import nock from 'nock';
import Request from './test-utils/TestRequest.js';

import DomainKeysClient from '../../lib/Classes/Domains/domainsKeys.js';
import {
  RequestOptions
} from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('DomainKeysClient', function () {
  let client: DomainKeysClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new DomainKeysClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all domain keys for a domain', async () => {
      const domainKeys = [{
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      }];

      api.get('/v4/domains/example.com/keys').reply(200, {
        items: domainKeys
      });

      const res = await client.list('example.com');
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(1);
      expect(res.items[0]).toMatchObject({
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      });
    });

    it('returns empty array when no keys exist', async () => {
      api.get('/v4/domains/example.com/keys').reply(200, {
        items: []
      });

      const res = await client.list('example.com');
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(0);
    });
  });

  describe('listAll', function () {
    it('fetches all domain keys across all domains', async () => {
      const domainKeys = [{
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      }];

      api.get('/v1/dkim/keys').query({ page: '', limit: '' }).reply(200, {
        items: domainKeys,
        paging: {
          first: 'https://api.mailgun.net/v1/dkim/keys?page=first',
          last: 'https://api.mailgun.net/v1/dkim/keys?page=last',
          next: 'https://api.mailgun.net/v1/dkim/keys?page=next',
          previous: 'https://api.mailgun.net/v1/dkim/keys?page=prev'
        }
      });

      const res = await client.listAll();
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(1);
      expect(res.items[0]).toMatchObject({
        signing_domain: 'example.com',
        selector: 'selector1'
      });
      expect(res.pages).toHaveProperty('first');
      expect(res.pages).toHaveProperty('last');
    });

    it('filters by signing domain', async () => {
      const domainKeys = [{
        signing_domain: 'test.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.test.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      }];

      api
        .get('/v1/dkim/keys')
        .query({
          signing_domain: 'test.com', page: '', limit: ''
        })
        .reply(200, {
          items: domainKeys,
          paging: {
            first: 'https://api.mailgun.net/v1/dkim/keys?page=first',
            last: 'https://api.mailgun.net/v1/dkim/keys?page=last',
            next: 'https://api.mailgun.net/v1/dkim/keys?page=next',
            previous: 'https://api.mailgun.net/v1/dkim/keys?page=prev'
          }
        });

      const res = await client.listAll({ signingDomain: 'test.com' });
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].signing_domain).toBe('test.com');
    });

    it('filters by selector', async () => {
      const domainKeys = [{
        signing_domain: 'example.com',
        selector: 'custom-selector',
        dns_record: {
          name: 'custom-selector._domainkey.example.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      }];
      api
        .get('/v1/dkim/keys')
        .query({
          selector: 'custom-selector', page: '', limit: ''
        })
        .reply(200, {
          items: domainKeys,
          paging: {
            first: 'https://api.mailgun.net/v1/dkim/keys?page=first',
            last: 'https://api.mailgun.net/v1/dkim/keys?page=last',
            next: 'https://api.mailgun.net/v1/dkim/keys?page=next',
            previous: 'https://api.mailgun.net/v1/dkim/keys?page=prev'
          }
        });

      const res = await client.listAll({ selector: 'custom-selector' });
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].selector).toBe('custom-selector');
    });

    it('filters by both signing domain and selector', async () => {
      const domainKeys = [{
        signing_domain: 'test.com',
        selector: 'custom-selector',
        dns_record: {
          name: 'custom-selector._domainkey.test.com',
          record_type: 'TXT',
          valid: 'valid',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: true
        }
      }];

      api
        .get('/v1/dkim/keys')
        .query({
          signing_domain: 'test.com',
          selector: 'custom-selector',
          page: '',
          limit: ''
        })
        .reply(200, {
          items: domainKeys,
          paging: {
            first: 'https://api.mailgun.net/v1/dkim/keys?page=first',
            last: 'https://api.mailgun.net/v1/dkim/keys?page=last',
            next: 'https://api.mailgun.net/v1/dkim/keys?page=next',
            previous: 'https://api.mailgun.net/v1/dkim/keys?page=prev'
          }
        });

      const res = await client.listAll({
        signingDomain: 'test.com',
        selector: 'custom-selector'
      });
      expect(res.status).toBe(200);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].signing_domain).toBe('test.com');
      expect(res.items[0].selector).toBe('custom-selector');
    });
  });

  describe('create', function () {
    it('creates a domain key with default bits', async () => {
      const createData = {
        signingDomain: 'example.com',
        selector: 'selector1'
      };

      api.post('/v1/dkim/keys').reply(201, {
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'unknown',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: false
        }
      });

      const res = await client.create(createData);
      expect(res.status).toBe(201);
      expect(res.signing_domain).toBe('example.com');
      expect(res.selector).toBe('selector1');
      expect(res.dns_record).toBeDefined();
    });

    it('creates a domain key with specified bits', async () => {
      const createData = {
        signingDomain: 'example.com',
        selector: 'selector1',
        bits: '2048' as '1024' | '2048'
      };

      api.post('/v1/dkim/keys').reply(201, {
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'unknown',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: false
        }
      });

      const res = await client.create(createData);
      expect(res.status).toBe(201);
      expect(res.signing_domain).toBe('example.com');
      expect(res.selector).toBe('selector1');
    });

    it('creates a domain key with custom PEM', async () => {
      const createData = {
        signingDomain: 'example.com',
        selector: 'selector1',
        pem: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----'
      };

      api.post('/v1/dkim/keys').reply(201, {
        signing_domain: 'example.com',
        selector: 'selector1',
        dns_record: {
          name: 'selector1._domainkey.example.com',
          record_type: 'TXT',
          valid: 'unknown',
          value: 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA...',
          is_active: false
        }
      });

      const res = await client.create(createData);
      expect(res.status).toBe(201);
      expect(res.signing_domain).toBe('example.com');
      expect(res.selector).toBe('selector1');
    });
  });

  describe('activate', function () {
    it('activates a domain key', async () => {
      api.put('/v4/domains/example.com/keys/selector1/activate').reply(200, {
        message: 'Domain key activated',
        authority: 'example.com',
        selector: 'selector1',
        active: true
      });

      const res = await client.activate('example.com', 'selector1');
      expect(res.status).toBe(200);
      expect(res.message).toBe('Domain key activated');
      expect(res.authority).toBe('example.com');
      expect(res.selector).toBe('selector1');
      expect(res.active).toBe(true);
    });
  });

  describe('deactivate', function () {
    it('deactivates a domain key', async () => {
      api.put('/v4/domains/example.com/keys/selector1/deactivate').reply(200, {
        message: 'Domain key deactivated',
        authority: 'example.com',
        selector: 'selector1',
        active: false
      });

      const res = await client.deactivate('example.com', 'selector1');
      expect(res.status).toBe(200);
      expect(res.message).toBe('Domain key deactivated');
      expect(res.authority).toBe('example.com');
      expect(res.selector).toBe('selector1');
      expect(res.active).toBe(false);
    });
  });

  describe('destroy', function () {
    it('deletes a domain key', async () => {
      api.delete('/v1/dkim/keys?signing_domain=example.com&selector=selector1').reply(200, {
        message: 'Domain key deleted'
      });

      const res = await client.destroy('example.com', 'selector1');
      expect(res.message).toBe('Domain key deleted');
    });
  });

  describe('updateDKIMSelector', function () {
    it('updates DKIM selector for a domain', async () => {
      api.put('/v3/domains/example.com/dkim_selector?dkim_selector=new-selector').reply(200, {
        message: 'Domain DKIM selector updated'
      });

      const res = await client.updateDKIMSelector('example.com', {
        dkimSelector: 'new-selector'
      });
      expect(res.status).toBe(200);
      expect(res.message).toBe('Domain DKIM selector updated');
    });
  });

  describe('updateDKIMAuthority', function () {
    it('updates DKIM authority for a domain when self is true', async () => {
      api.put('/v3/domains/example.com/dkim_authority?self=true').reply(200, {
        message: 'Domain DKIM authority updated',
        changed: true
      });

      const res = await client.updateDKIMAuthority('example.com', {
        self: true
      });
      expect(res.message).toBe('Domain DKIM authority updated');
      expect(res.changed).toBe(true);
    });

    it('updates DKIM authority for a domain when self is false', async () => {
      api.put('/v3/domains/example.com/dkim_authority?self=false').reply(200, {
        message: 'Domain DKIM authority updated',
        changed: true
      });

      const res = await client.updateDKIMAuthority('example.com', {
        self: false
      });
      expect(res.message).toBe('Domain DKIM authority updated');
      expect(res.changed).toBe(true);
    });
  });
});
