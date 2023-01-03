import formData from 'form-data';

import nock from 'nock';
import { expect } from 'chai';
import Request from '../lib/Classes/common/Request';
import StatsClient from '../lib/Classes/Stats/StatsClient';
import { StatsOptions, StatsQuery } from '../lib/Types/Stats';
import { InputFormData, RequestOptions } from '../lib/Types/Common';

describe('StatsClient', function () {
  let client: StatsClient;
  let api: any;

  beforeEach(function () {
    client = new StatsClient(
      new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData),
      {
        warn: () => undefined
      }
    );
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('getDomain', function () {
    const query = { event: 'delivered' } as StatsQuery;

    it('fetches stats for a given domain', function () {
      api.get('/v3/domain.com/stats/total')
        .query(query)
        .reply(200, {
          end: 'Mon, 23 Mar 2015 00:00:00 UTC',
          resolution: 'day',
          start: 'Mon, 16 Mar 2015 00:00:00 UTC',
          stats: [
            {
              time: 'Mon, 16 Mar 2015 00:00:00 UTC',
              delivered: {
                smtp: 2,
                http: 1,
                total: 3
              }
            }
          ]
        });

      return client.getDomain('domain.com', query).then(function (stats: StatsOptions) {
        (stats.start as Date).toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        (stats.end as Date).toUTCString().should.eql('Mon, 23 Mar 2015 00:00:00 GMT');

        (stats.stats[0].time as Date).toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.stats[0].delivered.http.should.eql(1);
        stats.stats[0].delivered.smtp.should.eql(2);
        stats.stats[0].delivered.total.should.eql(3);
      });
    });

    it('works with js dates', async () => {
      const queryWithDates = {
        event: 'delivered',
        start: new Date('2022-12-25T00:00:00.000Z'),
        end: new Date('2022-12-29T00:00:00.000Z'),
      } as StatsQuery;
      let requestObject: any;
      api.get('/v3/domain.com/stats/total')
        .query((actualQueryObject: any) => {
          requestObject = actualQueryObject;
          return true;
        }) // response regardless of the passed query string
        .reply(200, {
          end: 'Mon, 23 Mar 2015 00:00:00 UTC',
          resolution: 'day',
          start: 'Mon, 16 Mar 2015 00:00:00 UTC',
          stats: []
        });

      await client.getDomain('domain.com', queryWithDates);
      expect(requestObject).to.eql({
        event: 'delivered',
        start: 'Sun, 25 Dec 2022 00:00:00 GMT',
        end: 'Thu, 29 Dec 2022 00:00:00 GMT'
      });
    });

    it('works with events array dates', async () => {
      const queryWithTwoEvents = {
        event: ['delivered', 'accepted']
      } as StatsQuery;
      let requestObject: any;
      api.get('/v3/domain.com/stats/total')
        .query((actualQueryObject: any) => {
          requestObject = actualQueryObject;
          return true;
        }) // response regardless of the passed query string
        .reply(200, {
          end: 'Mon, 23 Mar 2015 00:00:00 UTC',
          resolution: 'day',
          start: 'Mon, 16 Mar 2015 00:00:00 UTC',
          stats: []
        });

      await client.getDomain('domain.com', queryWithTwoEvents);
      expect(requestObject).to.eql({
        event: ['delivered', 'accepted']
      });
    });
  });

  describe('getAccount', function () {
    const query = { event: 'delivered' };

    it('fetches stats for a given account', function () {
      api.get('/v3/stats/total')
        .query(query)
        .reply(200, {
          end: 'Mon, 23 Mar 2015 00:00:00 UTC',
          resolution: 'day',
          start: 'Mon, 16 Mar 2015 00:00:00 UTC',
          stats: [
            {
              time: 'Mon, 16 Mar 2015 00:00:00 UTC',
              delivered: {
                smtp: 2,
                http: 1,
                total: 3
              }
            }
          ]
        });

      return client.getAccount({ event: ['delivered'] }).then(function (stats: StatsOptions) {
        (stats.start as Date).toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        (stats.end as Date).toUTCString().should.eql('Mon, 23 Mar 2015 00:00:00 GMT');

        (stats.stats[0].time as Date).toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.stats[0].delivered.http.should.eql(1);
        stats.stats[0].delivered.smtp.should.eql(2);
        stats.stats[0].delivered.total.should.eql(3);
      });
    });
  });
});
