import formData from 'form-data';

import { expect } from 'chai';

import Client from '../lib/client';
import Request from '../lib/request';
import DomainsClient from '../lib/domains';
import EventsClient from '../lib/events';
import WebhooksClient from '../lib/webhooks';
import SuppressionsClient from '../lib/suppressions';
import MessagesClient from '../lib/messages';
import RoutesClient from '../lib/routes';
import ValidateClient from '../lib/validate';

import { InputFormData } from '../lib/interfaces/IFormData';
import StatsClient from '../lib/stats';
import ListsClient from '../lib/lists';
import IpPoolsClient from '../lib/ip-pools';
import IpsClient from '../lib/ips';

describe('Client', function () {
  let client: any;

  beforeEach(function () {
    client = new Client({
      username: 'username',
      key: 'key',
      public_key: 'key',
      timeout: 10000
    }, formData as InputFormData);
  });

  it('raises error when username is not provided', function () {
    expect(
      function () {
        return new Client({ key: 'key' } as any, formData as InputFormData);
      }
    ).to.throw('Parameter "username" is required');
  });

  it('raises error when key is not provided', function () {
    expect(
      function () {
        return new Client({ username: 'username' } as any, formData as InputFormData);
      }
    ).to.throw('Parameter "key" is required');
  });

  it('exposes raw request client', function () {
    client.request.should.be.instanceOf(Request);
  });

  it('creates domain client', function () {
    client.domains.should.be.instanceOf(DomainsClient);
  });

  it('creates event client', function () {
    client.events.should.be.instanceOf(EventsClient);
  });

  it('creates webhook client', function () {
    client.webhooks.should.be.instanceOf(WebhooksClient);
  });

  it('creates suppressions client', function () {
    client.suppressions.should.be.instanceOf(SuppressionsClient);
  });

  it('creates stats client', function () {
    client.stats.should.be.instanceOf(StatsClient);
  });

  it('creates messages client', function () {
    client.messages.should.be.instanceOf(MessagesClient);
  });

  it('creates routes client', function () {
    client.routes.should.be.instanceOf(RoutesClient);
  });

  it('creates ips client', function () {
    client.ips.should.be.instanceOf(IpsClient);
  });

  it('creates ip_pools client', function () {
    client.ip_pools.should.be.instanceOf(IpPoolsClient);
  });

  it('creates lists client', function () {
    client.lists.should.be.instanceOf(ListsClient);
  });

  it('creates address validate client', function () {
    client.validate.should.be.instanceOf(ValidateClient);
  });
});
