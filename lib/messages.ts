import {
  MailgunMessageData,
  MessagesSendAPIResponse,
  MessagesSendResult
} from './interfaces/Messages';
import Request from './request';

export default class MessagesClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
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

    return this.request.postWithFD(`/v3/${domain}/messages`, data)
      .then(this._parseResponse);
  }
}
