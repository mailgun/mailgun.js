const formData = require('form-data');

import nock from 'nock';
import Request from '../lib/request';
import StatsClient from '../lib/stats';
import RequestOptions from '../lib/interfaces/RequestOptions';
import StatsOptions from '../lib/interfaces/StatsOptions';

describe('StatsClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new StatsClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('getDomain', function () {
    const query = { event: 'delivered' };

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
