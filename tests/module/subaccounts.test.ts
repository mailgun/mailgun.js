import nock from 'nock';
import Request from './test-utils/TestRequest.js';

import {
  RequestOptions,
  SubaccountApiItem,
  SubaccountItem,
} from '../../lib/Types/index.js';

import SubaccountsClient from '../../lib/Classes/Subaccounts.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('SubaccountsClient', function () {
  let client: SubaccountsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new SubaccountsClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all subaccounts', async () => {
      const subaccounts: SubaccountApiItem[] = [
        {
          id: 'XYZ', name: 'test.subaccount1', status: 'open', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z', features: {}
        },
        {
          id: 'YYY', name: 'test.subaccount2', status: 'open', created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z', features: {}
        }
      ];

      api.get('/v5/accounts/subaccounts').reply(200, { subaccounts, total: 2 });
      const subacc = await client.list();
      expect(subacc).toMatchObject({
        subaccounts: expect.any(Array),
        total: 2
      });
      expect(subacc.subaccounts).toHaveLength(2);
      expect(subacc.subaccounts[0]).toMatchObject({
        id: 'XYZ',
        name: 'test.subaccount1',
        status: 'open',
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
        features: {}
      });
    });
  });

  describe('get', function () {
    it('gets a specific subaccount', async () => {
      const subaccountData: SubaccountApiItem = {
        id: 'XYZ',
        name: 'test.subaccount1',
        status: 'open',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        features: {}
      };

      api.get('/v5/accounts/subaccounts/XYZ').reply(200, { subaccount: subaccountData });
      const subaccount = await client.get('XYZ');
      expect(subaccount).toMatchObject({
        subaccount: {
          id: 'XYZ',
          name: 'test.subaccount1',
          status: 'open',
          created_at: new Date('2024-01-01T00:00:00Z'),
          updated_at: new Date('2024-01-01T00:00:00Z'),
          features: {}
        }
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

  describe('destroy', function () {
    it('destroys a subaccount', async () => {
      api.delete('/v5/accounts/subaccounts').reply(200, { message: 'Subaccount successfully deleted' });
      const subAccount = await client.destroy('XYZ');
      expect(subAccount).toMatchObject({
        message: 'Subaccount successfully deleted'
      });
    });
  });

  describe('setMonthlySendingLimit', function () {
    it('sets the monthly sending limit for a subaccount', async () => {
      api.put('/v5/accounts/subaccounts/XYZ/limit/custom/monthly').query({ limit: 1000 }).reply(200, { success: true });
      const response = await client.setMonthlySendingLimit('XYZ', 1000);
      expect(response).toMatchObject({
        success: true
      });
    });
  });

  describe('getMonthlySendingLimit', function () {
    it('gets the monthly sending limit for a subaccount', async () => {
      api.get('/v5/accounts/subaccounts/XYZ/limit/custom/monthly').reply(200, {
        limit: 1000,
        current: 200,
        period: 'monthly'
      });
      const response = await client.getMonthlySendingLimit('XYZ');
      expect(response).toMatchObject({
        limit: 1000,
        current: 200,
        period: 'monthly'
      });
    });
  });

  describe('updateSubaccountFeature', function () {
    it('updates feature of a subaccount', async () => {
      const testValue = { enabled: true };
      const apiData = {
        features: {
          email_preview: testValue,
          inbox_placement: testValue,
          sending: testValue,
          validations: testValue,
          validations_bulk: testValue
        }
      };
      api.put('/v5/accounts/subaccounts/XYZ/features').reply(200, apiData);
      const response = await client.updateSubaccountFeature('XYZ', {
        email_preview: true,
        inbox_placement: true,
        sending: true,
        validations: true,
        validations_bulk: true
      });
      expect(response).toMatchObject(apiData);
    });
  });
});
