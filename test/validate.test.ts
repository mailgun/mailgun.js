import formData from 'form-data';

import nock from 'nock';
import Request from '../lib/Classes/common/Request';
import ValidateClient from '../lib/Classes/Validations/validate';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import MultipleValidationClient from '../lib/Classes/Validations/multipleValidation';
import { ValidationResult } from '../lib/Types/Validations';
import { IValidationClient } from '../lib/Interfaces';

describe('ValidateClient', function () {
  let validateClient: IValidationClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData);
    const multipleValidationClient = new MultipleValidationClient(reqObject);
    validateClient = new ValidateClient(reqObject, multipleValidationClient);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', async () => {
    it('validates a single email address', async () => {
      const data: nock.ReplyBody = {
        address: 'Alice <alice@example.com>',
        did_you_mean: null,
        is_valid: false,
        parts: { display_name: null, domain: null, local_part: null }
      };

      api.get('/v4/address/validate')
        .query({ address: 'foo@example.com' })
        .reply(200, data);

      const response: ValidationResult = await validateClient.get('foo@example.com');
      response.should.eql(data);
    });
  });
});
