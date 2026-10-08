import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import UsersClient from '../../lib/Classes/Users/UsersClient.js';
import { UserRoles } from '../../lib/Enums/index.js';
import { RequestOptions, UserResponse } from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('UsersClient', function () {
  let client: UsersClient;
  let api: nock.Scope;

  const user: UserResponse = {
    id: 'user-123',
    activated: true,
    name: 'Jane Doe',
    is_disabled: false,
    email: 'jane@example.com',
    email_details: {
      address: 'jane@example.com',
      is_valid: true,
      parts: {
        local_part: 'jane',
        domain: 'example.com'
      }
    },
    role: UserRoles.ADMIN,
    account_id: 'account-123',
    is_master: false,
    metadata: {},
    tfa_enabled: true,
    tfa_active: true,
    tfa_created_at: '2024-01-02T03:04:05.000Z',
    password_updated_at: '2024-02-03T04:05:06.000Z',
    preferences: {
      programming_language: 'javascript',
      time_format: '24h',
      time_zone: 'UTC'
    },
    auth: {
      method: 'password',
      prior_details: {}
    },
    github_user_id: null,
    salesforce_user_id: null,
    migration_status: 'complete'
  };

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new UsersClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches users with query parameters and formats date fields', async () => {
      const query = { role: UserRoles.ADMIN, limit: 10, skip: 5 };
      api.get('/v5/users')
        .query({ role: 'admin', limit: '10', skip: '5' })
        .reply(200, {
          users: [user],
          total: 1
        });

      const response = await client.list(query);

      expect(response.status).toBe(200);
      expect(response.total).toBe(1);
      expect(response.users).toHaveLength(1);
      expect(response.users[0]).toMatchObject({
        id: user.id,
        email: user.email,
        role: user.role,
        tfa_created_at: new Date(user.tfa_created_at as string),
        password_updated_at: new Date(user.password_updated_at as string)
      });
      expect(response.users[0].tfa_created_at).toBeInstanceOf(Date);
      expect(response.users[0].password_updated_at).toBeInstanceOf(Date);
    });

    it('handles an empty users list', async () => {
      api.get('/v5/users').reply(200, { users: [], total: 0 });

      const response = await client.list();

      expect(response).toMatchObject({
        status: 200,
        users: [],
        total: 0
      });
    });
  });

  describe('get', function () {
    it('fetches a user by id and converts missing dates to null', async () => {
      api.get('/v5/users/user-123').reply(200, {
        ...user,
        tfa_created_at: null,
        password_updated_at: null
      });

      const response = await client.get('user-123');

      expect(response).toMatchObject({
        id: user.id,
        email: user.email,
        tfa_created_at: null,
        password_updated_at: null
      });
    });
  });

  describe('me', function () {
    it('fetches the current user and formats date fields', async () => {
      api.get('/v5/users/me').reply(200, user);

      const response = await client.me();

      expect(response.id).toBe(user.id);
      expect(response.tfa_created_at).toEqual(new Date(user.tfa_created_at as string));
      expect(response.password_updated_at).toEqual(new Date(user.password_updated_at as string));
    });
  });
});
