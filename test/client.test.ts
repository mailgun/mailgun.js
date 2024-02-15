import formData from 'form-data';

import { expect } from 'chai';

import Client from '../lib/Classes/MailgunClient';
import Request from '../lib/Classes/common/Request';
import EventsClient from '../lib/Classes/Events';
import WebhooksClient from '../lib/Classes/Webhooks';
import SuppressionsClient from '../lib/Classes/Suppressions/SuppressionsClient';
import MessagesClient from '../lib/Classes/Messages';
import RoutesClient from '../lib/Classes/Routes';
import ValidateClient from '../lib/Classes/Validations/validate';
import SubaccountsClient from '../lib/Classes/Subaccounts';

import StatsClient from '../lib/Classes/Stats/StatsClient';
import ListsClient from '../lib/Classes/MailingLists/mailingLists';
import IpPoolsClient from '../lib/Classes/IPPools';
import IpsClient from '../lib/Classes/IPs';
import { InputFormData, MailgunClientOptions } from '../lib';
import DomainsClient from '../lib/Classes/Domains/domainsClient';
import { IMailgunClient } from '../lib/Interfaces';
import DomainTagsClient from '../lib/Classes/Domains/domainsTags';
import DomainCredentialsClient from '../lib/Classes/Domains/domainsCredentials';
import DomainTemplatesClient from '../lib/Classes/Domains/domainsTemplates';
import MultipleValidationClient from '../lib/Classes/Validations/multipleValidation';
import MailListsMembers from '../lib/Classes/MailingLists/mailListMembers';

describe('Client', () => {
  let client: IMailgunClient;

  beforeEach(() => {
    client = new Client({
      username: 'username',
      key: 'key',
      public_key: 'key',
      timeout: 10000
    }, formData as InputFormData);
  });

  it('exposes raw request client', () => {
    client.should.have.property('request').to.be.instanceOf(Request);
  });

  it('sets and resets subaccount header for requests', () => {
    client.setSubaccount('XYZ');
    client.should.have.property('request').to.be.instanceOf(Request);
    client.should.have.property('request').to.haveOwnProperty('headers')
      .to.contain({ [SubaccountsClient.SUBACCOUNT_HEADER]: 'XYZ' });
    client.resetSubaccount();
    client.should.have.property('request').to.haveOwnProperty('headers')
      .to.not.haveOwnProperty(SubaccountsClient.SUBACCOUNT_HEADER);
  });

  it('creates domain client', () => {
    client.domains.should.be.instanceOf(DomainsClient);
  });

  it('creates domain tags client', () => {
    client.domains.domainTags.should.be.instanceOf(DomainTagsClient);
  });

  it('creates domain credentials client', () => {
    client.domains.domainCredentials.should.be.instanceOf(DomainCredentialsClient);
  });

  it('creates domain templates client', () => {
    client.domains.domainTemplates.should.be.instanceOf(DomainTemplatesClient);
  });

  it('creates event client', () => {
    client.events.should.be.instanceOf(EventsClient);
  });

  it('creates webhook client', () => {
    client.webhooks.should.be.instanceOf(WebhooksClient);
  });

  it('creates suppressions client', () => {
    client.suppressions.should.be.instanceOf(SuppressionsClient);
  });

  it('creates stats client', () => {
    client.stats.should.be.instanceOf(StatsClient);
  });

  it('creates messages client', () => {
    client.messages.should.be.instanceOf(MessagesClient);
  });

  it('creates routes client', () => {
    client.routes.should.be.instanceOf(RoutesClient);
  });

  it('creates ips client', () => {
    client.ips.should.be.instanceOf(IpsClient);
  });

  it('creates ip_pools client', () => {
    client.ip_pools.should.be.instanceOf(IpPoolsClient);
  });

  it('creates lists client', () => {
    client.lists.should.be.instanceOf(ListsClient);
  });

  it('creates mail lists members client', () => {
    client.lists.members.should.be.instanceOf(MailListsMembers);
  });

  it('creates address validate client', () => {
    client.validate.should.be.instanceOf(ValidateClient);
  });

  it('creates multiple validation client', () => {
    client.validate.multipleValidation.should.be.instanceOf(MultipleValidationClient);
  });

  it('creates subaccounts client', () => {
    client.subaccounts.should.be.instanceOf(SubaccountsClient);
  });

  describe('User configuration', () => {
    it('respects proxy settings', () => {
      const mgClient = new Client({
        username: 'username',
        key: 'key',
        public_key: 'key',
        proxy: {
          protocol: 'https',
          host: '127.0.0.1',
          port: 9000,
          auth: {
            username: 'test',
            password: 'test-pass'
          }
        }
      } as MailgunClientOptions, formData as InputFormData);
      mgClient.should.have.property('request');
      mgClient.should.have.property('request').to.have.property('proxy').to.eql({
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'test',
          password: 'test-pass'
        }
      });
    });

    it('respects timeout and url settings', () => {
      const mgClient = new Client({
        username: 'username',
        key: 'key',
        public_key: 'public_key',
        timeout: 1000,
        url: 'test_url'
      } as MailgunClientOptions, formData as InputFormData);
      mgClient.should.have.property('request');
      mgClient.should.have.property('request').to.have.property('timeout').to.equal(1000);
      mgClient.should.have.property('request').to.have.property('url').to.eql('test_url');
    });

    it('raises error when username is not provided', () => {
      expect(
        () => new Client(
          { key: 'key' } as MailgunClientOptions,
          formData as InputFormData
        )
      ).to.throw('Parameter "username" is required');
    });

    it('raises error when key is not provided', () => {
      expect(
        () => new Client(
          { username: 'username' } as MailgunClientOptions,
          formData as InputFormData
        )
      ).to.throw('Parameter "key" is required');
    });
  });
});
