import formData from 'form-data';

import nock from 'nock';
import Request from '../../lib/Classes/common/Request.js';

import DomainCredentialsClient from '../../lib/Classes/Domains/domainsCredentials.js';
import {
  DomainCredentialsList,
  DomainCredentialsResult,
  InputFormData,
  RequestOptions
} from '../../lib/Types/index.js';

// TODO: fix types
describe('DomainsCredentialsClient', function () {
  let client: DomainCredentialsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new DomainCredentialsClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all domain credentials', async () => {
      api.get('/v3/domains/testDomain/credentials').reply(200, {
        items: [{
          created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
          login: 'testLogin@testing.example.com',
          mailbox: 'test@testing.example.com',
          size_bytes: null
        }],
        total_count: 1
      });
      const res = await client.list('testDomain');
      expect(res).toHaveProperty('items');
      expect(res.items).toHaveLength(1);
      expect(res.items[0]).toMatchObject({
        created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
        login: 'testLogin@testing.example.com',
        mailbox: 'test@testing.example.com',
        size_bytes: null
      });
    });
  });

  describe('create', function () {
    it('creates domain credentials', async () => {
      const domainCredentialsData = {
        login: 'testLogin',
        password: 'testPassword'
      };

      api.post('/v3/domains/testDomain/credentials').reply(200, {
        message: 'Created 1 credentials pair(s)'
      });
      const res = await client.create('testDomain', domainCredentialsData);
      expect(res).toMatchObject({ message: 'Created 1 credentials pair(s)', status: 200 });
    });
  });

  describe('update', function () {
    it('updates domain credentials', async () => {
      api.put('/v3/domains/testDomain/credentials/testLogin').reply(200, {
        message: 'Password changed'
      });
      const res = await client.update('testDomain', 'testLogin', {
        password: 'testPassword1'
      });
      expect(res).toMatchObject({ message: 'Password changed', status: 200 });
    });
  });

  describe('destroy', function () {
    it('deletes a domain credentials', async () => {
      api.delete('/v3/domains/testDomain/credentials/testLogin').reply(200, {
        message: 'domain deleted',
        spec: 'testDomain'
      });
      const res = await client.destroy('testDomain', 'testLogin');
      expect(res).toMatchObject({
        message: 'domain deleted',
        spec: 'testDomain',
        status: 200
      });
    });
  });
});
