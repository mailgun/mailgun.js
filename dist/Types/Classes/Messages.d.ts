import { MailgunMessageData, MessagesSendAPIResponse, MessagesSendResult } from '../Types/index.js';
import Request from './common/Request.js';
import { IMessagesClient } from '../Interfaces/index.js';
export default class MessagesClient implements IMessagesClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult;
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
