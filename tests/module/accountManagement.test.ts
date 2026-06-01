import nock from 'nock';
import Request from './test-utils/TestRequest.js';

import {
  RequestOptions,
  AccountSettings,
  AccountFeatureInput,
} from '../../lib/Types/index.js';

import AccountManagementClient from '../../lib/Classes/AccountManagement/AccountManagement.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('AccountManagementClient', function () {
  let client: AccountManagementClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request(
      { url: 'https://api.mailgun.net' } as RequestOptions,
      getTestFormData()
    );
    client = new AccountManagementClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('updateAccountSettings', function () {
    it('updates account settings', async () => {
      const settings: AccountSettings = {
        name: 'Test Account',
        inactive_session_timeout: 3600,
        absolute_session_timeout: 86400,
        logout_redirect_url: 'https://example.com/logout',
      };

      api.put('/v5/accounts', settings).reply(200, {
        message: 'Account settings updated',
      });

      const response = await client.updateAccountSettings(settings);
      expect(response).toMatchObject({
        status: 200,
        message: 'Account settings updated',
      });
    });

    it('updates account name only', async () => {
      const settings: AccountSettings = {
        name: 'New Account Name',
      };

      api.put('/v5/accounts', settings).reply(200, {
        message: 'Account updated',
      });

      const response = await client.updateAccountSettings(settings);
      expect(response).toMatchObject({
        status: 200,
        message: 'Account updated',
      });
    });

    it('updates session timeout settings', async () => {
      const settings: AccountSettings = {
        inactive_session_timeout: 1800,
        absolute_session_timeout: 43200,
      };

      api.put('/v5/accounts', settings).reply(200, {
        message: 'Session timeout updated',
      });

      const response = await client.updateAccountSettings(settings);
      expect(response.status).toBe(200);
    });
  });

  describe('getWebhookSigningKey', function () {
    it('retrieves webhook signing key', async () => {
      const signingKey = 'key_1234567890abcdef';

      api.get('/v5/accounts/http_signing_key').reply(200, {
        http_signing_key: signingKey,
      });

      const response = await client.getWebhookSigningKey();
      expect(response).toMatchObject({
        status: 200,
        http_signing_key: signingKey,
      });
    });
  });

  describe('createWebhookSigningKey', function () {
    it('creates a new webhook signing key', async () => {
      const newKey = 'key_new1234567890abcdef';

      api.post('/v5/accounts/http_signing_key').reply(200, {
        http_signing_key: newKey,
        message: 'Webhook signing key created',
      });

      const response = await client.createWebhookSigningKey();
      expect(response).toMatchObject({
        status: 200,
        http_signing_key: newKey,
        message: 'Webhook signing key created',
      });
    });

    it('regenerates existing webhook signing key', async () => {
      const regeneratedKey = 'key_regenerated1234567890';

      api.post('/v5/accounts/http_signing_key').reply(200, {
        http_signing_key: regeneratedKey,
        message: 'Webhook signing key regenerated',
      });

      const response = await client.createWebhookSigningKey();
      expect(response.http_signing_key).toBe(regeneratedKey);
    });
  });

  describe('getSandboxAuthorizedRecipients', function () {
    it('retrieves all authorized sandbox recipients', async () => {
      const recipients = [
        { email: 'test1@example.com', activated: true },
        { email: 'test2@example.com', activated: false },
      ];

      api.get('/v5/sandbox/auth_recipients').reply(200, {
        recipients,
      });

      const response = await client.getSandboxAuthorizedRecipients();
      expect(response).toMatchObject({
        status: 200,
        recipients: expect.any(Array),
      });
      expect(response.recipients).toHaveLength(2);
      expect(response.recipients[0]).toMatchObject({
        email: 'test1@example.com',
        activated: true,
      });
    });

    it('handles empty recipients list', async () => {
      api.get('/v5/sandbox/auth_recipients').reply(200, {
        recipients: [],
      });

      const response = await client.getSandboxAuthorizedRecipients();
      expect(response.recipients).toHaveLength(0);
    });
  });

  describe('addSandboxAuthorizedRecipient', function () {
    it('adds a sandbox authorized recipient', async () => {
      const email = 'newrecipient@example.com';
      const recipient = { email, activated: false };

      api.post('/v5/sandbox/auth_recipients').query({ email }).reply(200, {
        limit: 100,
        recipient,
      });

      const response = await client.addSandboxAuthorizedRecipient(email);
      expect(response).toMatchObject({
        status: 200,
        limit: 100,
        recipient: {
          email,
          activated: false,
        },
      });
    });

    it('adds recipient with different email domain', async () => {
      const email = 'another@different.org';
      const recipient = { email, activated: false };

      api.post('/v5/sandbox/auth_recipients').query({ email }).reply(200, {
        limit: 100,
        recipient,
      });

      const response = await client.addSandboxAuthorizedRecipient(email);
      expect(response.recipient.email).toBe(email);
    });
  });

  describe('removeSandboxAuthorizedRecipient', function () {
    it('removes an authorized sandbox recipient', async () => {
      const email = 'remove@example.com';

      api.delete('/v5/sandbox/auth_recipients/remove@example.com').reply(200, {
        message: 'Recipient removed',
      });

      const response = await client.removeSandboxAuthorizedRecipient(email);
      expect(response).toMatchObject({
        status: 200,
        message: 'Recipient removed',
      });
    });

    it('removes another authorized recipient', async () => {
      const email = 'delete@domain.io';

      api.delete('/v5/sandbox/auth_recipients/delete@domain.io').reply(200, {
        message: 'Recipient removed successfully',
      });

      const response = await client.removeSandboxAuthorizedRecipient(email);
      expect(response.status).toBe(200);
    });
  });

  describe('resendActivationEmail', function () {
    it('resends account activation email', async () => {
      api.post('/v5/accounts/resend_activation_email').reply(200, {
        success: true,
        message: 'Activation email sent',
      });

      const response = await client.resendActivationEmail();
      expect(response).toMatchObject({
        success: true,
        message: 'Activation email sent',
      });
    });
  });

  describe('updateAccountFeature', function () {
    it('updates webhooks_redact_pii feature', async () => {
      const featureInput: AccountFeatureInput = {
        webhooks_redact_pii: { enabled: true },
      };

      api.put('/v5/accounts/features', {
        webhooks_redact_pii: '{"enabled":true}',
      }).reply(200, {
        success: true,
        message: 'Feature updated',
      });

      const response = await client.updateAccountFeature(featureInput);
      expect(response).toMatchObject({
        success: true,
        message: 'Feature updated',
      });
    });

    it('updates ai_insights feature', async () => {
      const featureInput: AccountFeatureInput = {
        ai_insights: { enabled: false },
      };

      api.put('/v5/accounts/features', {
        ai_insights: '{"enabled":false}',
      }).reply(200, {
        success: true,
        message: 'AI insights disabled',
      });

      const response = await client.updateAccountFeature(featureInput);
      expect(response.success).toBe(true);
    });

    it('updates multiple features at once', async () => {
      const featureInput: AccountFeatureInput = {
        webhooks_redact_pii: { enabled: true },
        ai_insights: { enabled: true },
      };

      api.put('/v5/accounts/features', {
        webhooks_redact_pii: '{"enabled":true}',
        ai_insights: '{"enabled":true}',
      }).reply(200, {
        success: true,
        message: 'Features updated',
      });

      const response = await client.updateAccountFeature(featureInput);
      expect(response.success).toBe(true);
    });

    it('throws error for invalid feature key', async () => {
      const invalidInput = {
        invalid_feature: { enabled: true },
      } as unknown as AccountFeatureInput;

      await expect(
        client.updateAccountFeature(invalidInput)
      ).rejects.toThrow();
    });

    it('throws error for invalid feature value structure', async () => {
      const invalidInput: AccountFeatureInput = {
        // @ts-expect-error testing invalid input structure
        webhooks_redact_pii: 'invalid',
      };

      await expect(
        client.updateAccountFeature(invalidInput)
      ).rejects.toThrow();
    });

    it('throws error for missing enabled property', async () => {
      const invalidInput: AccountFeatureInput = {
        // @ts-expect-error testing invalid input structure
        webhooks_redact_pii: { disabled: true },
      };

      await expect(
        client.updateAccountFeature(invalidInput)
      ).rejects.toThrow();
    });
  });
});
