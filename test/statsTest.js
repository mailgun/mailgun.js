var nock = require('nock');
var should = require('should');
import Request from '../lib/request';
import StatsClient from '../lib/stats';

describe('StatsClient', function() {
  var client, api;

  beforeEach(function() {
    client = new StatsClient(new Request({ url: 'https://api.mailgun.net' }));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function() {
    api.done();
  });

  describe('getDomain', function() {
    it('fetches stats for a given domain', function() {
      api.get('/v3/domain.com/stats/total?event=delivered').reply(200, {
        'end': 'Mon, 23 Mar 2015 00:00:00 UTC',
        'resolution': 'day',
        'start': 'Mon, 16 Mar 2015 00:00:00 UTC',
        'stats': [
          {
            'time': 'Mon, 16 Mar 2015 00:00:00 UTC',
            'delivered': {
              'smtp': 2,
              'http': 1,
              'total': 3
            }
          }
        ]
      });

      return client.getDomain('domain.com', {event: 'delivered'}).then(function(stats) {
        stats.start.toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.end.toUTCString().should.eql('Mon, 23 Mar 2015 00:00:00 GMT');

        stats.stats[0].time.toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.stats[0].delivered.http.should.eql(1);
        stats.stats[0].delivered.smtp.should.eql(2);
        stats.stats[0].delivered.total.should.eql(3);
      });
    });
  });

  describe('getAccount', function() {
    it('fetches stats for a given account', function() {
      api.get('/v3/stats/total?event=delivered').reply(200, {
        'end': 'Mon, 23 Mar 2015 00:00:00 UTC',
        'resolution': 'day',
        'start': 'Mon, 16 Mar 2015 00:00:00 UTC',
        'stats': [
          {
            'time': 'Mon, 16 Mar 2015 00:00:00 UTC',
            'delivered': {
              'smtp': 2,
              'http': 1,
              'total': 3
            }
          }
        ]
      });

      return client.getAccount({event: ['delivered']}).then(function(stats) {
        stats.start.toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.end.toUTCString().should.eql('Mon, 23 Mar 2015 00:00:00 GMT');

        stats.stats[0].time.toUTCString().should.eql('Mon, 16 Mar 2015 00:00:00 GMT');
        stats.stats[0].delivered.http.should.eql(1);
        stats.stats[0].delivered.smtp.should.eql(2);
        stats.stats[0].delivered.total.should.eql(3);
      });
    });
  });

});
