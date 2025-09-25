import nock from 'nock';
import { WebhooksIds } from '../../lib/Enums/index.js';
import Request from './test-utils/TestRequest.js';
import WebhooksClient from '../../lib/Classes/Webhooks.js';
import { IWebHooksClient } from '../../lib/Interfaces/index.js';
import {
  RequestOptions,
  WebhookList,
  WebhookResult,
  WebhookValidationResponse
} from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('WebhooksClient', function () {
  let client: IWebHooksClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new WebhooksClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData()));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', () => {
    const hooks = {
      open: { url: 'trackopen.com' },
      click: { url: 'trackclick.com' }
    };

    it('fetches all webhooks', async () => {
      api.get('/v3/domains/domain.com/webhooks').reply(200, {
        webhooks: hooks
      });

      const webhooks: WebhookList = await client.list('domain.com', {});
      expect(webhooks).toEqual(hooks);
    });
  });

  describe('get', () => {
    it('fetches single webhook', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          url: 'trackclick.com',
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      expect(webhook).toEqual({ id: 'clicked', url: 'trackclick.com', urls: ['trackclick.com'] });
    });

    it('fetches single webhook with multiple urls', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          urls: ['trackclick.com', 'trackclick1.com']
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      expect(webhook).toEqual({ id: 'clicked', url: 'trackclick.com', urls: ['trackclick.com', 'trackclick1.com'] });
    });

    it('sets url to undefined if no urls', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          urls: []
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      expect(webhook).toEqual({ id: 'clicked', url: undefined, urls: [] });
    });
  });

  describe('create', () => {
    it('creates webhook', async () => {
      api.post('/v3/domains/domain.com/webhooks')
        .reply(200, {
          message: 'Webhook has been created',
          webhook: {
            url: 'trackclick.com'
          }
        });

      const webhook: WebhookResult = await client.create('domain.com', 'click', 'trackclick.com', false) as WebhookResult;
      expect(webhook).toEqual({ id: 'click', url: 'trackclick.com', urls: ['trackclick.com'] });
    });

    it('tests webhook', async () => {
      api.put('/v3/domains/domain.com/webhooks/click/test')
        .reply(200, {
          code: '500',
          message: 'Hi!'
        });

      const testResult: WebhookValidationResponse = await client.create('domain.com', 'click', 'trackclick.com', true) as WebhookValidationResponse;
      expect(testResult).toEqual({ code: '500', message: 'Hi!' });
    });
  });

  describe('update', () => {
    it('updates webhook', async () => {
      api.put('/v3/domains/domain.com/webhooks/click')
        .reply(200, {
          message: 'Webhook has been updated',
          webhook: {
            url: 'trackclick.com'
          }
        });

      const webhook: WebhookResult = await client.update('domain.com', 'click', 'trackclick.com');
      expect(webhook).toEqual({ id: 'click', url: 'trackclick.com', urls: ['trackclick.com'] });
    });

    it('updates webhook with multiple urls', async () => {
      const urls = ['trackclick.com', 'trackclick1.com', 'trackclick2.com'];
      api.put('/v3/domains/domain.com/webhooks/click')
        .reply(200, {
          message: 'Webhook has been updated',
          webhook: {
            urls
          }
        });

      const webhook: WebhookResult = await client.update('domain.com', 'click', urls);
      expect(webhook).toEqual({ id: 'click', url: 'trackclick.com', urls });
    });
  });

  describe('destroy', () => {
    it('deletes webhook', async () => {
      api.delete('/v3/domains/domain.com/webhooks/click').reply(200, {
        message: 'Webhook has been deleted',
        webhook: {
          url: 'trackclick.com',
        }
      });

      const webhook: WebhookResult = await client.destroy('domain.com', 'click');
      expect(webhook).toEqual({ id: 'click', url: 'trackclick.com', urls: ['trackclick.com'] });
    });
  });
});
