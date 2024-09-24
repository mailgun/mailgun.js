/* eslint-disable camelcase */
import formData from 'form-data';
import nock from 'nock';
import { expect } from 'chai';
import { ISecureTrackingClient } from '../lib/Interfaces';
import Request from '../lib/Classes/common/Request';
import SecureTrackingClient from '../lib/Classes/SecureTracking';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import {
  GetSecureTrackingCertificateResponse,
  GenerateSecureTrackingCertificateResponse,
  RegenerateSecureTrackingCertificateResponse,
} from '../lib/Types/SecureTracking';

describe('SecureTrackingClient', function () {
  let client: ISecureTrackingClient;
  let api: nock.Scope;
  let trackingDomain: string;

  beforeEach(function () {
    client = new SecureTrackingClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
    trackingDomain = 'email.testing.example.com';
  });

  afterEach(function () {
    api.done();
  });

  describe('get', async () => {
    it('fetches single secure tracking certificate by domain', async () => {
      const data = {
        status: 'expired',
        error: 'x509 certificate has expired',
        certificate: 'sample',
      };

      api.get(`/v2/x509/${trackingDomain}/status`).reply(200, data);

      const response: GetSecureTrackingCertificateResponse = await client.get(trackingDomain);
      expect(response).eql(data);
    });
  });

  describe('generate', async () => {
    it('generates a secure tracking certificate by domain', async () => {
      const data = {
        message: 'Initiated x509 key pair generation',
        location: `/v2/x509/${trackingDomain}/status`,
      };

      api.post(`/v2/x509/${trackingDomain}`).reply(202, data);

      const response: GenerateSecureTrackingCertificateResponse = await client
        .generate(trackingDomain);
      expect(response).eql(data);
    });
  });

  describe('regenerate', async () => {
    it('regenerates a secure tracking certificate by domain', async () => {
      const data = {
        message: 'Initiated x509 key pair generation',
        location: `/v2/x509/${trackingDomain}/status`,
      };

      api.put(`/v2/x509/${trackingDomain}`).reply(202, data);

      const response: RegenerateSecureTrackingCertificateResponse = await client
        .regenerate(trackingDomain);
      expect(response).eql(data);
    });
  });
});
