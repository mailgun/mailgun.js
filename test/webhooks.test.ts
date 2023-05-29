import formData from 'form-data';
import nock from 'nock';
import { WebhooksIds } from '../lib/Enums/index';
import Request from '../lib/Classes/common/Request';
import WebhooksClient from '../lib/Classes/Webhooks';
import { IWebHooksClient } from '../lib/Interfaces';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { WebhookList, WebhookResult, WebhookValidationResponse } from '../lib/Types/Webhooks';

describe('WebhooksClient', function () {
  let client: IWebHooksClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new WebhooksClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', async () => {
    const hooks = {
      open: { url: 'trackopen.com' },
      click: { url: 'trackclick.com' }
    };

    it('fetches all webhooks', async () => {
      api.get('/v3/domains/domain.com/webhooks').reply(200, {
        webhooks: hooks
      });

      const webhooks: WebhookList = await client.list('domain.com', {});
      webhooks.should.eql(hooks);
    });
  });

  describe('get', async () => {
    it('fetches single webhook', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          url: 'trackclick.com'
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      webhook.should.eql({ id: 'clicked', url: 'trackclick.com' });
    });

    it('fetches single webhook with multiple urls', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          urls: ['trackclick.com', 'trackclick1.com']
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      webhook.should.eql({ id: 'clicked', url: 'trackclick.com' });
    });

    it('sets url to undefined if no urls', async () => {
      api.get('/v3/domains/domain.com/webhooks/clicked').reply(200, {
        webhook: {
          urls: []
        }
      });

      const webhook: WebhookResult = await client.get('domain.com', WebhooksIds.CLICKED);
      webhook.should.eql({ id: 'clicked', url: undefined });
    });
  });

  describe('create', async () => {
    it('creates webhook', async () => {
      api.post('/v3/domains/domain.com/webhooks')
        .reply(200, {
          message: 'Webhook has been created',
          webhook: {
            url: 'trackclick.com'
          }
        });

      const webhook: WebhookResult = await client.create('domain.com', 'click', 'trackclick.com', false) as WebhookResult;
      webhook.should.eql({ id: 'click', url: 'trackclick.com' });
    });

    it('tests webhook', async () => {
      api.put('/v3/domains/domain.com/webhooks/click/test')
        .reply(200, {
          code: '500',
          message: 'Hi!'
        });

      const testResult: WebhookValidationResponse = await client.create('domain.com', 'click', 'trackclick.com', true) as WebhookValidationResponse;
      testResult.should.eql({ code: '500', message: 'Hi!' });
    });
  });

  describe('update', async () => {
    it('updates webhook', async () => {
      api.put('/v3/domains/domain.com/webhooks/click')
        .reply(200, {
          message: 'Webhook has been updated',
          webhook: {
            url: 'trackclick.com'
          }
        });

      const webhook: WebhookResult = await client.update('domain.com', 'click', 'trackclick.com');
      webhook.should.eql({ id: 'click', url: 'trackclick.com' });
    });
  });

  describe('destroy', async () => {
    it('deletes webhook', async () => {
      api.delete('/v3/domains/domain.com/webhooks/click').reply(200, {
        message: 'Webhook has been deleted',
        webhook: {
          url: 'trackclick.com'
        }
      });

      const webhook: WebhookResult = await client.destroy('domain.com', 'click');
      webhook.should.eql({ id: 'click', url: 'trackclick.com' });
    });
  });
});
