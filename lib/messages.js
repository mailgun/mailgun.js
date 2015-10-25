'use strict';

class MessagesClient {
  constructor(request) {
    this.request = request;
  }

  _parseResponse(response) {
    if (response.body) {
      return response.body;
    } else {
      return response;
    }
  }

  create(domain, data) {
    if (data.mime) {
      return this.request.postMulti(`/v3/${domain}/messages.mime`, data)
        .then(this._parseResponse);
    } else {
      return this.request.postMulti(`/v3/${domain}/messages`, data)
        .then(this._parseResponse);
    }
  }
}

module.exports = MessagesClient;
