import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import getTestFormData from './test-utils/TestFormData.js';
import DKIMManagementClient from '../../lib/Classes/DKIM/DKIMManagment';
import { RequestOptions } from '../../lib/definitions.js';

describe('DKIMManagementClient', function () {
  let client: DKIMManagementClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new DKIMManagementClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('update', function () {
    it('updates DKIM rotation with DKIMRotationData and returns full response', async () => {
      const domain = 'testDomain.com';
      const data = { rotation_enabled: true };
      const apiResponse = {
        message: 'Rotation updated',
        rotation_enabled: true,
        next_rotation: '2026-01-01T00:00:00Z',
        last_rotated: '2025-12-01T00:00:00Z',
        domain
      };
      api.put(`/v1/dkim_management/domains/${domain}/rotation`).reply(200, apiResponse);

      const res = await client.update(domain, data);
      expect(res).toMatchObject(apiResponse);
    });
  });

  describe('rotateImmediately', function () {
    it('rotates DKIM immediately', async () => {
      const domain = 'testDomain.com';
      api.post(`/v1/dkim_management/domains/${domain}/rotate`).reply(200, { message: 'Rotated' });

      const res = await client.rotateImmediately(domain);
      expect(res).toMatchObject({ message: 'Rotated' });
    });
  });
});
