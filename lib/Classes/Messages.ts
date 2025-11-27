import APIError from './common/Error.js';
import {
  ClearMessagesQueueResult,
  MailgunMessageData,
  MessagesQueueStatusAPIResponse,
  MessagesQueueStatusResult,
  MessagesSendAPIResponse,
  MessagesSendResult,
  StoredEmailResponse
} from '../Types/index.js';
import Request from './common/Request.js';
import { IMessagesClient } from '../Interfaces/index.js';

export default class MessagesClient implements IMessagesClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private prepareBooleanValues(data: MailgunMessageData): MailgunMessageData {
    const yesNoProperties = new Set([
      'o:testmode',
      't:text',
      'o:dkim',
      'o:tracking',
      'o:tracking-clicks',
      'o:tracking-opens',
      'o:require-tls',
      'o:skip-verification'
    ]);

    return Object.keys(data).reduce((acc, key) => {
      if (yesNoProperties.has(key) && typeof data[key] === 'boolean') {
        acc[key] = data[key] ? 'yes' : 'no';
      } else {
        acc[key] = data[key];
      }
      return acc;
    }, {} as MailgunMessageData);
  }

  _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult {
    return {
      status: response.status,
      ...response.body
    };
  }

  create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult> {
    if (!data || Object.keys(data).length === 0) {
      throw APIError.getUserDataError('Message data object can not be empty', 'Message data object can not be empty');
    }
    if (data.message) {
      return this.request.postWithFD(`/v3/${domain}/messages.mime`, data)
        .then(this._parseResponse);
    }

    const modifiedData = this.prepareBooleanValues(data);
    return this.request.postWithFD(`/v3/${domain}/messages`, modifiedData)
      .then(this._parseResponse);
  }

  async retrieveStoredEmail(domain: string, storageKey: string): Promise<StoredEmailResponse> {
    const res = await this.request.get(`/v3/domains/${domain}/messages/${storageKey}`);
    return res.body;
  }

  /**
   * domain: string
   * Domain name used to send the message
   *
   * storageKey: string
   * Storage key from the email's associated events
   * (Example: Accepted/Delivered events storage.key field)
   *
   * recipients: string
   * Email address of the recipient(s). You can use commas to separate multiple recipients
   */
  async resendEmail(
    domain: string,
    storageKey: string,
    recipients: string
  ): Promise<MessagesSendResult> {
    const res = await this.request.postWithFD(`/v3/domains/${domain}/messages/${storageKey}`, { to: recipients });
    return this._parseResponse(res);
  }

  async getMessagesQueueStatus(domain: string): Promise<MessagesQueueStatusResult> {
    const res = await this.request.get(`/v3/domains/${domain}/sending_queues`);
    const apiResponse: MessagesQueueStatusAPIResponse = res.body;
    const result: MessagesQueueStatusResult = {
      regular: {
        is_disabled: apiResponse.regular?.is_disabled,
        disabled: {
          until: apiResponse.regular?.disabled?.until ? new Date(apiResponse.regular.disabled.until) : '',
          reason: apiResponse.regular?.disabled?.reason || '',
        }
      },
      scheduled: {
        is_disabled: apiResponse.scheduled?.is_disabled,
        disabled: {
          until: apiResponse.scheduled?.disabled?.until ? new Date(apiResponse.scheduled.disabled.until) : '',
          reason: apiResponse.scheduled?.disabled?.reason || '',
        }
      }
    };
    return result;
  }

  /** Deletes all scheduled and undelivered mail from the domain queue.
   * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages/delete-v3--domain-name--envelopes
  */
  async clearMessagesQueue(domain: string, storageUrl: string): Promise<ClearMessagesQueueResult> {
    const allowedStorageUrls = ['storage-us-east4.api.mailgun.net', 'storage-us-west1.api.mailgun.net', 'storage-europe-west1.api.mailgun.net'];

    if (!allowedStorageUrls.includes(storageUrl)) {
      throw APIError.getUserDataError('Invalid storage URL', 'The provided storage URL is not allowed.');
    }

    const res = await this.request.command('delete', `https://${storageUrl}/v3/${domain}/envelopes`, undefined, { isStorageAPI: true });
    return res.body;
  }
}
