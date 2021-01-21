import urljoin from 'url-join';
import Request from './request';

class Webhook {
  id: string;
  url: string;

  constructor(id: string, data: { url: string }) {
    this.id = id;
    this.url = data.url;
  }
}

export default class WebhookClient {
  request: any;

  constructor(request: Request) {
    this.request = request;
  }

  _parseWebhookList(response: { body: { webhooks: any } }) {
    return response.body.webhooks;
  }

  _parseWebhookWithID(id: string) {
    return function (response: { body: { webhook: any } }) {
      return new Webhook(id, response.body.webhook);
    };
  }

  _parseWebhookTest(response: { body: { code: number, message: string } }) {
    return { code: response.body.code, message: response.body.message };
  }

  list(domain: string, query: any) {
    return this.request.get(urljoin('/v2/domains', domain, 'webhooks'), query)
      .then(this._parseWebhookList);
  }

  get(domain: string, id: string) {
    return this.request.get(urljoin('/v2/domains', domain, 'webhooks', id))
      .then(this._parseWebhookWithID(id));
  }

  create(domain: string, id: string, url: string, test: boolean) {
    if (test) {
      return this.request.put(urljoin('/v2/domains', domain, 'webhooks', id, 'test'), { url })
        .then(this._parseWebhookTest);
    }

    return this.request.post(urljoin('/v2/domains', domain, 'webhooks'), { id, url })
      .then(this._parseWebhookWithID(id));
  }

  update(domain: string, id: string, url: string,) {
    return this.request.put(urljoin('/v2/domains', domain, 'webhooks', id), { url })
      .then(this._parseWebhookWithID(id));
  }

  destroy(domain: string, id: string) {
    return this.request.delete(urljoin('/v2/domains', domain, 'webhooks', id))
      .then(this._parseWebhookWithID(id));
  }
}
