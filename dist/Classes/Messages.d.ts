import { MailgunMessageData, MessagesSendAPIResponse, MessagesSendResult } from '../Types/Messages';
import Request from './common/Request';
export default class MessagesClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult;
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
