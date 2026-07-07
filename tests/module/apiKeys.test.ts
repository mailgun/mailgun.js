import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import APIKeysClient from '../../lib/Classes/APIKeys/APIKeysClient.js';
import { RequestOptions } from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('APIKeysClient', function () {
  let client: APIKeysClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new APIKeysClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches API keys with a domain and kind query', async () => {
      api.get('/v1/keys').query({ domain_name: 'example.com', kind: 'domain' }).reply(200, {
        total_count: 2,
        items: [
          {
            id: 'key-1',
            description: 'Primary domain key',
            kind: 'domain',
            role: 'admin',
            created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
            updated_at: 'Mon, 12 Oct 2021 17:30:06 -0000',
            expires_at: 'Mon, 13 Oct 2021 17:30:06 -0000',
            disabled_reason: null,
            is_disabled: false,
            domain_name: 'example.com',
            requestor: null,
            user_name: null
          },
          {
            id: 'key-2',
            description: 'Secondary key',
            kind: 'user',
            role: 'sending',
            created_at: 'Tue, 12 Oct 2021 17:30:06 -0000',
            updated_at: 'Tue, 12 Oct 2021 17:30:06 -0000',
            disabled_reason: null,
            is_disabled: false,
            domain_name: null,
            requestor: 'admin@example.com',
            user_name: 'admin'
          }
        ]
      });

      const response = await client.list({ domain_name: 'example.com', kind: 'domain' });

      expect(response.status).toBe(200);
      expect(response.totalCount).toBe(2);
      expect(response.items).toHaveLength(2);
      expect(response.items[0]).toMatchObject({
        id: 'key-1',
        description: 'Primary domain key',
        kind: 'domain',
        role: 'admin',
        domain_name: 'example.com'
      });
      expect(response.items[0].created_at).toBeInstanceOf(Date);
      expect(response.items[0].expires_at).toBeInstanceOf(Date);
      expect(response.items[1].expires_at).toBeUndefined();
    });

    it('handles an empty query object', async () => {
      api.get('/v1/keys').reply(200, {
        total_count: 0,
        items: []
      });

      const response = await client.list({});

      expect(response.status).toBe(200);
      expect(response.totalCount).toBe(0);
      expect(response.items).toEqual([]);
    });
  });

  describe('create', function () {
    it('creates an API key with a complete payload', async () => {
      const payload = {
        domain_name: 'example.com',
        kind: 'domain' as const,
        description: 'Domain key',
        expiration: '3600',
        role: 'admin',
        user_id: 'user-123',
        user_name: 'jane',
        email: 'jane@example.com'
      };

      api.post('/v1/keys').reply(200, {
        id: 'key-3',
        description: 'Domain key',
        kind: 'domain',
        role: 'admin',
        created_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
        updated_at: 'Mon, 11 Oct 2021 17:30:06 -0000',
        expires_at: 'Mon, 12 Oct 2021 17:30:06 -0000',
        disabled_reason: null,
        is_disabled: false,
        domain_name: 'example.com',
        requestor: null,
        user_name: 'jane'
      });

      const response = await client.create(payload);

      expect(response).toMatchObject({
        id: 'key-3',
        description: 'Domain key',
        kind: 'domain',
        role: 'admin',
        domain_name: 'example.com',
        user_name: 'jane'
      });
      expect(response.created_at).toBeInstanceOf(Date);
      expect(response.updated_at).toBeInstanceOf(Date);
      expect(response.expires_at).toBeInstanceOf(Date);
    });

    it('creates an API key with a minimal payload', async () => {
      const payload = {
        role: 'sending'
      };

      api.post('/v1/keys').reply(200, {
        id: 'key-4',
        description: 'Sending key',
        kind: 'user',
        role: 'sending',
        created_at: 'Wed, 13 Oct 2021 17:30:06 -0000',
        updated_at: 'Wed, 13 Oct 2021 17:30:06 -0000',
        disabled_reason: null,
        is_disabled: false,
        domain_name: null,
        requestor: 'admin@example.com',
        user_name: 'admin'
      });

      const response = await client.create(payload);

      expect(response).toMatchObject({
        id: 'key-4',
        description: 'Sending key',
        kind: 'user',
        role: 'sending',
        domain_name: null,
        user_name: 'admin'
      });
      expect(response.created_at).toBeInstanceOf(Date);
      expect(response.updated_at).toBeInstanceOf(Date);
      expect(response.expires_at).toBeUndefined();
    });
  });

  describe('destroy', function () {
    it('deletes an API key', async () => {
      api.delete('/v1/keys/key-123').reply(200, {
        message: 'API key deleted'
      });

      const response = await client.destroy('key-123');

      expect(response).toMatchObject({
        status: 200,
        message: 'API key deleted'
      });
    });

    it('throws when keyId is missing', async () => {
      await expect(client.destroy('')).rejects.toThrow('Missing keyId');
    });
  });

  describe('regeneratePublicKey', function () {
    it('regenerates a public key', async () => {
      api.post('/v1/keys/public').reply(200, {
        message: 'Public key regenerated',
        key: 'pub-key-123'
      });

      const response = await client.regeneratePublicKey();

      expect(response).toMatchObject({
        status: 200,
        message: 'Public key regenerated',
        key: 'pub-key-123'
      });
    });
  });
});
