
import APIErrorOptions from './interfaces/APIErrorOptions';

export default  class APIError extends Error {
  status: number | string;
  stack: string;

  constructor({
    status,
    statusText,
    message,
    body = {}
  }: APIErrorOptions) {
    const { error } = body;
    super();

    this.stack = null;
    this.status = status;
    this.message = message || error || statusText;
  }
}
