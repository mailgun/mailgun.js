import formData from 'form-data';

import Client from '../../lib/Classes/MailgunClient.js';
import Request from '../../lib/Classes/common/Request.js';
import EventsClient from '../../lib/Classes/Events.js';
import WebhooksClient from '../../lib/Classes/Webhooks.js';
import SuppressionsClient from '../../lib/Classes/Suppressions/SuppressionsClient.js';
import MessagesClient from '../../lib/Classes/Messages.js';
import RoutesClient from '../../lib/Classes/Routes.js';
import ValidateClient from '../../lib/Classes/Validations/validate.js';
import SubaccountsClient from '../../lib/Classes/Subaccounts.js';

import StatsClient from '../../lib/Classes/Stats/StatsClient.js';
import ListsClient from '../../lib/Classes/MailingLists/mailingLists.js';
import IpPoolsClient from '../../lib/Classes/IPPools.js';
import IpsClient from '../../lib/Classes/IPs.js';
import { InputFormData, MailgunClientOptions } from '../../lib/Types/index.js';
import DomainsClient from '../../lib/Classes/Domains/domainsClient.js';
import { IMailgunClient } from '../../lib/Interfaces/index.js';
import DomainTagsClient from '../../lib/Classes/Domains/domainsTags.js';
import DomainCredentialsClient from '../../lib/Classes/Domains/domainsCredentials.js';
import DomainTemplatesClient from '../../lib/Classes/Domains/domainsTemplates.js';
import MultipleValidationClient from '../../lib/Classes/Validations/multipleValidation.js';
import MailListsMembers from '../../lib/Classes/MailingLists/mailListMembers.js';
import InboxPlacementsClient from '../../lib/Classes/InboxPlacements/inboxPlacements.js';
import MetricsClient from '../../lib/Classes/Metrics/MetricsClient.js';
import AxiosProvider from '../../lib/Classes/common/RequestProviders/AxiosProvider.js';
import LogsClient from '../../lib/Classes/Logs/LogsClient.js';
import DKIMManagementClient from '../../lib/Classes/DKIM/DKIMManagment.js';
import BounceClassificationClient from '../../lib/Classes/BounceClassification/BounceClassificationClient.js';

