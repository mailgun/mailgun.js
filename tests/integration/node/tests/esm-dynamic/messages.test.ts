import nock from 'nock';
import fs from 'fs/promises';
import path from 'path';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from '@jest/globals';
import { getMailgunClient } from './helpers/clientInit.mjs';
import { successResponse } from '../../../tests_data/messageResponses';

describe('Send message functionality', () => {
  let api: nock.Scope;
  const testingTable = [
    { isFDPackage: true, name: '(with package FormData)' },
    { isFDPackage: false, name: '(with native FormData)' }
  ];

  beforeEach(async () => {
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  test.each(testingTable)('Sends plain email $name', async ({ isFDPackage }) => {
    const client = await getMailgunClient({ withFormDataPackage: isFDPackage });

    api.post('/v3/test.domain.com/messages').reply(200, successResponse.body);

    const result = await client.messages.create('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      text: 'Hello world!'
    });
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });

  test.each(testingTable)('Sends mime email $name', async ({ isFDPackage }) => {
    const client = await getMailgunClient({ withFormDataPackage: isFDPackage });
    api.post('/v3/test.domain.com/messages.mime').reply(200, successResponse.body);
    const result = await client.messages.create('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      message: 'hello world!'
    });

    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });

  test.each(testingTable)('Sends an attachment  $name', async ({ isFDPackage }) => {
    api.post('/v3/test.domain.com/messages').reply(200, successResponse.body);
    const client = await getMailgunClient({ withFormDataPackage: isFDPackage });
    const img = await fs.readFile(path.resolve(__dirname, '../../../tests_data/img/mailgun.png'));
    const result = await client.messages.create('test.domain.com', {
      to: 'foo@example.com',
      from: 'bar@example.com',
      subject: 'howdy!',
      attachment: [{ filename: 'test_file', data: img }]
    });
    expect(typeof result).toBe('object');
    expect(result).toEqual({
      status: 200,
      message: 'Queued. Thank you.',
      id: '<20111114174239.25659.5817@samples.mailgun.org>'
    });
  });
});
