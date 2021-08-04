import urljoin from 'url-join';
import { WebhookList, WebhookResponse, WebhooksQuery } from './interfaces/Webhooks';
import Request from './request';

class Webhook {
  id: string;
  url: string;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
  }
}

export default class WebhookClient {
  request: any;

  constructor(request: Request) {
    this.request = request;
  }

  _parseWebhookList(response: { body: { webhooks: WebhookList } }): WebhookList {
    return response.body.webhooks;
  }

  _parseWebhookWithID(id: string) {
    return function (response: WebhookResponse): Webhook {
      const webhookResponse = response?.body?.webhook;
      let url = webhookResponse?.url;
      if (!url) {
        url = webhookResponse?.urls && webhookResponse.urls.length ? webhookResponse.urls[0] : null;
      }
      return new Webhook(id, url);
    };
  }

  _parseWebhookTest(response: { body: { code: number, message: string } })
  : {code: number, message:string} {
    return { code: response.body.code, message: response.body.message };
  }

  list(domain: string, query: WebhooksQuery): Promise<WebhookList> {
    return this.request.get(urljoin('/v2/domains', domain, 'webhooks'), query)
      .then(this._parseWebhookList);
  }

  get(domain: string, id: string): Promise<Webhook> {
    return this.request.get(urljoin('/v2/domains', domain, 'webhooks', id))
      .then(this._parseWebhookWithID(id));
  }

  create(domain: string, id: string, url: string, test = false): Promise<Webhook> {
    if (test) {
      return this.request.putWithFD(urljoin('/v2/domains', domain, 'webhooks', id, 'test'), { url })
        .then(this._parseWebhookTest);
    }

    return this.request.postWithFD(urljoin('/v2/domains', domain, 'webhooks'), { id, url })
      .then(this._parseWebhookWithID(id));
  }

  update(domain: string, id: string, url: string): Promise<Webhook> {
    return this.request.putWithFD(urljoin('/v2/domains', domain, 'webhooks', id), { url })
      .then(this._parseWebhookWithID(id));
  }

  destroy(domain: string, id: string) : Promise<Webhook> {
    return this.request.delete(urljoin('/v2/domains', domain, 'webhooks', id))
      .then(this._parseWebhookWithID(id));
  }
}
