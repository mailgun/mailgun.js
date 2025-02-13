import nock from 'nock';
import formData from 'form-data';
import Request from '../../lib/Classes/common/Request.js';
import IpPoolsClient from '../../lib/Classes/IPPools.js';
import { InputFormData, RequestOptions } from '../../lib/Types/Common/index.js';

describe('IpPoolsClient', function () {
  let client: IpPoolsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    client = new IpPoolsClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    it('fetches all ip-polls', async () => {
      const expectedValue = {
        ip_pools: [
          {
            description: 'Test1',
            ips: [],
            is_linked: false,
            name: 'test_pool1',
            pool_id: 'test_pool_id_1'
          },
          {
            description: 'Test1',
            ips: [],
            is_linked: false,
            name: 'test_pool2',
            pool_id: 'test_pool_id_2'
          },
        ],
        message: 'success'
      }
      api.get('/v1/ip_pools').reply(200, expectedValue);

      const result = await client.list();
      expect(result).toMatchObject(expectedValue);
    });
  });

  describe('create', () => {
    it('adds list member to the mailing list ', async () => {
      const inputData = {
        name: 'test_name',
        description: 'temporary pool for testing purposes',
        ips: ['127.0.0.0']
      };

      api.post('/v1/ip_pools').reply(200, {
        message: 'success',
        pool_id: 'test_pool_id'
      });

      const result = await client.create(inputData);
      expect(result).toMatchObject({
        status: 200,
        message: 'success',
        pool_id: 'test_pool_id'
      });
    });
  });

  describe('update', () => {
    it('updates existed ip pool', async () => {
      const data = {
        name: 'test_name',
        description: 'updated pool for testing purposes',
        ips: ['127.0.0.1']
      };

      api.patch('/v1/ip_pools/test_pool_id').reply(200, { message: 'success' });

      const result = await client.update('test_pool_id', data);
      expect(result).toMatchObject({
        status: 200,
        message: 'success',
      });
    });
  });

  describe('delete', () => {
    it('deletes ip pool with ip replacement', async () => {
      api.delete('/v1/ip_pools/test_pool_id').reply(200, { message: 'started' });

      const result = await client.delete('test_pool_id', { ip: '127.0.0.1' });
      expect(result).toMatchObject({
        status: 200,
        message: 'started',
      });
    });
  });
});
