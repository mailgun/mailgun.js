import { AccountFeatureInput, AccountSettings, ResponseWithSigninKey, MessageResponseWithStatus, AuthorizedRecipientsResult, AuthorizedRecipientResult, SuccessResult } from '../../Types/index.js';
import { IAccountManagementClient } from '../../Interfaces/index.js';
import Request from '../common/Request.js';
export default class AccountManagementClient implements IAccountManagementClient {
    request: Request;
    private path;
    private allowedKeysAF;
    constructor(request: Request);
    updateAccountSettings(settingsObj: AccountSettings): Promise<MessageResponseWithStatus>;
    getWebhookSigningKey(): Promise<Omit<ResponseWithSigninKey, 'message'>>;
    createWebhookSigningKey(): Promise<ResponseWithSigninKey>;
    getSandboxAuthorizedRecipients(): Promise<AuthorizedRecipientsResult>;
    addSandboxAuthorizedRecipient(email: string): Promise<AuthorizedRecipientResult>;
    removeSandboxAuthorizedRecipient(email: string): Promise<MessageResponseWithStatus>;
    resendActivationEmail(): Promise<SuccessResult>;
    updateAccountFeature(data: AccountFeatureInput): Promise<SuccessResult>;
}
