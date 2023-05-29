import APIError from './common/Error';
import { APIErrorOptions } from '../Types/Common';
import {
  MailgunMessageData,
  MessagesSendAPIResponse,
  MessagesSendResult
} from '../Types/Messages';
import Request from './common/Request';
import { IMessagesClient } from '../Interfaces';

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

    if (!data || Object.keys(data).length === 0) {
      throw new APIError({
        status: 400,
        message: 'Message data object can not be empty'
      } as APIErrorOptions);
    }
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
    if (data.message) {
      return this.request.postWithFD(`/v3/${domain}/messages.mime`, data)
        .then(this._parseResponse);
    }

    const modifiedData = this.prepareBooleanValues(data);
    return this.request.postWithFD(`/v3/${domain}/messages`, modifiedData)
      .then(this._parseResponse);
  }
}
