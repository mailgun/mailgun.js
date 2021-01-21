
import Request from './request';

export default class ValidateClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  get(address: string) {
    return this.request.get('/v3/address/validate', { address })
      .then((response) => response.body);
  }
}
