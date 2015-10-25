'use strict';

class APIError {
  constructor(response) {
    this.status = response.status;
    this.message = response.message || response.body && (response.body.message || response.body.error);
    this.id = response.id || response.headers && (response.headers['x-mailgun-request-id']);
  }
}

module.exports = APIError;
