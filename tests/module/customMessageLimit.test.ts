import nock from 'nock';
import { ICustomMessageLimitClient } from '../../lib/Interfaces/CustomMessageLimit/ICustomMessageLimitClient.js';
import Request from './test-utils/TestRequest.js';
import CustomMessageLimitClient from '../../lib/Classes/CustomMessageLimit/CustomMessageLimit.js';
import { RequestOptions } from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('CustomMessageLimitClient', function () {
  let client: ICustomMessageLimitClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new CustomMessageLimitClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', function () {
    it('fetches the custom message limit', async () => {
      api.get('/v5/accounts/limit/custom/monthly').reply(200, {
        limit: 2000,
        enabled: false,
        period: '1m'
      });

      const res = await client.get();

      expect(res).toMatchObject({
        limit: 2000,
        enabled: false,
        period: '1m'
      });
    });
  });

  describe('set', function () {
    it('sets the custom message limit', async () => {
      api.put('/v5/accounts/limit/custom/monthly?limit=2001').reply(200, {
        success: true
      });

      const res = await client.set(2001);

      expect(res).toMatchObject({
        success: true
      });
    });
  });

  describe('destroy', function () {
    it('deletes the custom message limit', async () => {
      api.delete('/v5/accounts/limit/custom/monthly').reply(200, {
        success: true
      });

      const res = await client.destroy();

      expect(res).toMatchObject({
        success: true
      });
    });
  });

  describe('enable', function () {
    it('enables the custom message limit', async () => {
      api.put('/v5/accounts/limit/custom/enable').reply(200, {
        success: true
      });

      const res = await client.enable();

      expect(res).toMatchObject({
        success: true
      });
    });
  });
});
