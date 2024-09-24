export type GetSecureTrackingCertificateResponse = {
  status: string;
  error: string;
  certificate: string;
}

export type GenerateSecureTrackingCertificateResponse = {
  message: string;
  location: string;
}

export type RegenerateSecureTrackingCertificateResponse = {
  message: string;
  location: string;
}
