/* global expect */
const nock = require('nock');
const fs = require('fs/promises');
const path = require('path');
const { getMailgunClient } = require('./helpers/clientInit');
const { successResponse } = require('../../../tests_data/messageResponses');

describe('Send message functionality', () => {
  const clientWithPackageFD = getMailgunClient({ withFormDataPackage: false });
  const clientWithNativeFD = getMailgunClient({ withFormDataPackage: true });
  let api;
  const testingTable = [
    { client: clientWithNativeFD, name: '(with native FormData)' },
    { client: clientWithPackageFD, name: '(with package FormData)' }
  ];

  beforeEach(async () => {
    api = nock('https://api.mailgun.net');
  });

  afterEach(() => {
    api.done();
  });

  test.each(testingTable)('Sends plain email $name', async ({ client }) => {
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

  test.each(testingTable)('Sends mime email $name', async ({ client }) => {
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

  it.each(testingTable)('Sends an attachment  $name', async ({ client }) => {
    api.post('/v3/test.domain.com/messages').reply(200, successResponse.body);
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
