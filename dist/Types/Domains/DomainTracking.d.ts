export type DomainTrackingData = {
    click: {
        active: boolean;
    };
    open: {
        active: boolean;
    };
    unsubscribe: {
        active: boolean;
        html_footer: string;
        text_footer: string;
    };
};
export type DomainTrackingResponse = {
    status: number;
    body: {
        tracking: DomainTrackingData;
    };
};
export type UpdatedOpenTracking = {
    message: string;
    open?: {
        active: boolean;
    };
    click?: {
        active: boolean | 'htmlonly';
    };
    unsubscribe?: {
        active: boolean;
        html_footer: string;
        text_footer: string;
    };
};
export type UpdateDomainTrackingResponse = {
    status: number;
    body: UpdatedOpenTracking;
};
export type OpenTrackingInfo = {
    place_at_the_top?: 'yes' | 'no' | 'true' | 'false' | boolean;
    active: 'yes' | 'no' | 'true' | 'false' | boolean;
};
export type ClickTrackingInfo = {
    active?: 'yes' | 'no' | 'true' | 'false' | 'htmlonly' | boolean;
};
export type UnsubscribeTrackingInfo = {
    active?: 'yes' | 'no' | 'true' | 'false' | boolean;
    html_footer?: string;
    text_footer?: string;
};
export type GetDomainTrackingCertificateResponse = {
    responseStatusCode: number;
    status: string;
    error: string;
    certificate: string;
};
export type GenerateDomainTrackingCertificateResponse = {
    message: string;
    location: string;
    status: number;
};
export type RegenerateDomainTrackingCertificateResponse = {
    message: string;
    location: string;
    status: number;
};
