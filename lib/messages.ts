import Request from "./request";

export default class MessagesClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  _parseResponse(response: { body: any }) {
    if (response.body) {
      return response.body;
    }

    return response;
  }

  create(domain: string, data: any) {
    if (data.message) {
      return this.request.postWithFD(`/v3/${domain}/messages.mime`, data)
        .then(this._parseResponse);
    }

    return this.request.postWithFD(`/v3/${domain}/messages`, data)
      .then(this._parseResponse);
  }
}
