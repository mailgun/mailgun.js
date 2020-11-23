class APIError extends Error {
  constructor({
    id,
    headers,
    status,
    message,
    body = {}
  }) {
    const { message: bodyMessage, error } = body;
    super(message || bodyMessage || error);

    this.status = status;
    this.message = message || bodyMessage || error;
    this.id = id || (headers && headers['x-mailgun-request-id']);
  }
}

module.exports = APIError;
