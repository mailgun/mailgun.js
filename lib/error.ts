
import APIErrorOptions from './interfaces/APIErrorOptions';

export default  class APIError extends Error {
  status: number | string;
  id: any;

  constructor({
    id,
    headers,
    status,
    message,
    body = {}
  }: APIErrorOptions) {
    const { message: bodyMessage, error } = body;
    super(message || bodyMessage || error);

    this.status = status;
    this.message = message || bodyMessage || error;
    this.id = id || (headers && headers['x-mailgun-request-id']);
  }
}
