import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import MailListMembers from '../../lib/Classes/MailingLists/mailListMembers.js';
import {
  RequestOptions,
  CreateUpdateMailListMembers,
  DeletedMember,
  MailListMember,
  MailListMembersByAddressQuery,
  MailListMembersUploadData,
  MailListMembersUploadResponse,
  MultipleMembersData,
  NewMultipleMembersResponse
} from '../../lib/Types/index.js';
import { IMailListsMembers } from '../../lib/Interfaces/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('mailListsMembersClient', function () {
  let mailListsMembersClient: IMailListsMembers;
  let api: nock.Scope;
  let defaultListMember : MailListMember;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    mailListsMembersClient = new MailListMembers(reqObject);
    api = nock('https://api.mailgun.net');
    defaultListMember = {
      address: 'testingMailingListMemberAddress@example.com',
      name: 'test name',
      subscribed: true,
      vars: { gender: 'female', age: 0 }
    } as MailListMember;
  });

  afterEach(function () {
    api.done();
  });

  describe('listMembers', () => {
    it('fetches all mail list members', async function () {
      const lists = [defaultListMember];

      api.get('/v3/lists/list-name/members/pages').reply(200, {
        items: lists,
        paging: {
          first: 'http://test.com/pages?page=1'
        }
      });

      const result = await mailListsMembersClient.listMembers('list-name');
      expect(result).toMatchObject({
        items: expect.any(Array),
        pages: {
          first: expect.objectContaining({
            page: '?page=1',
            url: 'http://test.com/pages?page=1',
            id: 'first'
          })
        }
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject(defaultListMember);
    });
  });

  describe('listMembersByAddress', () => {
    it('fetches members by address on list', async () => {
      const members = [defaultListMember];
      const query: MailListMembersByAddressQuery = {
        address: 'test@example.com',
        skip: 2,
        limit: 5
      };

      api.get('/v3/lists/list-name/members')
        .query({ address: 'test@example.com', skip: '2', limit: '5' })
        .reply(200, {
          items: members,
          total_count: 1
        });

      const result = await mailListsMembersClient.listMembersByAddress('list-name', query);
      expect(result).toMatchObject({
        items: members,
        total_count: 1,
        status: 200
      });
    });
  });

  describe('getMember', () => {
    it('gets a specific mailing list member', async () => {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      api.get(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, {
        member: defaultListMember
      });

      const listMember: MailListMember = await mailListsMembersClient.getMember('testingMailingListAddress@example.com', 'testingMailingListMemberAddress@example.com');
      expect(listMember).toMatchObject(defaultListMember);
    });
  });

  describe('createMember', () => {
    it('adds list member to the mailing list ', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: true,
        vars: JSON.stringify(defaultListMember.vars)
      };

      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      expect(newListMember).toMatchObject(member);
    });

    it('works with string value in subscribed field', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: 'yes',
        vars: JSON.stringify(defaultListMember.vars)
      };
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      expect(newListMember).toMatchObject(member);
    });

    it('works with false value in subscribed field', async () => {
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: false,
        vars: JSON.stringify(defaultListMember.vars)
      };
      const mailingListAddress = 'testingMailingListAddress@example.com';
      api.post(`/v3/lists/${mailingListAddress}/members`).reply(200, {
        member
      });

      const newListMember: MailListMember = await mailListsMembersClient
        .createMember(mailingListAddress, member);
      expect(newListMember).toMatchObject(member);
    });
  });

  describe('createMembers', () => {
    const mailingListAddress = 'testingMailingListAddress@example.com';
    let response : NewMultipleMembersResponse;

    beforeEach(function () {
      response = {
        list: {
          access_level: 'everyone',
          address: mailingListAddress,
          created_at: 'Wed, 26 May 2021 10:40:06 -0000',
          description: 'test description',
          members_count: 5,
          name: 'test name',
          reply_preference: 'list'
        },
        message: 'Mailing list has been updated',
        'task-id': '00000000000000000000000000000000'
      };
    });

    it('adds list of members to the mailing list', async () => {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));

      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);

      const result: NewMultipleMembersResponse = await mailListsMembersClient.createMembers(
        mailingListAddress,
        {
          members: newMembersList,
          upsert: 'yes'
        }
      );
      expect(result).toMatchObject(response);
    });

    it('works with string value in members field', async () => {
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));
      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, response);
      const result: NewMultipleMembersResponse = await mailListsMembersClient
        .createMembers(mailingListAddress, {
          members: newMembersList,
          upsert: 'yes'
        } as MultipleMembersData);
      expect(result).toMatchObject(response);
    });

    it('Should not have file content in FD', async () => {
      let requestObject;
      const newMembersListPlaceholder = new Array(5).fill(0);
      const newMembersList = newMembersListPlaceholder.map((_, index) => ({
        address: `test${index}@example.com`,
        name: `test name ${index}`,
        vars: { gender: 'female', age: index },
        subscribed: true,
        upsert: 'yes'
      }));

      api.post(`/v3/lists/${mailingListAddress}/members.json`).reply(200, function (_uri, requestBody) {
        requestObject = requestBody;
        return response;
      });

      const result: NewMultipleMembersResponse = await mailListsMembersClient
        .createMembers(mailingListAddress, {
          members: newMembersList,
          upsert: 'yes'
        } as MultipleMembersData);
      expect(result).toMatchObject(response);
      expect(requestObject).toEqual(expect.stringContaining('Content-Disposition: form-data; name="members"'));
      // The field should not have filename as it is not a file upload
      expect(requestObject).not.toEqual(expect.stringContaining('Content-Disposition: form-data; name="members"; filename="file"'));
    });
  });

  describe('upload', () => {
    it('uploads mailing list members from string data', async () => {
      const csvData = 'address,name,subscribed\ntest1@example.com,Test User,yes\n';
      const resultData: MailListMembersUploadResponse = {
        list: {
          access_level: 'everyone',
          address: 'testingMailingListAddress@example.com',
          created_at: 'Wed, 26 May 2021 10:40:06 -0000',
          description: 'test description',
          members_count: 1,
          name: 'test name',
          reply_preference: 'list'
        },
        message: 'Mailing list has been updated',
        'task-id': '00000000000000000000000000000000'
      };

      api.post('/v3/lists/testingMailingListAddress@example.com/members.csv').reply(200, resultData);

      const result = await mailListsMembersClient.upload(
        'testingMailingListAddress@example.com',
        csvData
      );

      expect(result).toMatchObject(resultData);
    });

    it('uploads mailing list members as file', async () => {
      let requestObject;
      const csvData = 'address,name,subscribed\ntest1@example.com,Test User,yes\n';
      const resultData: MailListMembersUploadResponse = {
        list: {
          access_level: 'everyone',
          address: 'testingMailingListAddress@example.com',
          created_at: 'Wed, 26 May 2021 10:40:06 -0000',
          description: 'test description',
          members_count: 1,
          name: 'test name',
          reply_preference: 'list'
        },
        message: 'Mailing list has been updated',
        'task-id': '00000000000000000000000000000000'
      };

      api.post('/v3/lists/testingMailingListAddress@example.com/members.csv')
        .reply(200, function (_uri, requestBody) {
          requestObject = requestBody;
          return resultData;
        });

      const result = await mailListsMembersClient.upload(
        'testingMailingListAddress@example.com',
        csvData
      );

      expect(result).toMatchObject(resultData);
      // The field should have filename equal to "file" as it is a file upload
      expect(requestObject).toEqual(expect.stringContaining('Content-Disposition: form-data; name="members"; filename="file"'));
    });

    it('uploads mailing list members from CustomFile object with explicit false flags', async () => {
      const csvData = 'address,name,subscribed\ntest1@example.com,Test User,no\n';
      const fileData: MailListMembersUploadData = {
        data: csvData,
        filename: 'members.csv',
        contentType: 'text/csv'
      };
      const resultData: MailListMembersUploadResponse = {
        list: {
          access_level: 'everyone',
          address: 'testingMailingListAddress@example.com',
          created_at: 'Wed, 26 May 2021 10:40:06 -0000',
          description: 'test description',
          members_count: 1,
          name: 'test name',
          reply_preference: 'list'
        },
        message: 'Mailing list has been updated',
        'task-id': '00000000000000000000000000000000'
      };

      api.post('/v3/lists/testingMailingListAddress@example.com/members.csv').reply(200, resultData);

      const result = await mailListsMembersClient.upload(
        'testingMailingListAddress@example.com',
        fileData,
        false,
        false
      );

      expect(result).toMatchObject(resultData);
    });
  });

  describe('updateMember', () => {
    it('updates list member in the mailing list ', async () => {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        vars: JSON.stringify(defaultListMember.vars)
      };
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      const res: MailListMember = await mailListsMembersClient.updateMember(
        mailingListAddress,
        mailingListMemberAddress,
        member
      );
      expect(res).toMatchObject(defaultListMember);
    });

    it('works with string value in subscribed field', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const member: CreateUpdateMailListMembers = {
        ...defaultListMember,
        subscribed: 'yes',
        vars: JSON.stringify(defaultListMember.vars)
      };
      api.put(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, { member: defaultListMember });

      return mailListsMembersClient.updateMember(
        mailingListAddress,
        mailingListMemberAddress,
        member
      ).then(function (res: MailListMember) {
        expect(res).toMatchObject(defaultListMember);
      });
    });
  });

  describe('destroyMember', () => {
    it('deletes member from the list ', function () {
      const mailingListAddress = 'testingMailingListAddress@example.com';
      const mailingListMemberAddress = 'testingMailingListMemberAddress@example.com';
      const res = {
        member: defaultListMember,
        message: 'deleted'
      } as DeletedMember;

      api.delete(`/v3/lists/${mailingListAddress}/members/${mailingListMemberAddress}`).reply(200, res);

      return mailListsMembersClient.destroyMember(
        mailingListAddress,
        mailingListMemberAddress
      ).then(function (deletedMemberRes: DeletedMember) {
        expect(deletedMemberRes).toMatchObject(res);
      });
    });
  });
});
