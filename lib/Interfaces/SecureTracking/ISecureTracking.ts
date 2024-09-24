import {
  GenerateSecureTrackingCertificateResponse,
  GetSecureTrackingCertificateResponse,
  RegenerateSecureTrackingCertificateResponse,
} from '../../Types';

export interface ISecureTrackingClient {
  get(domain: string): Promise<GetSecureTrackingCertificateResponse>
  generate(domain: string): Promise<GenerateSecureTrackingCertificateResponse>
  regenerate(domain: string): Promise<RegenerateSecureTrackingCertificateResponse>
}
