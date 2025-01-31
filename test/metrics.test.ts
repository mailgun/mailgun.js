import formData from 'form-data';

import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/Classes/common/Request';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { IMetricsClient } from '../lib/Interfaces/Metrics/MetricsClient';
import MetricsClient from '../lib/Classes/Metrics/MetricsClient';
import { MetricsResult } from '../lib/Types/Metrics';
import { Resolution } from '../lib/Enums';
import TestRequest from './TestUtils/Request';

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
      new TestRequest({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData),
      {
        warn: () => undefined
      }
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('getAccount', async () => {
    it('fetches metrics for a given account', async () => {
      api.post('/v1/analytics/metrics')
        .reply(200, metricsResponse);

      const result: MetricsResult = await client.getAccount();
      result.should.be.an('object').to.have.property('items');
      result.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      result.should.eql(expectedMetricsResponse);
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
      expect(updatedQuery).to.be.an('object');
      expect(updatedQuery).eql({
        ...query,
        start: startDate.toUTCString(),
        end: endDate.toUTCString()
      });
    });
  });

  describe('getAccountUsage', async () => {
    it('fetches metrics for a given account', async () => {
      api.post('/v1/analytics/usage/metrics')
        .reply(200, metricsResponse);

      const result: MetricsResult = await client.getAccountUsage();
      result.should.be.an('object').to.have.property('items');
      result.items.should.be.an('array').to.have.property('length').to.be.equal(1);
      result.should.eql(expectedMetricsResponse);
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

      api.post('/v1/analytics/usage/metrics').reply(200, (uri, requestBody) => {
        // fetch requires stringified data
        updatedQuery = typeof requestBody === 'string' ? JSON.parse(requestBody): requestBody;
        return metricsResponse
      });

      await client.getAccountUsage(query);
      expect(updatedQuery).to.be.an('object');
      expect(updatedQuery).eql({
        ...query,
        start: startDate.toUTCString(),
        end: endDate.toUTCString()
      });
    });
  });
});
