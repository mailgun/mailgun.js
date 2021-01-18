import APIError from '../lib/error';
import APIErrorOptions from '../lib/interfaces/APIErrorOptions';

describe('APIError', function () {
  let error;

  it('sets status', function () {
    error = new APIError({ status: 200 } as APIErrorOptions);

    error.status.should.eql(200);
  });

  it('sets message from message field', function () {
    error = new APIError({
      body: {
        message: 'oops. something went wrong'
      }
    } as APIErrorOptions);

    error.details.should.eql('oops. something went wrong');
  });

  it('sets message from error field', function () {
    error = new APIError({
      body: {
        error: 'oops. something went wrong'
      }
    } as APIErrorOptions);

    error.message.should.eql('oops. something went wrong');
  });
});
