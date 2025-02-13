import { MailgunMessageData, MessagesSendResult } from '../../Types/Messages/index.js';
export interface IMessagesClient {
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
