import { ClearMessagesQueueResult, MailgunMessageData, MessagesQueueStatusResult, MessagesSendAPIResponse, MessagesSendResult, StoredEmailResponse } from '../Types/index.js';
import Request from './common/Request.js';
import { IMessagesClient } from '../Interfaces/index.js';
export default class MessagesClient implements IMessagesClient {
    request: Request;
    constructor(request: Request);
    private prepareBooleanValues;
    _parseResponse(response: MessagesSendAPIResponse): MessagesSendResult;
    create(domain: string, data: MailgunMessageData): Promise<MessagesSendResult>;
    retrieveStoredEmail(domain: string, storageKey: string): Promise<StoredEmailResponse>;
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
    resendEmail(domain: string, storageKey: string, recipients: string): Promise<MessagesSendResult>;
    getMessagesQueueStatus(domain: string): Promise<MessagesQueueStatusResult>;
    /** Deletes all scheduled and undelivered mail from the domain queue.
     * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages/delete-v3--domain-name--envelopes
    */
    clearMessagesQueue(domain: string, storageUrl: string): Promise<ClearMessagesQueueResult>;
}
