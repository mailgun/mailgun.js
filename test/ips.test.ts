// const formData = require('form-data');

import nock from 'nock';
import formData from 'form-data';
import IpsClient from '../lib/Classes/IPs';

import { IpData, IpsListResponseBody } from '../lib/Types/IPs';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import TestRequest from './TestUtils/Request';

// TODO: fix types
describe('DomainClient', function () {
  let client: IpsClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new IpsClient(new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all ips', async function () {
      const ips: IpsListResponseBody[] = [{
        assignable_to_pools: true,
        items: ['127.0.0.1', '192.168.0.1'],
        total_count: 2
      }];

      api.get('/v3/ips').reply(200, ips);

      const res: IpsListResponseBody = await client.list();
      res.should.eql(ips);
    });
  });

  describe('get', function () {
    it('fetches an ip data', async function () {
      const ip = '127.0.0.1';

      const ips: IpData = {
        ip,
        dedicated: true,
        rdns: 'test.rdns'
      };

      api.get(`/v3/ips/${ip}`).reply(200, ips);

      const res: IpData = await client.get(ip);
      res.should.eql(ips);
    });
  });
});
