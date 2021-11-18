import formData from 'form-data';

import nock from 'nock';
import Request from '../lib/request';
import RequestOptions from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import DomainCredentialsClient from '../lib/domainsCredentials';
import { DomainCredentialsList, DomainCredentialsResult } from '../lib/interfaces/DomainCredentials';

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
    it('fetches all domain credentials', function () {
      api.get('/v3/domains/testDomain/credentials').reply(200, {
        items: [{
          created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
          login: 'testLogin@testing.example.com',
          mailbox: 'test@testing.example.com',
          size_bytes: null
        }],
        total_count: 1
      });

      return client.list('testDomain').then(function (credentialsList: DomainCredentialsList) {
        credentialsList.should.be.an('object').to.have.property('items');
        credentialsList.items.should.be.an('array').to.have.property('length').to.be.equal(1);
        credentialsList.items[0].should.eql({
          created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
          login: 'testLogin@testing.example.com',
          mailbox: 'test@testing.example.com',
          size_bytes: null
        });
      });
    });
  });

  describe('create', function () {
    it('creates domain credentials', function () {
      const domainCredentialsData = {
        login: 'testLogin',
        password: 'testPassword'
      };

      api.post('/v3/domains/testDomain/credentials').reply(200, {
        message: 'Created 1 credentials pair(s)'
      });

      return client.create('testDomain', domainCredentialsData).then(function (res: DomainCredentialsResult) {
        res.should.eql({ message: 'Created 1 credentials pair(s)', status: 200 });
      });
    });
  });

  describe('update', function () {
    it('updates domain credentials', function () {
      api.put('/v3/domains/testDomain/credentials/testLogin').reply(200, {
        message: 'Password changed'
      });

      return client.update('testDomain', 'testLogin', {
        password: 'testPassword1'
      }).then(function (res: DomainCredentialsResult) {
        res.should.eql({ message: 'Password changed', status: 200 });
      });
    });
  });

  describe('destroy', function () {
    it('deletes a domain credentials', function () {
      api.delete('/v3/domains/testDomain/credentials/testLogin').reply(200, {
        message: 'domain deleted',
        spec: 'testDomain'
      });

      return client.destroy('testDomain', 'testLogin').then(function (data: DomainCredentialsResult) {
        data.should.eql({
          message: 'domain deleted',
          spec: 'testDomain',
          status: 200
        });
      });
    });
  });
});
