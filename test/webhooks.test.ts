const formData = require('form-data');

import nock from 'nock';
import Request from '../lib/request';
import WebhookClient from '../lib/webhooks';
import RequestOptions from '../lib/interfaces/RequestOptions';

describe('WebhookClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new WebhookClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    const hooks = {
      open: { url: 'trackopen.com' },
      click: { url: 'trackclick.com' }
    };

    it('fetches all webhooks', function () {
      api.get('/v2/domains/domain.com/webhooks').reply(200, {
        webhooks: hooks
      });

      return client.list('domain.com').then(function (webhooks: any) {
        webhooks.should.eql(hooks);
      });
    });
  });

  describe('get', function () {
    it('fetches single webhook', function () {
      api.get('/v2/domains/domain.com/webhooks/click').reply(200, {
        webhook: {
          url: 'trackclick.com'
        }
      });

      return client.get('domain.com', 'click').then(function (webhook: any) {
        webhook.should.eql({ id: 'click', url: 'trackclick.com' });
      });
    });
  });

  describe('create', function () {
    it('creates webhook', function () {
      api.post('/v2/domains/domain.com/webhooks')
        .reply(200, {
          message: 'Webhook has been created',
          webhook: {
            url: 'trackclick.com'
          }
        });

      return client.create('domain.com', 'click', 'trackclick.com')
        .then(function (webhook: any) {
          webhook.should.eql({ id: 'click', url: 'trackclick.com' });
        });
    });

    it('tests webhook', function () {
      api.put('/v2/domains/domain.com/webhooks/click/test')
        .reply(200, {
          code: '500',
          message: 'Hi!'
        });

      return client.create('domain.com', 'click', 'trackclick.com', true)
        .then(function (test: any) {
          test.should.eql({ code: '500', message: 'Hi!' });
        });
    });
  });

  describe('update', function () {
    it('updates webhook', function () {
      api.put('/v2/domains/domain.com/webhooks/click')
        .reply(200, {
          message: 'Webhook has been updated',
          webhook: {
            url: 'trackclick.com'
          }
        });

      return client.update('domain.com', 'click', 'trackclick.com').then(function (webhook: any) {
        webhook.should.eql({ id: 'click', url: 'trackclick.com' });
      });
    });
  });

  describe('destroy', function () {
    it('deletes webhook', function () {
      api.delete('/v2/domains/domain.com/webhooks/click').reply(200, {
        message: 'Webhook has been deleted',
        webhook: {
          url: 'trackclick.com'
        }
      });

      return client.destroy('domain.com', 'click', { url: 'trackclick.com' }).then(function (webhook: any) {
        webhook.should.eql({ id: 'click', url: 'trackclick.com' });
      });
    });
  });
});
