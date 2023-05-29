import { APIErrorOptions, APIErrorType } from '../../Types/Common';

export default class APIError extends Error implements APIErrorType {
  public status: number ;
  public stack: string;
  public details: string;
  public type: string;

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
      bodyMessage = body?.message || '';
      error = body?.error || '';
    }
    super();

    this.stack = '';
    this.status = status;
    this.message = message || error || statusText || '';
    this.details = bodyMessage;
    this.type = 'MailgunAPIError';
  }
}
