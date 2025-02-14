import APIError from '../../lib/Classes/common/Error.js';
import { APIErrorOptions } from '../../lib/Types/Common/index.js';

describe('APIError', function () {
  it('sets status', function () {
    const error = new APIError({ status: 200 } as APIErrorOptions);
    expect(error).toMatchObject({
      status: 200,
      type: 'MailgunAPIError'
    });
  });

  describe('details property', () => {
    it('sets details from message field', () => {
      const error = new APIError({
        body: {
          message: 'oops. something went wrong'
        }
      } as APIErrorOptions);
      expect(error).toMatchObject({
        details: 'oops. something went wrong'
      });
    });

    it('sets details if body is a string', () => {
      const error = new APIError({
        body: 'oops. something went wrong',
        status: 500
      } as APIErrorOptions);
      expect(error).toMatchObject({
        details: 'oops. something went wrong'
      });
    });
  });

  it('sets message from error field', () => {
    const error = new APIError({
      body: {
        error: 'oops. something went wrong'
      }
    } as APIErrorOptions);

    expect(error).toMatchObject({
      message: 'oops. something went wrong'
    });
  });

  it('Creates instance if no data', () => {
    const error = new APIError({} as APIErrorOptions);
    expect(error).toMatchObject({
      status: undefined,
      message: '',
      details: '',
      type: 'MailgunAPIError'
    });
  });
});
