import nock from 'nock';
import Request from './test-utils/TestRequest.js';

import { RequestOptions } from '../../lib/Types/Common/index.js';

import { IInboxPlacementsClient } from '../../lib/Interfaces/index.js';
import InboxPlacementsClient from '../../lib/Classes/InboxPlacements/inboxPlacements.js';

import SeedsListsClient from '../../lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient.js';
import InboxPlacementsResultsClient from '../../lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient.js';
import InboxPlacementsProvidersClient from '../../lib/Classes/InboxPlacements/providers/InboxPlacementsProviders.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('Inbox Placements Client', () => {
  let client: IInboxPlacementsClient;
  let api: nock.Scope;

  beforeEach(() => {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    client = new InboxPlacementsClient(
      reqObject,
      {} as SeedsListsClient,
      {} as InboxPlacementsResultsClient,
      {} as InboxPlacementsProvidersClient
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  describe('runTest', () => {
    it('runs inbox placements test', async () => {
      api.post('/v4/inbox/tests').reply(200, {
        result_id: 'test_result_id',
        links: {
          results: 'test_results'
        }
      });

      const runTestResponse = await client.runTest({
        from: 'from',
        subject: 'subject',
        provider_filter: ['test'],
        html: 'some html',
      });
      expect(runTestResponse).toMatchObject({
        result_id: 'test_result_id',
        links: {
          results: 'test_results'
        },
        status: 200
      });
    });
  });
});
