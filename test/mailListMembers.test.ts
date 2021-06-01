const formData = require('form-data');

import nock from 'nock';
import Request from '../lib/request';
import RequestOptions from '../lib/interfaces/RequestOptions';
import MailListMembers from '../lib/mailListMembers';
import { DeletedMember, MailListMember } from '../lib/interfaces/mailListMembers';

describe('mailListsMembersClient', function () {
  let client: any;
  let api: any;
  let defaultListMember : MailListMember;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData);
    client = new MailListMembers(reqObject);
    api = nock('https://api.mailgun.net');
    defaultListMember = {
      address: 'testingMailingListMemberAddress@example.com',
      name: 'test name',
      subscribed: true,
      vars: { gender: 'female', age: 0 }
    } as MailListMember
  });

  afterEach(function () {
    api.done();
  });

  describe('listMembers', function () {
    it('fetches all mail list members', function () {
      const lists = [defaultListMember];

      api.get('/v3/lists/list-name/members/pages').reply(200, {
        items: lists
      });

      return client.listMembers('list-name').then(function (membersList: MailListMember[]) {
        membersList[0].should.eql(defaultListMember);
      });
    });
  });

  describe('getMember', function () {
    it('gets a specific mailing list member', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      api.get(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, {
        member: defaultListMember
      });

      return client.getMember('testingMailingListAddress@example.com', 'testingMailingListMemberAddress@example.com')
        .then(function (listMember: MailListMember) {
          listMember.should.eql(defaultListMember);
        });
    });
  });

  describe('createMember', function () {
    it('adds list member to the mailing list ', function () {
      const member:any = {...defaultListMember};
      member.subscribed = true;
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      return client.createMember(mailingListAddress, member).then(function (newListMember:any) {
        newListMember.should.eql(member);
      })
    });

    it('works with string value in subscribed field', function () {
      const member:any = {...defaultListMember};
      member.subscribed = "yes";
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      return client.createMember(mailingListAddress, member).then(function (newListMember:any) {
        newListMember.should.eql(member);
      })
    });
  });

  describe('destroyMember', function () {

    it('deletes member from the list ', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const res = {
        member: defaultListMember,
        message: "deleted"
      } as DeletedMember;

      api.delete(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, res);

      return client.destroyMember(mailingListAddress, mailingListMemberAddress).then(function (deletedMemberRes: DeletedMember) {
        deletedMemberRes.should.eql(res);
      });
    });
  });

});
