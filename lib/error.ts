import APIErrorOptions from './interfaces/APIErrorOptions';

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
    const { message: bodyMessage, error } = body;
    super();

    this.stack = '';
    this.status = status;
    this.message = message || error || statusText;
    this.details = bodyMessage;
  }
}
