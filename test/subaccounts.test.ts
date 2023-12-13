import formData from 'form-data';

import nock from 'nock';
import Request from '../lib/Classes/common/Request';

import {
  InputFormData, RequestOptions,
  SubaccountListItem, SubaccountListResponseData, SubaccountResponseData,
} from '../lib';

import SubaccountsClient from '../lib/Classes/Subaccounts';

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
    it('fetches all subaccounts', function () {
      const subaccounts: SubaccountListItem[] = [
        { id: 'XYZ', name: 'test.subaccount1', status: 'open' },
        { id: 'YYY', name: 'test.subaccount2', status: 'open' }
      ];

      api.get('/v5/accounts/subaccounts').reply(200, { subaccounts });

      return client.list().then(function (subacc: SubaccountListResponseData) {
        subacc.subaccounts[0].should.eql({ id: 'XYZ', name: 'test.subaccount1', status: 'open' });
      });
    });
  });

  describe('get', function () {
    it('gets a specific subaccount', function () {
      const subaccountData: SubaccountListItem = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.get('/v5/accounts/subaccounts/XYZ').reply(200, { subaccount: subaccountData });

      return client.get('XYZ').then(function (subaccount: SubaccountResponseData) {
        subaccount.should.eql({
          subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
        });
      });
    });
  });

  describe('create', function () {
    it('creates a subaccount', function () {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.post('/v5/accounts/subaccounts').reply(200, { subaccount: subaccountData });

      return client.create('test.subaccount1')
        .then(function (subaccount: SubaccountResponseData) {
          subaccount.should.eql({
            subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
          });
        });
    });
  });

  describe('enable', function () {
    it('enables a subaccount', function () {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'open' };

      api.post('/v5/accounts/subaccounts/XYZ/enable').reply(200, { subaccount: subaccountData });

      return client.enable('XYZ')
        .then(function (subaccount: SubaccountResponseData) {
          subaccount.should.eql({
            subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'open' }
          });
        });
    });
  });

  describe('disable', function () {
    it('disables a subaccount', function () {
      const subaccountData = { id: 'XYZ', name: 'test.subaccount1', status: 'disabled' };

      api.post('/v5/accounts/subaccounts/XYZ/disable').reply(200, { subaccount: subaccountData });

      return client.disable('XYZ')
        .then(function (subaccount: SubaccountResponseData) {
          subaccount.should.eql({
            subaccount: { id: 'XYZ', name: 'test.subaccount1', status: 'disabled' }
          });
        });
    });
  });
});
