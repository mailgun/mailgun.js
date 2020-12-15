import Request from './request';

export default class ParseClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  get(addresses: string[] | string, enableDnsEspChecks: boolean) {
    const query = {} as { addresses: string, syntax_only: boolean };

    if (Array.isArray(addresses)) {
      addresses = addresses.join(',');
    }

    query.addresses = addresses;

    if (enableDnsEspChecks) {
      query.syntax_only = false;
    }

    return this.request.get('/v3/address/parse', query)
      .then((response) => response.body);
  }
}
