import { ISecureTrackingClient } from '../Interfaces';
import {
  GenerateSecureTrackingCertificateResponse,
  GetSecureTrackingCertificateResponse,
  RegenerateSecureTrackingCertificateResponse,
} from '../Types';
import Request from './common/Request';

export default class SecureTrackingClient implements ISecureTrackingClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  get(domain: string): Promise<GetSecureTrackingCertificateResponse> {
    return this.request.get(`/v2/x509/${domain}/status`)
      .then((response) => response.body);
  }

  generate(domain: string): Promise<GenerateSecureTrackingCertificateResponse> {
    return this.request.post(`/v2/x509/${domain}`)
      .then((response) => response.body);
  }

  regenerate(domain: string): Promise<RegenerateSecureTrackingCertificateResponse> {
    return this.request.put(`/v2/x509/${domain}`)
      .then((response) => response.body);
  }
}
