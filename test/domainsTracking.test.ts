/* eslint-disable camelcase */
import formData from 'form-data';
import nock from 'nock';
import { expect } from 'chai';
import { IDomainTrackingClient } from '../lib/Interfaces';
import Request from '../lib/Classes/common/Request';
import DomainTrackingClient from '../lib/Classes/Domains/domainsTracking';
import { InputFormData, RequestOptions } from '../lib/Types/Common';
import {
  GetDomainTrackingCertificateResponse,
  GenerateDomainTrackingCertificateResponse,
  RegenerateDomainTrackingCertificateResponse,
  DomainTrackingData,
} from '../lib/Types/Domains';

describe('DomainTrackingClient', function () {
  let client: IDomainTrackingClient;
  let api: nock.Scope;
  let trackingDomain: string;

  beforeEach(function () {
    client = new DomainTrackingClient(new Request({ url: 'https://api.mailgun.net' } as RequestOptions, formData as InputFormData));
    api = nock('https://api.mailgun.net');
    trackingDomain = 'email.testing.example.com';
  });

  afterEach(function () {
    api.done();
  });

  describe('get', async () => {
    it('fetches single domain tracking certificate by domain', async () => {
      const data = {
        status: 'expired',
        error: 'x509 certificate has expired',
        certificate: 'sample',
      };

      api.get(`/v2/x509/${trackingDomain}/status`).reply(200, data);

      const response: GetDomainTrackingCertificateResponse = await client.get(trackingDomain);
      expect(response).eql({
        ...data,
        responseStatusCode: 200
      });
    });
  });

  describe('generate', async () => {
    it('generates a domain tracking certificate by domain', async () => {
      const data = {
        message: 'Initiated x509 key pair generation',
        location: `/v2/x509/${trackingDomain}/status`,
      };

      api.post(`/v2/x509/${trackingDomain}`).reply(202, data);

      const response: GenerateDomainTrackingCertificateResponse = await client
        .generate(trackingDomain);
      expect(response).eql({
        ...data,
        status: 202,
      });
    });
  });

  describe('regenerate', async () => {
    it('regenerates a domain tracking certificate by domain', async () => {
      const data = {
        message: 'Initiated x509 key pair generation',
        location: `/v2/x509/${trackingDomain}/status`,
      };

      api.put(`/v2/x509/${trackingDomain}`).reply(202, data);

      const response: RegenerateDomainTrackingCertificateResponse = await client
        .regenerate(trackingDomain);
      expect(response).eql({
        ...data,
        status: 202,
      });
    });
  });

  describe('getTracking', async () => {
    it('fetches all tracking settings', async () => {
      const trackingData = {
        open: { active: true },
        click: { active: true },
        unsubscribe: { active: true, html_footer: 'html', text_footer: 'text' }
      };
      api.get('/v3/domains/domain.com/tracking').reply(200, {
        tracking: trackingData
      });
      const tracking: DomainTrackingData = await client.getTracking('domain.com');
      tracking.should.eql(trackingData);
    });
  });

  describe('updateTracking', () => {
    describe('Open tracking', () => {
      it('updates open tracking settings', async () => {
        const open = { active: true, place_at_the_top: true };
        api.put('/v3/domains/domain.com/tracking/open').reply(200, {
          message: 'Tracking settings have been updated',
          open
        });

        const res = await client.updateTracking('domain.com', 'open', { active: 'yes', place_at_the_top: 'yes' });

        expect(res).to.eql({
          message: 'Tracking settings have been updated',
          open
        });
      });

      describe('converts boolean values to string in open tracking', () => {
        it('converts boolean TRUE values to string in open tracking', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/open').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                open: {
                  active: true,
                  place_at_the_top: true,
                }
              };
            });
          await client.updateTracking('domain.com', 'open', { active: true, place_at_the_top: true });
          expect(requestObject).to.have.string('name="active"\r\n\r\nyes\r\n----------------------------');
          expect(requestObject).to.have.string('name="place_at_the_top"\r\n\r\nyes\r\n----------------------------');
        });

        it('converts boolean FALSE values to string in open tracking', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/open').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                open: {
                  active: false,
                  place_at_the_top: false,
                }
              };
            });
          await client.updateTracking('domain.com', 'open', {
            active: false,
            place_at_the_top: false,
          });
          expect(requestObject).to.have.string('name="active"\r\n\r\nno\r\n----------------------------');
          expect(requestObject).to.have.string('name="place_at_the_top"\r\n\r\nno\r\n----------------------------');
        });
      });
    });

    describe('click tracking', () => {
      it('updates click tracking settings', async () => {
        const click = { active: true };
        api.put('/v3/domains/domain.com/tracking/click').reply(200, {
          message: 'Tracking settings have been updated',
          click
        });

        const res = await client.updateTracking('domain.com', 'click', { active: 'yes' });

        expect(res).to.eql({
          message: 'Tracking settings have been updated',
          click
        });
      });

      describe('converts boolean values to string in click tracking ', () => {
        it('converts boolean TRUE values to string in click tracking', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/click').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                click: { active: true }
              };
            });
          await client.updateTracking('domain.com', 'click', { active: true });
          expect(requestObject).to.have.string('name="active"\r\n\r\nyes\r\n----------------------------');
        });

        it('converts boolean FALSE values to string in click tracking ', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/click').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                click: { active: false }
              };
            });
          await client.updateTracking('domain.com', 'click', { active: false });
          expect(requestObject).to.have.string('name="active"\r\n\r\nno\r\n----------------------------');
        });
      });
    });

    describe('unsubscribe tracking', () => {
      it('updates unsubscribe tracking settings', async () => {
        const unsubscribe = {
          active: true,
          html_footer: 'html_footer_value',
          text_footer: 'text_footer_value'
        };
        api.put('/v3/domains/domain.com/tracking/unsubscribe').reply(200, {
          message: 'Tracking settings have been updated',
          unsubscribe
        });

        const res = await client.updateTracking('domain.com', 'unsubscribe', {
          active: 'yes',
          html_footer: 'html_footer_value',
          text_footer: 'text_footer_value'
        });

        expect(res).to.eql({
          message: 'Tracking settings have been updated',
          unsubscribe
        });
      });

      describe('converts boolean values to string in unsubscribe tracking ', () => {
        it('converts boolean TRUE values to string in unsubscribe tracking', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/unsubscribe').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                unsubscribe: { active: true }
              };
            });
          await client.updateTracking('domain.com', 'unsubscribe', { active: true });
          expect(requestObject).to.have.string('name="active"\r\n\r\nyes\r\n----------------------------');
        });

        it('converts boolean FALSE values to string in unsubscribe tracking ', async () => {
          let requestObject;
          api.put('/v3/domains/domain.com/tracking/unsubscribe').reply(200,
            function (_uri, requestBody) {
              requestObject = requestBody as formData;
              return {
                message: 'message_value',
                unsubscribe: { active: false }
              };
            });
          await client.updateTracking('domain.com', 'unsubscribe', { active: false });
          expect(requestObject).to.have.string('name="active"\r\n\r\nno\r\n----------------------------');
        });
      });
    });
  });
});
