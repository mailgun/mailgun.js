import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import LogsClient from '../../lib/Classes/Logs/LogsClient.js';
import { RequestOptions } from '../../lib/Types/index.js';
import getTestFormData from './test-utils/TestFormData.js';
import { LogsQuery } from '../../lib/Types/Logs/Logs.js';
import APIError from '../../lib/Classes/common/Error.js';

describe('LogsClient', function () {
  let client: LogsClient;
  let api: nock.Scope;
  const request = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());

  beforeEach(function () {
    client = new LogsClient(request);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
    jest.restoreAllMocks();
  });

  describe('list', function () {
    const startDate = new Date('2025-12-01T00:00:00.000Z');
    const endDate = new Date('2025-12-03T00:00:00.000Z');

    it('fetches logs with required fields only', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [
          {
            id: 'event-1',
            event: 'accepted',
            '@timestamp': '2025-12-01T10:30:00.000Z',
            domain: {
              name: 'example.com'
            }
          }
        ],
        pagination: {},
        aggregates: {
          all: 1,
          metrics: {}
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      const result = await client.list(query);

      expect(result).toMatchObject({
        start: new Date('2025-12-01T00:00:00.000Z'),
        end: new Date('2025-12-03T00:00:00.000Z'),
        status: 200,
        items: [
          {
            id: 'event-1',
            event: 'accepted',
            '@timestamp': new Date('2025-12-01T10:30:00.000Z'),
            domain: {
              name: 'example.com'
            }
          }
        ],
        pagination: {},
        aggregates: {
          all: 1,
          metrics: {}
        }
      });
    });

    it('fetches logs with all optional fields', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [
          {
            id: 'event-2',
            event: 'delivered',
            '@timestamp': '2025-12-02T14:45:00.000Z',
            account: {
              'parent-id': 'parent-123',
              id: 'account-456'
            },
            campaigns: [
              {
                id: 'campaign-1',
                name: 'Newsletter Campaign'
              }
            ],
            tags: ['newsletter', 'marketing'],
            method: 'http',
            'originating-ip': '192.168.1.1',
            'api-key-id': 'key-789',
            'delivery-status': {
              message: 'OK',
              'attempt-no': 1,
              code: 250,
              description: 'Message delivered',
              'session-seconds': 2.5,
              'mx-host': 'mx.example.com',
              'certificate-verified': true,
              tls: true,
              utf8: true,
              'first-delivery-attempt-seconds': 1.2
            },
            'i-delivery-optimizer': 'optimized',
            domain: {
              name: 'example.com'
            },
            recipient: 'user@example.com',
            'recipient-domain': 'example.com',
            'recipient-provider': 'gmail',
            envelope: {
              sender: 'sender@example.com',
              transport: 'smtp',
              'sending-ip': '10.0.0.1',
              targets: 'user@example.com',
              'i-ip-pool-id': 'pool-1'
            },
            storage: {
              region: 'us-east-1',
              env: 'production',
              key: 'storage-key-123',
              url: ['https://storage.example.com/message-1']
            },
            template: {
              name: 'welcome-email',
              version: '1.0',
              'is-text': false
            },
            'log-level': 'info',
            'user-variables': '{"custom_field": "value"}',
            message: {
              headers: {
                to: 'user@example.com',
                'message-id': '<msg-123@example.com>',
                from: 'sender@example.com',
                subject: 'Welcome to our service'
              },
              attachments: [
                {
                  filename: 'document.pdf',
                  'content-type': 'application/pdf',
                  size: 102400
                }
              ],
              recipients: ['user@example.com'],
              size: 15000,
              'scheduled-for': 1638360000
            },
            flags: {
              'is-authenticated': true,
              'is-system-test': false,
              'is-routed': true,
              'is-amp': false,
              'is-test-mode': false,
              'is-delayed-bounce': false,
              'is-callback': false,
              'is-encrypted': true
            },
            'primary-dkim': 'dkim.example.com',
            ip: '192.168.1.100',
            geolocation: {
              city: 'New York',
              country: 'US',
              region: 'NY',
              timezone: 'America/New_York'
            },
            'client-info': {
              'client-name': 'Gmail',
              'client-os': 'Android',
              'client-type': 'mobile',
              'device-type': 'mobile',
              'user-agent': 'Mozilla/5.0',
              ip: '192.168.1.200',
              bot: 'no'
            },
            severity: 'info',
            reason: 'none',
            routes: {
              actions: 'forward',
              description: 'Forward to support',
              expression: 'match_recipient("support@.*")',
              id: 'route-123',
              priority: 1,
              match: {
                recipient: 'support@example.com'
              }
            },
            'mailing-list': {
              address: 'list@example.com',
              'list-id': 'list-123',
              sid: 'session-456'
            },
            url: 'https://example.com/click'
          }
        ],
        pagination: {
          previous: 'prev-token',
          first: 'first-token',
          last: 'last-token',
          next: 'next-token',
          total: 100
        },
        aggregates: {
          all: 100,
          metrics: {
            delivered: 95,
            bounced: 5
          }
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      const result = await client.list(query);

      expect(result.status).toBe(200);
      expect(result.items[0]).toMatchObject({
        id: 'event-2',
        event: 'delivered',
        '@timestamp': new Date('2025-12-02T14:45:00.000Z'),
        account: {
          'parent-id': 'parent-123',
          id: 'account-456'
        },
        campaigns: [
          {
            id: 'campaign-1',
            name: 'Newsletter Campaign'
          }
        ],
        tags: ['newsletter', 'marketing'],
        method: 'http',
        'delivery-status': {
          message: 'OK',
          'attempt-no': 1,
          code: 250,
          description: 'Message delivered',
          'session-seconds': 2.5,
          'mx-host': 'mx.example.com',
          'certificate-verified': true,
          tls: true,
          utf8: true,
          'first-delivery-attempt-seconds': 1.2
        },
        recipient: 'user@example.com',
        'recipient-domain': 'example.com',
        envelope: {
          sender: 'sender@example.com',
          transport: 'smtp',
          'sending-ip': '10.0.0.1'
        },
        storage: {
          region: 'us-east-1',
          env: 'production',
          key: 'storage-key-123'
        },
        template: {
          name: 'welcome-email',
          version: '1.0',
          'is-text': false
        },
        message: {
          headers: {
            to: 'user@example.com',
            'message-id': '<msg-123@example.com>',
            from: 'sender@example.com',
            subject: 'Welcome to our service'
          },
          attachments: [
            {
              filename: 'document.pdf',
              'content-type': 'application/pdf',
              size: 102400
            }
          ]
        },
        flags: {
          'is-authenticated': true,
          'is-system-test': false,
          'is-routed': true
        },
        geolocation: {
          city: 'New York',
          country: 'US',
          region: 'NY',
          timezone: 'America/New_York'
        },
        'client-info': {
          'client-name': 'Gmail',
          'client-os': 'Android',
          'device-type': 'mobile'
        }
      });
    });

    it('fetches logs with query parameters including filter', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [],
        pagination: {},
        aggregates: {
          all: 0,
          metrics: {}
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        events: ['accepted', 'delivered'],
        metric_events: ['opened', 'clicked'],
        include_subaccounts: true,
        include_totals: true,
        pagination: {
          sort: 'timestamp',
          token: 'page-token-123',
          limit: 50
        },
        filter: {
          AND: [
            {
              attribute: 'recipient',
              comparator: 'eq',
              values: [
                {
                  label: 'user@example.com',
                  value: 'user@example.com'
                }
              ]
            },
            {
              attribute: 'event',
              comparator: 'in',
              values: [
                {
                  label: 'delivered',
                  value: 'delivered'
                },
                {
                  label: 'accepted',
                  value: 'accepted'
                }
              ]
            }
          ]
        }
      };

      const result = await client.list(query);

      expect(result).toMatchObject({
        start: new Date('2025-12-01T00:00:00.000Z'),
        end: new Date('2025-12-03T00:00:00.000Z'),
        status: 200
      });
    });

    it('correctly parses date formats', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [],
        pagination: {},
        aggregates: {
          all: 0,
          metrics: {}
        }
      };

      const postSpy = jest.spyOn(request, 'post');
      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      await client.list(query);

      expect(postSpy).toHaveBeenCalledWith(
        '/v1/analytics/logs',
        expect.objectContaining({
          start: 'Mon, 01 Dec 2025 00:00:00 -0000',
          end: 'Wed, 03 Dec 2025 00:00:00 -0000'
        })
      );
    });

    it('throws error when query data is missing', async () => {
      try {
        // @ts-expect-error check case when SDK is being used without type checking
        await client.list(null);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Missed parameter "query"');
        expect(apiError.details).toBe('"logs.list": Query data is required');
      }
    });

    it('throws error when start date is missing', async () => {
      const query: LogsQuery = {
        end: endDate
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Missed property');
        expect(apiError.details).toBe('"logs.list": "start" property is required');
      }
    });

    it('throws error when start date is invalid', async () => {
      const query: LogsQuery = {
        start: new Date('invalid'),
        end: endDate
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect type');
        expect(apiError.details).toBe('"logs.list": Type of "start" must be valid JS Data object');
      }
    });

    it('throws error when end date is invalid', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: new Date('invalid')
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect type');
        expect(apiError.details).toBe('"logs.list": Type of "end" must be valid JS Data object');
      }
    });

    it('throws error when filter does not have AND operator', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        // @ts-expect-error check case when SDK is being used without type checking
        filter: {}
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Logs filter must have AND operator');
      }
    });

    it('throws error when filter AND is not an array', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          // @ts-expect-error check case when SDK is being used without type checking
          AND: {}
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Logs filter AND operator must be an array');
      }
    });

    it('throws error when filter AND is empty array', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          AND: []
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Logs filter AND operator must be an array');
      }
    });

    it('throws error when filter condition is missing required fields', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          AND: [
            // @ts-expect-error check case when SDK is being used without type checking
            {
              attribute: 'recipient',
              comparator: 'eq'
            }
          ]
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Each condition in Logs filter AND operator must have attribute, comparator and values');
      }
    });

    it('throws error when filter condition values is not an array', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          AND: [
            {
              attribute: 'recipient',
              comparator: 'eq',
              // @ts-expect-error check case when SDK is being used without type checking
              values: {}
            }
          ]
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Values in each condition of Logs filter AND operator must be an array');
      }
    });

    it('throws error when filter condition values is empty array', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          AND: [
            {
              attribute: 'recipient',
              comparator: 'eq',
              values: []
            }
          ]
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Values in each condition of Logs filter AND operator must be an array');
      }
    });

    it('throws error when filter value is missing label or value', async () => {
      const query: LogsQuery = {
        start: startDate,
        end: endDate,
        filter: {
          AND: [
            {
              attribute: 'recipient',
              comparator: 'eq',
              values: [
                // @ts-expect-error check case when SDK is being used without type checking
                {
                  label: 'test'
                }
              ]
            }
          ]
        }
      };

      try {
        await client.list(query);
      } catch (error: unknown) {
        const apiError = error as APIError;
        expect(apiError.status).toBe(400);
        expect(apiError.message).toBe('Incorrect filter');
        expect(apiError.details).toBe('"logs.list": Each value in Logs filter condition must have label and value');
      }
    });

    it('handles events with partial optional fields', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [
          {
            id: 'event-3',
            event: 'failed',
            '@timestamp': '2025-12-01T12:00:00.000Z',
            domain: {
              name: 'example.com'
            },
            recipient: 'user@example.com',
            'delivery-status': {
              message: 'Bounce',
              code: 550,
              'bounce-type': 'permanent'
            },
            flags: {
              'is-authenticated': false,
              'is-system-test': false,
              'is-routed': false,
              'is-test-mode': false,
              'is-delayed-bounce': true,
              'is-callback': false,
              'is-encrypted': false
            }
          }
        ],
        pagination: {
          next: 'next-token'
        },
        aggregates: {
          all: 1,
          metrics: {}
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      const result = await client.list(query);

      expect(result.items[0]).toMatchObject({
        id: 'event-3',
        event: 'failed',
        '@timestamp': new Date('2025-12-01T12:00:00.000Z'),
        recipient: 'user@example.com',
        'delivery-status': {
          message: 'Bounce',
          code: 550,
          'bounce-type': 'permanent'
        },
        flags: {
          'is-authenticated': false,
          'is-delayed-bounce': true
        }
      });
      expect(result.items[0].campaigns).toBeUndefined();
      expect(result.items[0].tags).toBeUndefined();
      expect(result.items[0].geolocation).toBeUndefined();
    });

    it('handles pagination fields correctly', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [],
        pagination: {
          previous: 'prev-token',
          first: 'first-token',
          last: 'last-token',
          next: 'next-token',
          total: 250
        },
        aggregates: {
          all: 250,
          metrics: {}
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      const result = await client.list(query);

      expect(result.pagination).toEqual({
        previous: 'prev-token',
        first: 'first-token',
        last: 'last-token',
        next: 'next-token',
        total: 250
      });
    });

    it('handles partial pagination fields', async () => {
      const mockResponse = {
        start: '2025-12-01T00:00:00.000Z',
        end: '2025-12-03T00:00:00.000Z',
        items: [],
        pagination: {
          next: 'next-token'
        },
        aggregates: {
          all: 50,
          metrics: {}
        }
      };

      api.post('/v1/analytics/logs').reply(200, mockResponse);

      const query: LogsQuery = {
        start: startDate,
        end: endDate
      };

      const result = await client.list(query);

      expect(result.pagination).toEqual({
        next: 'next-token'
      });
      expect(result.pagination.previous).toBeUndefined();
      expect(result.pagination.total).toBeUndefined();
    });
  });
});
