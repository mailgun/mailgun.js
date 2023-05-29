import fs from 'fs';
import nock from 'nock';
import { expect } from 'chai';
import formData from 'form-data';

import Request from '../lib/Classes/common/Request';
import MessagesClient from '../lib/Classes/Messages';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import { IMessagesClient } from '../lib/Interfaces';
import { MessagesSendResult } from '../lib/Types/Messages';

const mailgunLogo = fs.createReadStream(`${__dirname}/img/mailgun.png`);

describe('MessagesClient', function () {
  let client: IMessagesClient;
  let api: nock.Scope;

  beforeEach(function () {
    client = new MessagesClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    nock.cleanAll();
    nock.restore();
    if (!nock.isActive()) nock.activate();
    api.done();
  });

  describe('create with attachments', function () {
    it('sends a custom attachment', async function () {
      api.post('/v3/sandbox.mailgun.org/messages').reply(200, {
        message: 'Queued. Thank you.',
        id: '<20111114174239.25659.5817@samples.mailgun.org>'
      });

      const res: MessagesSendResult = await client.create('sandbox.mailgun.org', {
        to: 'foo@example.com',
        from: 'bar@example.com',
        subject: 'howdy!',
        text: 'Testing some Mailgun awesomeness!',
        attachment: [{
          filename: 'test-image',
          data: mailgunLogo
        }]
      });

      expect(res.message).to.eql('Queued. Thank you.');
    });
  });
});
