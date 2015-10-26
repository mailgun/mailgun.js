'use strict';

class ParseClient {
  constructor(request) {
    this.request = request;
  }

  get(addresses, enableDnsEspChecks) {
    var query = {};

    if (Array.isArray(addresses)) {
      addresses = addresses.join(',');
    }

    query.addresses = addresses;

    if (enableDnsEspChecks) {
      query.syntax_only = false;
    }

    return this.request.get('/v3/address/parse', query)
      .then(response => response.body);
  }
}

module.exports = ParseClient;
