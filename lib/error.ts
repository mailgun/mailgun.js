import APIErrorOptions from './types/APIErrorOptions';

export default class APIError extends Error {
  status: number | string;
  stack: string;
  details: string;

  constructor({
    status,
    statusText,
    message,
    body = {}
  }: APIErrorOptions) {
    let bodyMessage = '';
    let error = '';
    if (typeof body === 'string') {
      bodyMessage = body;
    } else {
      bodyMessage = body?.message;
      error = body?.error;
    }
    super();

    this.stack = '';
    this.status = status;
    this.message = message || error || statusText;
    this.details = bodyMessage;
  }
}
