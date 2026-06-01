import { MessageResponseWithStatus } from '../Common/ApiResponse.js';
export type AccountSettings = {
    name?: string;
    inactive_session_timeout?: number;
    absolute_session_timeout?: number;
    logout_redirect_url?: string;
};
export type EmailQuery = {
    email: string;
};
export type AccountFeatureInput = {
    webhooks_redact_pii?: {
        enabled: boolean;
    };
    ai_insights?: {
        enabled: boolean;
    };
};
export type AccountFeatureData = {
    webhooks_redact_pii?: string;
    ai_insights?: string;
};
export type ResponseWithSigninKey = MessageResponseWithStatus & {
    http_signing_key: string;
};
export type AuthorizedRecipient = {
    email: string;
    activated: boolean;
};
export type AuthorizedRecipientsResult = {
    recipients: Array<AuthorizedRecipient>;
    status: number;
};
export type AuthorizedRecipientResult = {
    limit: number;
    recipient: AuthorizedRecipient;
    status: number;
};
