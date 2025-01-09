import urljoin from 'url-join';
import { IDomainTrackingClient } from '../../Interfaces';
import {
  ClickTrackingInfo,
  DomainTrackingData,
  DomainTrackingResponse,
  GenerateDomainTrackingCertificateResponse,
  GetDomainTrackingCertificateResponse,
  OpenTrackingInfo,
  RegenerateDomainTrackingCertificateResponse,
  UnsubscribeTrackingInfo,
  UpdateDomainTrackingResponse,
  UpdatedOpenTracking,
} from '../../Types';
import Request from '../common/Request';

export default class DomainTrackingClient implements IDomainTrackingClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private _parseTrackingSettings(response: DomainTrackingResponse): DomainTrackingData {
    return response.body.tracking;
  }

  private _parseTrackingUpdate(response: UpdateDomainTrackingResponse): UpdatedOpenTracking {
    return response.body;
  }

  private _isOpenTrackingInfoWitPlace(obj: unknown): obj is OpenTrackingInfo {
    return typeof obj === 'object' && 'place_at_the_top' in (obj as OpenTrackingInfo);
  }

  async get(domain: string): Promise<GetDomainTrackingCertificateResponse> {
    const response = await this.request.get(`/v2/x509/${domain}/status`);

    return {
      ...response.body,
      responseStatusCode: response.status
    };
  }

  async generate(domain: string): Promise<GenerateDomainTrackingCertificateResponse> {
    const response = await this.request.post(`/v2/x509/${domain}`);
    return {
      ...response.body,
      status: response.status
    };
  }

  async regenerate(domain: string): Promise<RegenerateDomainTrackingCertificateResponse> {
    const response = await this.request.put(`/v2/x509/${domain}`);
    return {
      ...response.body,
      status: response.status
    };
  }

  async getTracking(domain: string) : Promise<DomainTrackingData> {
    const response = await this.request.get(urljoin('/v3/domains', domain, 'tracking'));
    return this._parseTrackingSettings(response);
  }

  async updateTracking(
    domain: string,
    type: string,
    data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo
  ): Promise<UpdatedOpenTracking> {
    const preparedData: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo = {
      ...data
    };
    if (typeof data?.active === 'boolean') {
      preparedData.active = (data?.active) ? 'yes' : 'no';
    }

    if (this._isOpenTrackingInfoWitPlace(data)) {
      if (typeof data?.place_at_the_top === 'boolean') {
        (preparedData as OpenTrackingInfo).place_at_the_top = (data?.place_at_the_top) ? 'yes' : 'no';
      }
    }
    const response = await this.request.putWithFD(urljoin('/v3/domains', domain, 'tracking', type), preparedData);
    return this._parseTrackingUpdate(response as UpdateDomainTrackingResponse);
  }
}
