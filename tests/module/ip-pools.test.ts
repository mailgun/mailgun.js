import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import IpPoolsClient, { type IPv4Address, type IPv6Address } from '../../lib/Classes/IPPools.js';
import { RequestOptions } from '../../lib/Types/Common/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('IpPoolsClient', function () {
  let client: IpPoolsClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
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
      };
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

  describe('removeIpFromDomainPool', () => {
    it('allows valid ipv4 address', async () => {
      const requestMock = {
        delete: jest.fn().mockResolvedValue({ status: 200, body: { message: 'success' } }),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '127.0.0.1' as IPv4Address)).resolves.toMatchObject({
        status: 200,
        message: 'success',
      });
      expect(requestMock.delete).toHaveBeenCalledWith('/v3/domains/example.com/pool/127.0.0.1?ip=127.0.0.1');
    });

    it('allows valid ipv6 address', async () => {
      const requestMock = {
        delete: jest.fn().mockResolvedValue({ status: 200, body: { message: 'success' } }),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '2001:db8::1' as IPv6Address)).resolves.toMatchObject({
        status: 200,
        message: 'success',
      });
      expect(requestMock.delete).toHaveBeenCalledWith('/v3/domains/example.com/pool/2001%3Adb8%3A%3A1?ip=2001%3Adb8%3A%3A1');
    });

    it('throws for invalid ip address', async () => {
      const requestMock = {
        delete: jest.fn(),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', 'invalid-ip' as IPv4Address)).rejects.toThrow('Invalid IP address to remove from domain pool');
      expect(requestMock.delete).not.toHaveBeenCalled();
    });
  });
});
