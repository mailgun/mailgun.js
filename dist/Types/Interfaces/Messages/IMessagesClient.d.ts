import { MailgunMessageData, MessagesSendResult } from '../../Types/Messages';
export interface IMessagesClient {
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
}
