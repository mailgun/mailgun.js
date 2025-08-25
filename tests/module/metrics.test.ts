import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import { MetricsResult, RequestOptions } from '../../lib/Types/index.js';
import { IMetricsClient } from '../../lib/Interfaces/Metrics/MetricsClient.js';
import MetricsClient from '../../lib/Classes/Metrics/MetricsClient.js';
import { Resolution } from '../../lib/Enums/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('MetricsClient', function () {
  let client: IMetricsClient;
  let api: nock.Scope;
  const testDate = new Date();
  const metricsResponse = {
    start: testDate.toISOString(),
    end: testDate.toISOString(),
    resolution: 'hour',
    dimensions: ['time'],
    pagination: {
      sort: '',
      skip: 0,
      limit: 1500,
      total: 1
    },
    items: [
      {
        dimensions: [{
          dimension: 'time',
          value: testDate.toISOString(),
          display_value: testDate.toISOString()
        }],
        metrics: {
          delivered_count: 1,
          sent_count: 1,
          opened_count: 0,
          failed_count: 0,
        }
      },
    ],
    aggregates: { metrics: {} },
  };

  const expectedMetricsResponse: MetricsResult = {
    ...metricsResponse,
    start: testDate,
    end: testDate,
    status: 200,
  };

  beforeEach(function () {
    client = new MetricsClient(
      new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData()),
      {
        warn: () => undefined
      }
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('getAccount', () => {
    it('fetches metrics for a given account', async () => {
      api.post('/v1/analytics/metrics')
        .reply(200, metricsResponse);

      const result: MetricsResult = await client.getAccount();
      expect(result).toMatchObject(expectedMetricsResponse);
      // expect(result).toHaveLength(1);
      // result.should.be.an('object').to.have.property('items');
      // result.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      // result.should.eql(expectedMetricsResponse);
    });

    it('prepares dates in query', async () => {
      const startDate = new Date();
      const endDate = new Date();
      let updatedQuery;
      const query = {
        start: startDate,
        end: endDate,
        resolution: Resolution.HOUR,
        duration: '1m',
        dimensions: ['time'],
        metrics: ['opened_count'],
        filter: {
          AND: [{
            attribute: 'domain',
            comparator: 'contains',
            values: [{
              label: 'test',
              value: 'mailgun'
            }]
          }]
        },
        include_subaccounts: true,
        include_aggregates: false,
      };

      api.post('/v1/analytics/metrics', (body) => {
        updatedQuery = body;
        return true;
      }).reply(200, metricsResponse);

      await client.getAccount(query);
      expect(updatedQuery).toMatchObject({
        ...query,
        start: startDate.toUTCString(),
        end: endDate.toUTCString()
      });
    });
  });

  describe('getAccountUsage', () => {
    it('fetches metrics for a given account', async () => {
      api.post('/v1/analytics/usage/metrics')
        .reply(200, metricsResponse);

      const result: MetricsResult = await client.getAccountUsage();
      expect(result).toMatchObject(expectedMetricsResponse);
      // result.should.be.an('object').to.have.property('items');
      // result.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      // result.should.eql(expectedMetricsResponse);
    });

    it('prepares dates in query', async () => {
      const startDate = new Date();
      const endDate = new Date();
      let updatedQuery;
      const query = {
        start: startDate,
        end: endDate,
        resolution: Resolution.HOUR,
        duration: '1m',
        dimensions: ['time'],
        metrics: ['opened_count'],
        filter: {
          AND: [{
            attribute: 'domain',
            comparator: 'contains',
            values: [{
              label: 'test',
              value: 'mailgun'
            }]
          }]
        },
        include_subaccounts: true,
        include_aggregates: false,
      };

      api.post('/v1/analytics/usage/metrics', (body) => {
        updatedQuery = body;
        return true;
      }).reply(200, metricsResponse);

      await client.getAccountUsage(query);
      expect(updatedQuery).toMatchObject({
        ...query,
        start: startDate.toUTCString(),
        end: endDate.toUTCString()
      });
    });
  });
});
