import APIErrorOptions from './interfaces/APIErrorOptions';

export default class APIError extends Error {
  status: number | string;
  details: string;

  constructor({
    status,
    statusText,
    message,
    body = {},
  }: APIErrorOptions) {
    const { message: bodyMessage, error } = body;
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    } else {
      this.stack = '';
    }

    this.name = 'APIError';
    this.status = status;
    this.message = message || error || statusText;
    this.details = bodyMessage;
  }
}
