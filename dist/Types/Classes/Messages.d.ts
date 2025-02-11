import { MailgunMessageData, MessagesSendAPIResponse, MessagesSendResult } from '../Types';
import Request from './common/Request';
import { IMessagesClient } from '../Interfaces';
export default class MessagesClient implements IMessagesClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult;
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
