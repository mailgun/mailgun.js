import chai, { expect } from 'chai';
import formData from 'form-data';
import nock from 'nock';

import Request from '../lib/Classes/common/Request';
import SuppressionClient from '../lib/Classes/Suppressions/SuppressionsClient';
import { RequestOptions } from '../lib/interfaces/RequestOptions';
import { InputFormData } from '../lib/interfaces/IFormData';
import { WhiteListData } from '../lib/interfaces/Suppressions/WhiteList';

chai.should();

describe('SuppressionsClient', function () {
  let client: any;
  let api: any;

  beforeEach(function () {
    client = new SuppressionClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('list', function () {
    let response: any;

    beforeEach(function () {
      response = {
        items: [],
        paging: {
          first: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=first',
          last: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=last',
          next: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com',
          previous: 'https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com'
        }
      };
    });

    it('fetches bounces', function () {
      response.items = [{
        address: 'unknown@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'full@disk.com',
        code: 552,
        error: 'Mailbox full',
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/bounces').reply(200, response);

      return client.list('domain.com', 'bounces')
        .then(function (bounces: { items: any }) {
          let b;
          b = bounces.items[0];
          b.address.should.eql('unknown@unknown.com');
          b.code.should.eql(550);
          b.error.should.eql('No such mailbox');
          (b.created_at as Date).toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

          b = bounces.items[1];
          b.address.should.eql('full@disk.com');
          b.code.should.eql(552);
          b.error.should.eql('Mailbox full');
          (b.created_at as Date).toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
        });
    });

    it('fetches unsubscribes', function () {
      response.items = [{
        address: 'brad@example.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'roman@example.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/unsubscribes').reply(200, response);

      return client.list('domain.com', 'unsubscribes')
        .then(function (unsubscribes: { items: any }) {
          let u;

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

    it('fetches complaints', function () {
      response.items = [{
        address: 'brad@example.com',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      }, {
        address: 'roman@example.com',
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      }];

      api.get('/v3/domain.com/complaints').reply(200, response);

      return client.list('domain.com', 'complaints')
        .then(function (complaints: { items: any }) {
          let c;

          c = complaints.items[0];
          c.address.should.eql('brad@example.com');
          c.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');

          c = complaints.items[1];
          c.address.should.eql('roman@example.com');
          c.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
        });
    });

    it('fetches WhiteLists', function () {
      response.items = [{
        type: 'whitelists',
        value: 'brad@example.com',
        reason: 'first reason',
        createdAt: '2021-11-30T10:38:56.000Z'
      }, {
        type: 'whitelists',
        value: 'roman@example.com',
        reason: 'second reason',
        createdAt: '2021-11-30T10:38:56.000Z'
      }];

      api.get('/v3/domain.com/whitelists').reply(200, response);

      return client.list('domain.com', 'whitelists')
        .then(function (complaints: { items: WhiteListData[] }) {
          let c;
          c = complaints.items[0];
          c.type.should.eql('whitelists');
          c.value.should.eql('brad@example.com');
          c.reason.should.eql('first reason');
          c.createdAt.should.eql(new Date('2021-11-30T10:38:56.000Z'));

          c = complaints.items[1];
          c.type.should.eql('whitelists');
          c.value.should.eql('roman@example.com');
          c.reason.should.eql('second reason');
          c.createdAt.should.eql(new Date('2021-11-30T10:38:56.000Z'));
        });
    });

    it('parses page links', async () => {
      api.get('/v3/domain.com/bounces').reply(200, response);
      const bounces = await client.list('domain.com', 'bounces');
      let page;

      page = bounces.pages.first;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=first');
      expect(page.page).to.eql('?page=first');
      expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.last;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=last');
      expect(page.page).to.be.eql('?page=last');
      expect(page.iteratorPosition).to.be.eql(undefined);

      page = bounces.pages.next;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=next&address=next@mailgun.com');
      expect(page.page).to.be.eql('?page=next&address=next@mailgun.com');
      page.iteratorPosition.should.eql('next@mailgun.com');

      page = bounces.pages.previous;
      page.url.should.eql('https://api.mailgun.net/v3/mailgun.com/bounces?page=previous&address=previous@mailgun.com');
      expect(page.page).to.be.eql('?page=previous&address=previous@mailgun.com');
      page.iteratorPosition.should.eql('previous@mailgun.com');
    });
  });

  describe('get', function () {
    it('fetches bounce for address', function () {
      api.get('/v3/domain.com/bounces/address%3F%40unknown.com').reply(200, {
        address: 'address?@unknown.com',
        code: 550,
        error: 'No such mailbox',
        created_at: 'Fri, 21 Oct 2011 11:02:55 GMT'
      });

      return client.get('domain.com', 'bounces', 'address?@unknown.com')
        .then(function (bounce: any) {
          bounce.address.should.eql('address?@unknown.com');
          bounce.code.should.eql(550);
          bounce.error.should.eql('No such mailbox');
          bounce.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 11:02:55 GMT');
        });
    });

    it('fetches unsubscribe for address', function () {
      api.get('/v3/domain.com/unsubscribes/roman%3F%40example.com').reply(200, {
        address: 'address?@unknown.com',
        tags: ['*'],
        created_at: 'Fri, 21 Oct 2011 12:02:55 GMT'
      });

      return client.get('domain.com', 'unsubscribes', 'roman?@example.com')
        .then(function (unsubscribe: any) {
          unsubscribe.address.should.eql('address?@unknown.com');
          unsubscribe.tags.should.eql(['*']);
          unsubscribe.created_at.toUTCString().should.eql('Fri, 21 Oct 2011 12:02:55 GMT');
        });
    });
  });
  describe('create', function () {
    describe('create bounce', function () {
      it('creates suppression', function () {
        api.post('/v3/domain.com/bounces').reply(200, {
          message: '1 addresses have been added to the bounces table'
        });

        return client.create('domain.com', 'bounces', {
          address: 'myaddress',
          code: 550
        }).then(function (data: { message: string }) {
          data.message.should.eql('1 addresses have been added to the bounces table');
        });
      });
    });

    describe('create multiple bounces', function () {
      it('creates bounces', async function () {
        const message = '2 addresses have been added to the bounces table';
        api.post('/v3/domain.com/bounces').reply(200, {
          message
        });
        return client.create('domain.com', 'bounces',
          [{ address: 'myaddress' }, { address: 'myaddress1' }])
          .then(function (data: { message: string }) {
            data.message.should.eql(message);
          });
      });
    });
    describe('create whitelists', function () {
      it('creates whitelist', async function () {
        const message = '1 addresses have been added to the whitelists table';
        api.post('/v3/domain.com/whitelists').reply(200, {
          message
        });
        return client.create('domain.com', 'whitelists',
          { address: 'myaddress' })
          .then(function (data: { message: string }) {
            data.message.should.eql(message);
          });
      });
    });

    describe('create multiple whitelists', function () {
      it('throws in case multiple whitelists provided', async function () {
        try {
          await client.create('domain.com', 'whitelists',
            [{ address: 'myaddress' }, { address: 'myaddress1' }]);
        } catch (error: any) {
          error.message.should.eql('Data property should be an object');
          error.details.should.eql("Whitelist's creation process does not support multiple creations. Data property should be an object");
          error.status.should.eql(400);
        }
      });
    });

    it('throws in case type is unknown', async function () {
      try {
        await client.create('domain.com', 'wrong type',
          { address: 'myaddress' });
      } catch (error: any) {
        error.message.should.eql('Unknown type value');
        error.details.should.eql('Type may be only one of [bounces, complaints, unsubscribes, whitelists]');
        error.status.should.eql(400);
      }
    });
  });

  describe('destroy', function () {
    it('deletes suppression', function () {
      api.delete('/v3/domain.com/bounces/my%3F%40address.com').reply(200, {
        message: 'Bounced address has been removed',
        address: 'my?@address.com'
      });

      return client.destroy('domain.com', 'bounces', 'my?@address.com')
        .then(function (data: { address: string }) {
          data.address.should.eql('my?@address.com');
        });
    });
  });
});
