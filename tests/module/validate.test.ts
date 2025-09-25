import nock from 'nock';
import Request from './test-utils/TestRequest.js';
import ValidateClient from '../../lib/Classes/Validations/validate.js';
import { ValidationResult, RequestOptions } from '../../lib/Types/index.js';
import MultipleValidationClient from '../../lib/Classes/Validations/multipleValidation.js';
import { IValidationClient } from '../../lib/Interfaces/index.js';
import getTestFormData from './test-utils/TestFormData.js';

describe('ValidateClient', function () {
  let validateClient: IValidationClient;
  let api: nock.Scope;

  beforeEach(function () {
    const reqObject = new Request({ url: 'https://api.mailgun.net' } as RequestOptions, getTestFormData());
    const multipleValidationClient = new MultipleValidationClient(reqObject);
    validateClient = new ValidateClient(reqObject, multipleValidationClient);
    api = nock('https://api.mailgun.net');
  });

  afterEach(function () {
    api.done();
  });

  describe('get', () => {
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
      expect(response).toEqual(data);
    });
  });
});