describe('MailgunClient', () => {
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
    expect(client).toHaveProperty('request');
    expect(client.request).toBeInstanceOf(Request);
  });

  it('creates domain client', () => {
    expect(client).toHaveProperty('domains');
    expect(client.domains).toBeInstanceOf(DomainsClient);
  });

  it('creates domain tags client', () => {
    expect(client).toHaveProperty('domains');
    expect(client.domains).toHaveProperty('domainTags');
    expect(client.domains.domainTags).toBeInstanceOf(DomainTagsClient);
  });

  it('creates domain credentials client', () => {
    expect(client).toHaveProperty('domains');
    expect(client.domains).toHaveProperty('domainCredentials');
    expect(client.domains.domainCredentials).toBeInstanceOf(DomainCredentialsClient);
  });

  it('creates domain templates client', () => {
    expect(client).toHaveProperty('domains');
    expect(client.domains).toHaveProperty('domainTemplates');
    expect(client.domains.domainTemplates).toBeInstanceOf(DomainTemplatesClient);
  });

  it('creates event client', () => {
    expect(client).toHaveProperty('events');
    expect(client.events).toBeInstanceOf(EventsClient);
  });

  it('creates webhook client', () => {
    expect(client).toHaveProperty('webhooks');
    expect(client.webhooks).toBeInstanceOf(WebhooksClient);
  });

  it('creates suppressions client', () => {
    expect(client).toHaveProperty('suppressions');
    expect(client.suppressions).toBeInstanceOf(SuppressionsClient);
  });

  it('creates stats client', () => {
    expect(client).toHaveProperty('stats');
    expect(client.stats).toBeInstanceOf(StatsClient);
  });

  it('creates metrics client', () => {
    expect(client).toHaveProperty('metrics');
    expect(client.metrics).toBeInstanceOf(MetricsClient);
  });

  it('creates messages client', () => {
    expect(client).toHaveProperty('messages');
    expect(client.messages).toBeInstanceOf(MessagesClient);
  });

  it('creates routes client', () => {
    expect(client).toHaveProperty('routes');
    expect(client.routes).toBeInstanceOf(RoutesClient);
  });

  it('creates ips client', () => {
    expect(client).toHaveProperty('ips');
    expect(client.ips).toBeInstanceOf(IpsClient);
  });

  it('creates ip_pools client', () => {
    expect(client).toHaveProperty('ip_pools');
    expect(client.ip_pools).toBeInstanceOf(IpPoolsClient);
  });

  it('creates lists client', () => {
    expect(client).toHaveProperty('lists');
    expect(client.lists).toBeInstanceOf(ListsClient);
  });

  it('creates mail lists members client', () => {
    expect(client).toHaveProperty('lists');
    expect(client.lists).toHaveProperty('members');
    expect(client.lists.members).toBeInstanceOf(MailListsMembers);
  });

  it('creates address validate client', () => {
    expect(client).toHaveProperty('validate');
    expect(client.validate).toBeInstanceOf(ValidateClient);
  });

  it('creates multiple validation client', () => {
    expect(client).toHaveProperty('validate');
    expect(client.validate).toHaveProperty('multipleValidation');
    expect(client.validate.multipleValidation).toBeInstanceOf(MultipleValidationClient);
  });

  it('creates subaccounts client', () => {
    expect(client).toHaveProperty('subaccounts');
    expect(client.subaccounts).toBeInstanceOf(SubaccountsClient);
  });

  it('creates inbox placements client', () => {
    expect(client).toHaveProperty('inboxPlacements');
    expect(client.inboxPlacements).toBeInstanceOf(InboxPlacementsClient);
  });

  it('creates logs client', () => {
    expect(client).toHaveProperty('logs');
    expect(client.logs).toBeInstanceOf(LogsClient);
  });

  it('creates dkimManagement client', () => {
    expect(client).toHaveProperty('dkimManagement');
    expect(client.dkimManagement).toBeInstanceOf(DKIMManagementClient);
  });

  it('creates bounceClassification client', () => {
    expect(client).toHaveProperty('bounceClassification');
    expect(client.bounceClassification).toBeInstanceOf(BounceClassificationClient);
  });

  describe('User configuration', () => {
    it('uses axios by default', () => {
      client = new Client({
        username: 'username',
        key: 'key',
        public_key: 'key',
        timeout: 10000
      }, formData as InputFormData);
      expect(client.request.requestProvider).toBeInstanceOf(AxiosProvider);
    });

    it('uses fetch if asked', () => {
      client = new Client({
        username: 'username',
        key: 'key',
        public_key: 'key',
        timeout: 10000,
        useFetch: true
      }, formData as InputFormData);
      expect(client.request.requestProvider).toBeInstanceOf(AxiosProvider);
      expect(client.request.requestProvider).toMatchObject(expect.objectContaining({
        useFetch: true
      }));
    });

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
      expect(mgClient).toHaveProperty('request');
      expect(mgClient.request).toHaveProperty('requestProvider');
      expect(mgClient.request.requestProvider).toHaveProperty('proxy');
      expect(mgClient.request.requestProvider).toMatchObject(expect.objectContaining({
        proxy: expect.objectContaining({
          protocol: 'https',
          host: '127.0.0.1',
          port: 9000,
          auth: {
            username: 'test',
            password: 'test-pass'
          }
        })
      }));
    });

    it('rejects proxy settings when useFetch', () => {
      expect(() => new Client({
        username: 'username',
        key: 'key',
        public_key: 'key',
        useFetch: true,
        proxy: {
          protocol: 'https',
          host: '127.0.0.1',
          port: 9000,
          auth: {
            username: 'test',
            password: 'test-pass'
          }
        }
      } as MailgunClientOptions, formData as InputFormData))
        .toThrow('Proxy can not be used with fetch provider');
    });

    it('respects timeout and url settings', () => {
      const mgClient = new Client({
        username: 'username',
        key: 'key',
        public_key: 'public_key',
        timeout: 1000,
        url: 'test_url'
      } as MailgunClientOptions, formData as InputFormData);
      expect(mgClient).toHaveProperty('request');
      expect(mgClient.request).toHaveProperty('requestProvider');
      expect(mgClient.request).toHaveProperty('url');
      expect(mgClient.request).toMatchObject(expect.objectContaining({
        url: 'test_url'
      }));
      expect(mgClient.request.requestProvider).toMatchObject(expect.objectContaining({
        timeout: 1000
      }));
    });

    it('raises error when username is not provided', () => {
      expect(
        () => new Client(
          { key: 'key' } as MailgunClientOptions,
          formData as InputFormData
        )
      ).toThrow('Parameter "username" is required');
    });

    it('raises error when key is not provided', () => {
      expect(
        () => new Client(
          { username: 'username' } as MailgunClientOptions,
          formData as InputFormData
        )
      ).toThrow('Parameter "key" is required');
    });
  });

  describe('Subaccount management', () => {
    it('sets subaccount header', () => {
      const subaccountId = 'test-subaccount-id';
      const setSubAccountHeaderSpy = jest.spyOn(client.request.requestProvider, 'setSubAccountHeader');

      client.setSubaccount(subaccountId);

      expect(setSubAccountHeaderSpy).toHaveBeenCalledWith(subaccountId);
      expect(setSubAccountHeaderSpy).toHaveBeenCalledTimes(1);
    });

    it('resets subaccount header', () => {
      const subaccountId = 'test-subaccount-id';
      const resetSubAccountHeaderSpy = jest.spyOn(client.request.requestProvider, 'resetSubAccountHeader');

      client.setSubaccount(subaccountId);
      client.resetSubaccount();

      expect(resetSubAccountHeaderSpy).toHaveBeenCalledTimes(1);
    });

    it('allows setting different subaccount IDs', () => {
      const firstSubaccountId = 'subaccount-1';
      const secondSubaccountId = 'subaccount-2';
      const setSubAccountHeaderSpy = jest.spyOn(client.request.requestProvider, 'setSubAccountHeader');

      client.setSubaccount(firstSubaccountId);
      client.setSubaccount(secondSubaccountId);

      expect(setSubAccountHeaderSpy).toHaveBeenCalledWith(firstSubaccountId);
      expect(setSubAccountHeaderSpy).toHaveBeenCalledWith(secondSubaccountId);
      expect(setSubAccountHeaderSpy).toHaveBeenCalledTimes(2);
    });

    it('handles reset when no subaccount is set', () => {
      const resetSubAccountHeaderSpy = jest.spyOn(client.request.requestProvider, 'resetSubAccountHeader');

      expect(() => client.resetSubaccount()).not.toThrow();
      expect(resetSubAccountHeaderSpy).toHaveBeenCalledTimes(1);
    });
  });
});
