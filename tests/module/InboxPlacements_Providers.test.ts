import nock from 'nock';
import Request from './test-utils/TestRequest.js';

import { RequestOptions } from '../../lib/Types/Common/index.js';

import InboxPlacementsProvidersClient from '../../lib/Classes/InboxPlacements/providers/InboxPlacementsProviders.js';
import { IInboxPlacementsProvidersClient } from '../../lib/Interfaces/InboxPlacements/providers/InboxPlacementsProviders.js';
import getTestFormData from './test-utils/TestFormData.js';

// TODO: fix types
describe('Inbox Placements Providers', () => {
  let client: IInboxPlacementsProvidersClient;
  let api: nock.Scope;

  beforeEach(() => {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new InboxPlacementsProvidersClient(reqObject);
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  describe('list', () => {
    it('fetches inbox placements providers lists', async () => {
      const providers = [
        {
          domain: 'aol.com',
          display_name: 'AOL',
          region: 'Global',
          created_at: '2023-01-04T17:40:03.400Z',
          updated_at: '2023-02-17T17:20:12.172Z'
        },
        {
          domain: 'att.net',
          display_name: 'AT&T',
          region: 'UnitedStates',
          created_at: '2023-01-04T17:42:30.576Z',
          updated_at: '2023-02-17T17:20:20.664Z'
        },
        {
          domain: 'comcast.net',
          display_name: 'Comcast / Xfinity',
          region: 'United States',
          created_at: '2023-02-16T20:24:10.789Z',
          updated_at: '2023-02-16T20:24:10.789Z'
        }
      ];
      api.get('/v4/inbox/providers').reply(200, {
        items: providers
      });

      const IPProviders = await client.list();
      expect(IPProviders).toMatchObject({
        status: 200,
        items: expect.any(Array),

      });
      expect(IPProviders.items).toHaveLength(3);

      const expectedProviders = providers.map((provider) => ({
        ...provider,
        created_at: new Date(provider.created_at),
        updated_at: new Date(provider.updated_at)
      }));
      expect(IPProviders.items).toEqual(expectedProviders);
    });
  });
});
