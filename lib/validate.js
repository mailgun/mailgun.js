'use strict';

class ValidateClient {
  constructor(request) {
    this.request = request;
  }

  get(address) {
    return this.request.get('/v3/address/validate', {address: address})
      .then(response => response.body);
  }
}

module.exports = ValidateClient;
