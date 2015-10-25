var nock = require('nock');
var should = require('should');
import Request from '../lib/request';
import SuppressionClient from '../lib/suppressions';

describe('SuppressionsClient', function() {
  var client, api;

  beforeEach(function() {
    client = new SuppressionClient(new Request({ url: 'https://api.mailgun.net' }));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function() {
    api.done();
  });

  describe('list', function() {
    var response;

    beforeEach(function() {
      response = {
        'items': [],
        'paging': {
          'first': 'https://api.mailgun.net/v3/mailgun.com/bounces?page=first',
          'last': 'https://api.mailgun.net/v3/mailgun.com/bounces?page=last',
          'next': 'https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com',
          'previous': 'https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com'
        }
      };
    });

    it('fetches bounces', function() {
      response.items = [{
        'address': 'unknown@unknown.com',
        'code': 550,
        'error': 'No such mailbox',
        'created_at': 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        'address': 'full@disk.com',
        'code': 552,
        'error': 'Mailbox full',
        'created_at': 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/bounces').reply(200, response);

      return client.list('domain.com', 'bounces').then(function(bounces) {
        var b;
        b = bounces.items[0];
        b.address.should.eql('unknown@unknown.com');
        b.code.should.eql(550);
        b.error.should.eql('No such mailbox');
        b.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

        b = bounces.items[1];
        b.address.should.eql('full@disk.com');
        b.code.should.eql(552);
        b.error.should.eql('Mailbox full');
        b.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
      });
    });

    it('fetches unsubscribes', function() {
      response.items = [{
        'address': 'brad@example.com',
        'tags': ['*'],
        'created_at': 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        'address': 'roman@example.com',
        'tags': ['*'],
        'created_at': 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/unsubscribes').reply(200, response);

      return client.list('domain.com', 'unsubscribes').then(function(unsubscribes) {
        var u;

        u = unsubscribes.items[0];
        u.address.should.eql('brad@example.com');
        u.tags.should.eql(['*']);
        u.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

        u = unsubscribes.items[1];
        u.address.should.eql('roman@example.com');
        u.tags.should.eql(['*']);
        u.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
      });
    });

    it('fetches complaints', function() {
      response.items = [{
        'address': 'brad@example.com',
        'created_at': 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        'address': 'roman@example.com',
        'created_at': 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/complaints').reply(200, response);

      return client.list('domain.com', 'complaints').then(function(complaints) {
        var c;

        c = complaints.items[0];
        c.address.should.eql('brad@example.com');
        c.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

        c = complaints.items[1];
        c.address.should.eql('roman@example.com');
        c.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
      });
    });

    it('parses page links', function() {
      api.get('/v3/domain.com/bounces').reply(200, response);

      return client.list('domain.com', 'bounces').then(function(bounces) {
        var page;

        page = bounces.pages.first;
        page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=first');
        should(page.page).eql('first');
        should(page.address).eql(undefined);

        page = bounces.pages.last;
        page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=last');
        should(page.page).eql('last');
        should(page.address).eql(undefined);

        page = bounces.pages.next;
        page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com');
        should(page.page).eql('next');
        page.address.should.eql('next@mailgun.com');

        page = bounces.pages.previous;
        page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com');
        should(page.page).eql('previous');
        page.address.should.eql('previous@mailgun.com');
      });
    });
  });

  describe('get', function() {
    it('fetches bounce for address', function() {
      api.get('/v3/domain.com/bounces/address%3F%40unknown.com').reply(200, {
        'address': 'address?@unknown.com',
        'code': 550,
        'error': 'No such mailbox',
        'created_at': 'Fri, 21 Oct 2011 11:02:55 GMT'
      });

      return client.get('domain.com', 'bounces', 'address?@unknown.com').then(function(bounce) {
        bounce.address.should.eql('address?@unknown.com');
        bounce.code.should.eql(550);
        bounce.error.should.eql('No such mailbox');
        bounce.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');
      });
    });

    it('fetches unsubscribe for address', function() {
      api.get('/v3/domain.com/unsubscribes/roman%3F%40example.com').reply(200, {
        'address': 'address?@unknown.com',
        'tags': ['*'],
        'created_at': 'Fri, 21 Oct 2011 12:02:55 GMT'
      });

      return client.get('domain.com', 'unsubscribes', 'roman?@example.com').then(function(unsubscribe) {
        unsubscribe.address.should.eql('address?@unknown.com');
        unsubscribe.tags.should.eql(['*']);
        unsubscribe.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
      });
    });
  });

  describe('create', function() {
    it('creates suppression', function() {
      api.post('/v3/domain.com/bounces').reply(200, {
        'message': 'Bounced address has been inserted',
        'address': 'myaddress'
      });

      return client.create('domain.com', 'bounces', {
        address: 'myaddress',
        code: 550
      }).then(function(data) {
        data.address.should.eql('myaddress');
      });
    });
  });

  describe('destroy', function() {
    it('deletes suppression', function() {
      api.delete('/v3/domain.com/bounces/my%3F%40address.com').reply(200, {
        'message': 'Bounced address has been removed',
        'address': 'my?@address.com'
      });

      return client.destroy('domain.com', 'bounces', 'my?@address.com').then(function(data) {
        data.address.should.eql('my?@address.com');
      });
    });
  });
});
