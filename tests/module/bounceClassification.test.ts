import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import BounceClassificationClient from '../../lib/Classes/BounceClassification/BounceClassificationClient.js';
import {
  BounceClassificationQueryData,
  BounceClassificationResult,
  RequestOptions
} from '../../lib/Types/index.js';
import { IBounceClassificationClient } from '../../lib/Interfaces/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('BounceClassificationClient', () => {
  let client: IBounceClassificationClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new BounceClassificationClient(
      new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData())
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', () => {
    const bounceClassificationResponse = {
      start: '2025-12-01T00:00:00.000Z',
      end: '2025-12-31T23:59:59.999Z',
      resolution: 'day',
      duration: '30d',
      dimensions: ['entity-name', 'criticality'],
      pagination: {
        sort: 'entity-name:asc',
        skip: 0,
        limit: 100,
        total: 2
      },
      items: [
        {
          'account.id': 'acc123',
          'account.name': 'Test Account',
          'entity-name': 'test.mailgun.org',
          'recipient-provider': null,
          'recipient-domain': 'example.com',
          'domain.name': 'test.mailgun.org',
          'envelope.i-ip-pool-id': null,
          'envelope.i-ip-pool-name': null,
          'envelope.sending-ip': '192.168.1.1',
          timestamp: '2025-12-15T10:00:00.000Z',
          tags: 'campaign',
          tag: 'newsletter',
          criticality: 'critical',
          severity: 'high',
          category: 'temporary',
          'group-id': 'grp1',
          'sample-text': 'Mailbox full',
          explanation: 'The recipient mailbox is full',
          metrics: {
            critical_bounce_count: 5,
            non_critical_bounce_count: 2,
            critical_delay_count: 1,
            non_critical_delay_count: 0,
            delivered_smtp_count: 100,
            classified_failures_count: 7,
            critical_bounce_rate: 0.05,
            non_critical_bounce_rate: 0.02,
            critical_delay_rate: 0.01,
            non_critical_delay_rate: 0
          }
        },
        {
          'account.id': 'acc123',
          'account.name': 'Test Account',
          'entity-name': 'test.mailgun.org',
          'recipient-provider': null,
          'recipient-domain': 'test.com',
          'domain.name': 'test.mailgun.org',
          'envelope.i-ip-pool-id': null,
          'envelope.i-ip-pool-name': null,
          'envelope.sending-ip': '192.168.1.2',
          timestamp: '2025-12-20T14:30:00.000Z',
          tags: 'campaign',
          tag: 'promotional',
          criticality: 'non-critical',
          severity: 'low',
          category: 'permanent',
          'group-id': 'grp2',
          'sample-text': 'Invalid recipient',
          explanation: 'The recipient address does not exist',
          metrics: {
            critical_bounce_count: 0,
            non_critical_bounce_count: 10,
            critical_delay_count: 0,
            non_critical_delay_count: 3,
            delivered_smtp_count: 150,
            classified_failures_count: 13,
            critical_bounce_rate: 0,
            non_critical_bounce_rate: 0.067,
            critical_delay_rate: 0,
            non_critical_delay_rate: 0.02
          }
        }
      ]
    };

    it('fetches bounce classification metrics', async () => {
      const query: BounceClassificationQueryData = {
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v2/bounce-classification/metrics')
        .reply(200, bounceClassificationResponse);

      const result: BounceClassificationResult = await client.list(query);

      expect(result).toMatchObject({
        start: expect.any(Date),
        end: expect.any(Date),
        resolution: 'day',
        duration: '30d',
        dimensions: ['entity-name', 'criticality'],
        pagination: expect.objectContaining({
          skip: 0,
          limit: 100,
          total: 2
        }),
        items: expect.any(Array)
      });

      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toMatchObject({
        'entity-name': 'test.mailgun.org',
        criticality: 'critical',
        severity: 'high',
        metrics: expect.objectContaining({
          critical_bounce_count: 5,
          non_critical_bounce_count: 2
        })
      });
    });

    it('prepares dates in query', async () => {
      const startDate = new Date('2025-12-01T00:00:00.000Z');
      const endDate = new Date('2025-12-31T23:59:59.999Z');
      let requestBody: nock.Body | undefined;

      const query: BounceClassificationQueryData = {
        start: startDate,
        end: endDate,
        resolution: 'day',
        duration: '30d',
        dimensions: ['entity-name', 'criticality'],
        metrics: ['critical_bounce_count', 'non_critical_bounce_count'],
        filter: {
          AND: [{
            attribute: 'entity-name',
            comparator: 'contains',
            values: [{
              label: 'test',
              value: 'mailgun'
            }]
          }]
        },
        include_subaccounts: true,
        pagination: {
          sort: 'entity-name:asc',
          skip: 0,
          limit: 100
        }
      };

      api.post('/v2/bounce-classification/metrics', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, bounceClassificationResponse);

      await client.list(query);

      expect(requestBody).toBeDefined();
      expect(requestBody).toMatchObject({
        start: 'Mon, 01 Dec 2025 00:00:00 -0000',
        end: 'Wed, 31 Dec 2025 23:59:59 -0000',
        resolution: 'day',
        duration: '30d',
        dimensions: ['entity-name', 'criticality'],
        metrics: ['critical_bounce_count', 'non_critical_bounce_count'],
        filter: {
          AND: [{
            attribute: 'entity-name',
            comparator: 'contains',
            values: [{
              label: 'test',
              value: 'mailgun'
            }]
          }]
        },
        pagination: {
          sort: 'entity-name:asc',
          skip: 0,
          limit: 100
        }
      });
    });

    it('handles query with filter', async () => {
      const query: BounceClassificationQueryData = {
        dimensions: ['criticality', 'severity'],
        metrics: ['critical_bounce_count', 'classified_failures_count'],
        filter: {
          AND: [
            {
              attribute: 'domain.name',
              comparator: 'equals',
              values: [{
                label: 'Test Domain',
                value: 'test.mailgun.org'
              }]
            },
            {
              attribute: 'criticality',
              comparator: 'equals',
              values: [{
                label: 'Critical',
                value: 'critical'
              }]
            }
          ]
        },
        pagination: {
          skip: 0,
          limit: 50
        }
      };

      api.post('/v2/bounce-classification/metrics')
        .reply(200, bounceClassificationResponse);

      const result = await client.list(query);

      expect(result).toBeDefined();
      expect(result.items).toHaveLength(2);
    });

    it('handles query with resolution and duration', async () => {
      const query: BounceClassificationQueryData = {
        resolution: 'hour',
        duration: '24h',
        dimensions: ['timestamp'],
        metrics: ['critical_bounce_count'],
        pagination: {
          skip: 0,
          limit: 24
        }
      };

      api.post('/v2/bounce-classification/metrics')
        .reply(200, {
          ...bounceClassificationResponse,
          resolution: 'hour',
          duration: '24h'
        });

      const result = await client.list(query);

      expect(result).toMatchObject({
        resolution: 'hour',
        duration: '24h'
      });
    });

    it('handles query with pagination sorting', async () => {
      let requestBody: nock.Body | undefined;

      const query: BounceClassificationQueryData = {
        dimensions: ['entity-name', 'criticality'],
        pagination: {
          sort: 'critical_bounce_count:desc',
          skip: 10,
          limit: 20
        }
      };

      api.post('/v2/bounce-classification/metrics', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, bounceClassificationResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        pagination: {
          sort: 'critical_bounce_count:desc',
          skip: 10,
          limit: 20
        }
      });
    });

    it('handles query with include_subaccounts', async () => {
      let requestBody: nock.Body | undefined;

      const query: BounceClassificationQueryData = {
        include_subaccounts: true,
        dimensions: ['account.name'],
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v2/bounce-classification/metrics', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, bounceClassificationResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        dimensions: ['account.name'],
        pagination: {
          skip: 0,
          limit: 100
        }
      });
    });

    it('handles multiple dimensions', async () => {
      const query: BounceClassificationQueryData = {
        dimensions: [
          'entity-name',
          'domain.name',
          'envelope.sending-ip',
          'criticality',
          'severity',
          'category'
        ],
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v2/bounce-classification/metrics')
        .reply(200, bounceClassificationResponse);

      const result = await client.list(query);

      expect(result).toBeDefined();
      expect(result.items).toHaveLength(2);
    });

    it('handles multiple metrics', async () => {
      const query: BounceClassificationQueryData = {
        metrics: [
          'critical_bounce_count',
          'non_critical_bounce_count',
          'critical_delay_count',
          'non_critical_delay_count',
          'delivered_smtp_count',
          'classified_failures_count',
          'critical_bounce_rate',
          'non_critical_bounce_rate'
        ],
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v2/bounce-classification/metrics')
        .reply(200, bounceClassificationResponse);

      const result = await client.list(query);

      expect(result).toBeDefined();
      expect(result.items[0].metrics).toMatchObject({
        critical_bounce_count: expect.any(Number),
        non_critical_bounce_count: expect.any(Number),
        critical_bounce_rate: expect.any(Number)
      });
    });
  });
});
