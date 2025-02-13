import type { ClickTrackingInfo, DomainTrackingData, GenerateDomainTrackingCertificateResponse, GetDomainTrackingCertificateResponse, OpenTrackingInfo, RegenerateDomainTrackingCertificateResponse, UnsubscribeTrackingInfo, UpdatedOpenTracking } from '../../Types/index.js';
export interface IDomainTrackingClient {
    get(domain: string): Promise<GetDomainTrackingCertificateResponse>;
    generate(domain: string): Promise<GenerateDomainTrackingCertificateResponse>;
    regenerate(domain: string): Promise<RegenerateDomainTrackingCertificateResponse>;
    getTracking(domain: string): Promise<DomainTrackingData>;
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
}
