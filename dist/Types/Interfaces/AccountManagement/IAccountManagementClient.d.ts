import { AccountFeatureInput, AccountSettings, ResponseWithSigninKey, MessageResponseWithStatus, AuthorizedRecipientResult, AuthorizedRecipientsResult, SuccessResult } from '../../Types/index.js';
export interface IAccountManagementClient {
    updateAccountSettings(settingsObj: AccountSettings): Promise<MessageResponseWithStatus>;
    getWebhookSigningKey(): Promise<Omit<ResponseWithSigninKey, 'message'>>;
    createWebhookSigningKey(): Promise<MessageResponseWithStatus>;
    getSandboxAuthorizedRecipients(): Promise<AuthorizedRecipientsResult>;
    addSandboxAuthorizedRecipient(email: string): Promise<AuthorizedRecipientResult>;
    removeSandboxAuthorizedRecipient(email: string): Promise<MessageResponseWithStatus>;
    resendActivationEmail(): Promise<SuccessResult>;
    updateAccountFeature(data: AccountFeatureInput): Promise<SuccessResult>;
}
