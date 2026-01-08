import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import TagsClient from '../../lib/Classes/Tags/TagsClient.js';
import {
  TagsListQuery,
  TagsListResult,
  TagLimitsResult,
  RequestOptions,
  MessageResponse
} from '../../lib/Types/index.js';
import { ITagsClient } from '../../lib/Interfaces/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('TagsClient', () => {
  let client: ITagsClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new TagsClient(
      new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData())
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', () => {
    const tagsResponse = {
      pagination: {
        sort: 'tag:asc',
        limit: 100,
        skip: 0,
        total: 2
      },
      items: [
        {
          account_id: 'acc123',
          parent_account_id: 'parent123',
          tag: 'newsletter',
          description: 'Newsletter campaign',
          first_seen: '2026-01-01T10:00:00.000Z',
          last_seen: '2026-01-08T15:30:00.000Z',
          metrics: {
            accepted_count: 100,
            delivered_count: 95,
            opened_count: 50,
            clicked_count: 25,
            failed_count: 5,
            hard_bounce_rate: '0.03',
            soft_bounce_rate: '0.02'
          },
          account_name: 'Test Account'
        },
        {
          account_id: 'acc123',
          parent_account_id: 'parent123',
          tag: 'promotional',
          description: 'Promotional emails',
          first_seen: '2025-12-15T08:00:00.000Z',
          last_seen: '2026-01-07T12:00:00.000Z',
          metrics: {
            accepted_count: 200,
            delivered_count: 190,
            opened_count: 80,
            clicked_count: 40,
            failed_count: 10
          },
          account_name: 'Test Account'
        }
      ]
    };

    it('fetches tags list', async () => {
      const query: TagsListQuery = {
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v1/analytics/tags')
        .reply(200, tagsResponse);

      const result: TagsListResult = await client.list(query);

      expect(result).toMatchObject({
        pagination: expect.objectContaining({
          sort: 'tag:asc',
          limit: 100,
          skip: 0,
          total: 2
        }),
        items: expect.any(Array)
      });

      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toMatchObject({
        tag: 'newsletter',
        description: 'Newsletter campaign',
        first_seen: expect.any(Date),
        last_seen: expect.any(Date),
        metrics: expect.objectContaining({
          accepted_count: 100,
          delivered_count: 95
        })
      });
    });

    it('parses dates correctly from API response', async () => {
      const query: TagsListQuery = {
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v1/analytics/tags')
        .reply(200, tagsResponse);

      const result = await client.list(query);

      expect(result.items[0].first_seen).toBeInstanceOf(Date);
      expect(result.items[0].last_seen).toBeInstanceOf(Date);
      expect(result.items[0].first_seen.toISOString()).toBe('2026-01-01T10:00:00.000Z');
      expect(result.items[0].last_seen.toISOString()).toBe('2026-01-08T15:30:00.000Z');
    });

    it('handles query with tag filter', async () => {
      let requestBody: nock.Body | undefined;

      const query: TagsListQuery = {
        tag: 'newsletter',
        pagination: {
          skip: 0,
          limit: 50
        }
      };

      api.post('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, {
          ...tagsResponse,
          items: [tagsResponse.items[0]]
        });

      const result = await client.list(query);

      expect(requestBody).toMatchObject({
        tag: 'newsletter',
        pagination: {
          skip: 0,
          limit: 50
        }
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].tag).toBe('newsletter');
    });

    it('handles query with include_subaccounts', async () => {
      let requestBody: nock.Body | undefined;

      const query: TagsListQuery = {
        include_subaccounts: true,
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, tagsResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        include_subaccounts: true,
        pagination: {
          skip: 0,
          limit: 100
        }
      });
    });

    it('handles query with include_metrics', async () => {
      let requestBody: nock.Body | undefined;

      const query: TagsListQuery = {
        include_metrics: true,
        pagination: {
          skip: 0,
          limit: 100
        }
      };

      api.post('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, tagsResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        include_metrics: true,
        pagination: {
          skip: 0,
          limit: 100
        }
      });
    });

    it('handles pagination with sorting', async () => {
      let requestBody: nock.Body | undefined;

      const query: TagsListQuery = {
        pagination: {
          sort: 'last_seen:desc',
          skip: 10,
          limit: 25,
          include_total: true
        }
      };

      api.post('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, tagsResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        pagination: {
          sort: 'last_seen:desc',
          skip: 10,
          limit: 25,
          include_total: true
        }
      });
    });

    it('handles combined query options', async () => {
      let requestBody: nock.Body | undefined;

      const query: TagsListQuery = {
        tag: 'promotional',
        include_subaccounts: true,
        include_metrics: true,
        pagination: {
          sort: 'tag:asc',
          skip: 0,
          limit: 50
        }
      };

      api.post('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, tagsResponse);

      await client.list(query);

      expect(requestBody).toMatchObject({
        tag: 'promotional',
        include_subaccounts: true,
        include_metrics: true,
        pagination: {
          sort: 'tag:asc',
          skip: 0,
          limit: 50
        }
      });
    });
  });

  describe('limits', () => {
    it('fetches tag limits', async () => {
      const limitsResponse: TagLimitsResult = {
        limit: 5000,
        count: 250,
        limit_reached: false
      };

      api.get('/v1/analytics/tags/limits')
        .reply(200, limitsResponse);

      const result = await client.limits();

      expect(result).toMatchObject({
        limit: 5000,
        count: 250,
        limit_reached: false
      });
    });

    it('handles limit reached status', async () => {
      const limitsResponse: TagLimitsResult = {
        limit: 1000,
        count: 1000,
        limit_reached: true
      };

      api.get('/v1/analytics/tags/limits')
        .reply(200, limitsResponse);

      const result = await client.limits();

      expect(result).toMatchObject({
        limit: 1000,
        count: 1000,
        limit_reached: true
      });
      expect(result.limit_reached).toBe(true);
    });
  });

  describe('update', () => {
    it('updates a tag description', async () => {
      let requestBody: nock.Body | undefined;
      const tag = 'newsletter';
      const description = 'Updated newsletter description';

      const updateResponse: MessageResponse = {
        message: 'Tag updated successfully'
      };

      api.put('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, updateResponse);

      const result = await client.update(tag, description);

      expect(requestBody).toMatchObject({
        tag: 'newsletter',
        description: 'Updated newsletter description'
      });
      expect(result).toMatchObject({
        message: 'Tag updated successfully'
      });
    });

    it('handles empty description', async () => {
      let requestBody: nock.Body | undefined;
      const tag = 'promotional';
      const description = '';

      const updateResponse: MessageResponse = {
        message: 'Tag updated successfully'
      };

      api.put('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, updateResponse);

      await client.update(tag, description);

      expect(requestBody).toMatchObject({
        tag: 'promotional',
        description: ''
      });
    });
  });

  describe('destroy', () => {
    it('deletes a tag', async () => {
      let requestBody: nock.Body | undefined;
      const tag = 'newsletter';

      const deleteResponse: MessageResponse = {
        message: 'Tag deleted successfully'
      };

      api.delete('/v1/analytics/tags', (body: nock.Body) => {
        requestBody = body;
        return true;
      })
        .reply(200, deleteResponse);

      const result = await client.destroy(tag);

      expect(requestBody).toMatchObject({
        tag: 'newsletter'
      });
      expect(result).toMatchObject({
        message: 'Tag deleted successfully'
      });
    });

    it('handles tag deletion', async () => {
      const tag = 'old-campaign';

      const deleteResponse: MessageResponse = {
        message: 'Tag has been deleted'
      };

      api.delete('/v1/analytics/tags')
        .reply(200, deleteResponse);

      const result = await client.destroy(tag);

      expect(result.message).toBeDefined();
      expect(result.message).toContain('deleted');
    });
  });
});
