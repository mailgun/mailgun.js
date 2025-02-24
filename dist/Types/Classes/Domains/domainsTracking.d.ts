import { IDomainTrackingClient } from '../../Interfaces/index.js';
import { ClickTrackingInfo, DomainTrackingData, GenerateDomainTrackingCertificateResponse, GetDomainTrackingCertificateResponse, OpenTrackingInfo, RegenerateDomainTrackingCertificateResponse, UnsubscribeTrackingInfo, UpdatedOpenTracking } from '../../Types/index.js';
import Request from '../common/Request.js';
export default class DomainTrackingClient implements IDomainTrackingClient {
    request: Request;
    constructor(request: Request);
    private _parseTrackingSettings;
    private _parseTrackingUpdate;
    private _isOpenTrackingInfoWitPlace;
    get(domain: string): Promise<GetDomainTrackingCertificateResponse>;
    generate(domain: string): Promise<GenerateDomainTrackingCertificateResponse>;
    regenerate(domain: string): Promise<RegenerateDomainTrackingCertificateResponse>;
    getTracking(domain: string): Promise<DomainTrackingData>;
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
}
