import formData from 'form-data';

import nock from 'nock';
import Request from '../../lib/Classes/common/Request.js';

import {
  InputFormData, RequestOptions,
  SubaccountListItem,
} from '../../lib/Types/index.js';

import SubaccountsClient from '../../lib/Classes/Subaccounts.js';

describe('SubaccountsClient', function () {
  let client: SubaccountsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new SubaccountsClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all subaccounts', async () => {
      const subaccounts: SubaccountListItem[] = [
        { id: 'XYZ', name: 'test.subaccount1', status: 'open' },
        { id: 'YYY', name: 'test.subaccount2', status: 'open' }
      ];

      api.get('/v5/accounts/subaccounts').reply(200, { subaccounts, total: 2 });
      const subacc = await client.list();
      expect(subacc).toMatchObject({
        subaccounts: expect.any(Array),
        total: 2
      });
      expect(subacc.subaccounts).toHaveLength(2);
      expect(subacc.subaccounts[0]).toMatchObject({ id: 'XYZ', name: 'test.subaccount1', status: 'open' });
    });
  });

  describe('get', function () {
    it('gets a specific subaccount', async () => {
      const subaccountData: SubaccountListItem = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.get('/v5/accounts/subaccounts/XYZ').reply(200, { subaccount: subaccountData });
      const subaccount = await client.get('XYZ');
      expect(subaccount).toMatchObject({
        subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
      });
    });
  });

  describe('create', function () {
    it('creates a subaccount', async () => {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.post('/v5/accounts/subaccounts').reply(200, { subaccount: subaccountData });
      const subAccount = await client.create('test.subaccount1');
      expect(subAccount).toMatchObject({
        subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
      });
    });
  });

  describe('enable', function () {
    it('enables a subaccount', async () => {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.post('/v5/accounts/subaccounts/XYZ/enable').reply(200, { subaccount: subaccountData });
      const subAccount = await client.enable('XYZ');
      expect(subAccount).toMatchObject({
        subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
      });
    });
  });

  describe('disable', function () {
    it('disables a subaccount', async () => {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'disabled' };

      api.post('/v5/accounts/subaccounts/XYZ/disable').reply(200, { subaccount: subaccountData });
      const subAccount = await client.disable('XYZ');
      expect(subAccount).toMatchObject({
        subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'disabled' }
      });
    });
  });
});
