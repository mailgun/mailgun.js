import APIError from '../lib/Classes/common/Error';
import { APIErrorOptions } from '../lib/Types/Common';

describe('APIError', function () {
  it('sets status', function () {
    const error = new APIError({ status: 200 } as APIErrorOptions);
    error.status.should.eql(200);
  });

  describe('details property', () => {
    it('sets details from message field', () => {
      const error = new APIError({
        body: {
          message: 'oops. something went wrong'
        }
      } as APIErrorOptions);

      error.details.should.eql('oops. something went wrong');
    });

    it('sets details if body is a string', () => {
      const error = new APIError({
        body: 'oops. something went wrong',
        status: 500
      } as APIErrorOptions);

      error.details.should.eql('oops. something went wrong');
    });
  });

  it('sets message from error field', () => {
    const error = new APIError({
      body: {
        error: 'oops. something went wrong'
      }
    } as APIErrorOptions);

    error.message.should.eql('oops. something went wrong');
  });

  it('Creates instance if no data', () => {
    const error = new APIError({} as APIErrorOptions);
    error.should.has.property('status');
    error.should.has.property('message');
    error.should.has.property('details');
    error.type.should.eql('MailgunAPIError');
  });
});
