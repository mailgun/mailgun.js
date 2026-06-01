import {
  AccountFeatureData,
  AccountFeatureInput,
  AccountSettings,
  ResponseWithSigninKey,
  MessageResponseWithStatus,
  AuthorizedRecipientsResult,
  AuthorizedRecipientResult,
  SuccessResult
} from '../../Types/index.js';
import { IAccountManagementClient } from '../../Interfaces/index.js';
import Request from '../common/Request.js';
import APIError from '../common/Error.js';

export default class AccountManagementClient implements IAccountManagementClient {
  request: Request;
  private path: string;
  private allowedKeysAF: Set<string>;

  constructor(request: Request) {
    this.request = request;
    this.path = '/v5/accounts';
    this.allowedKeysAF = new Set(['webhooks_redact_pii', 'ai_insights']);
  }

  // Update variable account settings
  async updateAccountSettings(settingsObj: AccountSettings): Promise<MessageResponseWithStatus> {
    const response = await this.request.put(`${this.path}`, settingsObj);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Get webhook signing key saved on the account
  async getWebhookSigningKey(): Promise<ResponseWithSigninKey> {
    const response = await this.request.get(`${this.path}/http_signing_key`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Create or regenerate webhook signing key on an account
  async createWebhookSigningKey(): Promise<ResponseWithSigninKey> {
    const response = await this.request.post(`${this.path}/http_signing_key`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Get webhook signing key saved on the account
  async getSandboxAuthorizedRecipients(): Promise<AuthorizedRecipientsResult> {
    const response = await this.request.get('/v5/sandbox/auth_recipients');
    return {
      status: response.status,
      ...response.body
    };
  }

  // Add authorized email recipient for a sandbox domain
  async addSandboxAuthorizedRecipient(email: string): Promise<AuthorizedRecipientResult> {
    const response = await this.request.post(`/v5/sandbox/auth_recipients?email=${email}`, {});
    return {
      status: response.status,
      ...response.body
    };
  }

  // Remove an authorized sandbox domain email recipient
  async removeSandboxAuthorizedRecipient(email: string): Promise<MessageResponseWithStatus> {
    const response = await this.request.delete(`/v5/sandbox/auth_recipients/${email}`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Resend account activation email to the account owner
  async resendActivationEmail(): Promise<SuccessResult> {
    const response = await this.request.post(`${this.path}/resend_activation_email`);
    return response.body;
  }

  // Update account feature
  async updateAccountFeature(data: AccountFeatureInput): Promise<SuccessResult> {
    const reqData: AccountFeatureData = Object.entries(data).reduce((acc, currentValue) => {
      const [key, value] = currentValue;
      try {
        if (!this.allowedKeysAF.has(key)) {
          throw new Error(`Forbidden property "${key}". Allowed properties are ${this.allowedKeysAF.values()}`);
        }

        if (!value || typeof value !== 'object' || Object.keys(value).length !== 1 || !('enabled' in value)) {
          throw new Error(`Incorrect value ${value}`);
        }

        const strVal = JSON.stringify(value);
        acc[key as keyof AccountFeatureInput] = strVal;
        return acc;
      } catch (error) {
        throw APIError.getUserDataError(
          (error as Error).message,
          `The "${key}" property expects JS object value with "enable" property in it. See AccountFeatureInput type.`
        );
      }
    }, {} as AccountFeatureData);
    const response = await this.request.put(`${this.path}/features`, reqData);
    return response.body;
  }
}
