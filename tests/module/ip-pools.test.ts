import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import IpPoolsClient from '../../lib/Classes/IPPools.js';
import { RequestOptions, type IPv4Address, type IPv6Address } from '../../lib/Types/Common/index.js';
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
      api.get('/v3/ip_pools').reply(200, expectedValue);

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

      api.post('/v3/ip_pools').reply(200, {
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

      api.patch('/v3/ip_pools/test_pool_id').reply(200, { message: 'success' });

      const result = await client.update('test_pool_id', data);
      expect(result).toMatchObject({
        status: 200,
        message: 'success',
      });
    });
  });

  describe('destroy', () => {
    it('deletes ip pool with ip replacement', async () => {
      api.delete('/v3/ip_pools/test_pool_id').reply(200, { message: 'started' });

      const result = await client.destroy('test_pool_id', { ip: '127.0.0.1' });
      expect(result).toMatchObject({
        status: 200,
        message: 'started',
      });
    });
  });

  describe('get', () => {
    it('fetches ip pool details', async () => {
      const expectedValue = {
        status: 200,
        details: {
          description: 'Test1',
          ips: ['127.0.0.1'],
          is_linked: true,
          name: 'test_pool1',
          pool_id: 'test_pool_id',
          linked_domains: ['example.com']
        },
        message: 'success'
      };

      api.get('/v3/ip_pools/test_pool_id').reply(200, expectedValue);

      const result = await client.get('test_pool_id');
      expect(result).toMatchObject(expectedValue);
    });
  });

  describe('linkedDomains', () => {
    it('fetches linked domains for an ip pool', async () => {
      const expectedValue = {
        domains: [
          { id: '1', name: 'example.com' }
        ],
        paging: {
          first: 'https://api.mailgun.net/v3/ip_pools/test_pool_id/domains?page=first',
          next: 'https://api.mailgun.net/v3/ip_pools/test_pool_id/domains?page=next'
        },
        status: 200
      };

      api.get('/v3/ip_pools/test_pool_id/domains')
        .query({ limit: 10, page: 'test' })
        .reply(200, expectedValue);

      const result = await client.linkedDomains('test_pool_id', { limit: 10, page: 'test' });
      expect(result).toMatchObject(expectedValue);
    });
  });

  describe('addIp', () => {
    it('adds an ip to an ip pool', async () => {
      api.put('/v3/ip_pools/test_pool_id/ips/127.0.0.1').reply(200, { message: 'success' });

      const result = await client.addIp('test_pool_id', '127.0.0.1');
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('removeIp', () => {
    it('removes an ip from an ip pool', async () => {
      api.delete('/v3/ip_pools/test_pool_id/ips/127.0.0.1').reply(200, { message: 'success' });

      const result = await client.removeIp('test_pool_id', '127.0.0.1');
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('delegate', () => {
    it('delegates an ip pool to a subaccount', async () => {
      api.put('/v3/ip_pools/test_pool_id/delegate').reply(200, { message: 'success' });

      const result = await client.delegate('test_pool_id', 'subaccount_id');
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('revokeDelegation', () => {
    it('revokes ip pool delegation from a subaccount', async () => {
      api.delete('/v3/ip_pools/test_pool_id/delegate').reply(200, { message: 'success' });

      const result = await client.revokeDelegation('test_pool_id', 'subaccount_id');
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('addIps', () => {
    it('adds multiple ips to an ip pool', async () => {
      api.post('/v3/ip_pools/test_pool_id/ips.json').reply(200, { message: 'success' });

      const result = await client.addIps('test_pool_id', ['127.0.0.1', '192.168.0.1']);
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('removeDomainPool', () => {
    it('removes a domain pool', async () => {
      api.delete('/v3/domains/example.com/pool/all').reply(200, { message: 'success' });

      const result = await client.removeDomainPool('example.com');
      expect(result).toMatchObject({ status: 200, message: 'success' });
    });
  });

  describe('unlinkDomainPool', () => {
    it('unlinks a dedicated ip pool from a domain', async () => {
      api.delete('/v3/domains/example.com/pool/ip_pool').query({ pool_id: 'replacement_pool_id' }).reply(200, { message: 'success' });

      const result = await client.unlinkDomainPool('example.com', 'replacement_pool_id');
      expect(result).toMatchObject({ status: 200, message: 'success' });
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
      expect(requestMock.delete).toHaveBeenCalledWith('/v3/domains/example.com/pool/127.0.0.1', undefined, undefined);
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
      expect(requestMock.delete).toHaveBeenCalledWith('/v3/domains/example.com/pool/2001%3Adb8%3A%3A1', undefined, undefined);
    });

    it('throws for invalid ip address', async () => {
      const requestMock = {
        delete: jest.fn(),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', 'invalid-ip' as IPv4Address)).rejects.toThrow('Invalid IP address to remove from domain pool');
      expect(requestMock.delete).not.toHaveBeenCalled();
    });

    it('throws for empty ip addresses', async () => {
      const requestMock = {
        delete: jest.fn(),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '' as IPv4Address)).rejects.toThrow('Invalid IP address to remove from domain pool');
      expect(requestMock.delete).not.toHaveBeenCalled();
    });

    it('throws for ipv4 addresses with empty octets', async () => {
      const requestMock = {
        delete: jest.fn(),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '1.2..4' as IPv4Address)).rejects.toThrow('Invalid IP address to remove from domain pool');
      expect(requestMock.delete).not.toHaveBeenCalled();
    });

    it('throws for invalid replacement ip address', async () => {
      const requestMock = {
        delete: jest.fn(),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '127.0.0.1' as IPv4Address, 'invalid-ip' as IPv4Address)).rejects.toThrow('Invalid replacement IP address');
      expect(requestMock.delete).not.toHaveBeenCalled();
    });

    it('adds a replacement ip query when provided', async () => {
      const requestMock = {
        delete: jest.fn().mockResolvedValue({ status: 200, body: { message: 'success' } }),
      } as unknown as Request;
      const ipPoolsClient = new IpPoolsClient(requestMock);

      await expect(ipPoolsClient.removeIpFromDomainPool('example.com', '127.0.0.1' as IPv4Address, '127.0.0.2' as IPv4Address)).resolves.toMatchObject({
        status: 200,
        message: 'success',
      });
      expect(requestMock.delete).toHaveBeenCalledWith('/v3/domains/example.com/pool/127.0.0.1', undefined, { ip: '127.0.0.2' });
    });
  });
});
