import { MailgunMessageData, MessagesSendAPIResponse, MessagesSendResult } from './interfaces/Messages';
import Request from './request';
export default class MessagesClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult;
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
