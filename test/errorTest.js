var APIError = require('../lib/error');

describe('APIError', function() {
  var error;

  it('sets status', function() {
    error = new APIError({ status: 200 });

    error.status.should.eql(200);
  });

  it('sets message from message field', function() {
    error = new APIError({
      body: {
        message: 'oops. something went wrong'
      }
    });

    error.message.should.eql('oops. something went wrong');
  });

  it('sets message from error field', function() {
    error = new APIError({
      body: {
        error: 'oops. something went wrong'
      }
    });

    error.message.should.eql('oops. something went wrong');
  });

  it('sets request ID', function() {
    error = new APIError({
      headers: {
        'x-mailgun-request-id': 'a-b-c-d'
      }
    });

    error.id.should.eql('a-b-c-d');
  });
});
