export interface DomainTrackingData {
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
}
export interface DomainTrackingResponse {
    status: number;
    body: {
        tracking: DomainTrackingData;
    };
}
export interface UpdatedOpenTracking {
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
}
export interface UpdateDomainTrackingResponse {
    status: number;
    body: UpdatedOpenTracking;
}
export type OpenTrackingInfo = {
    active: 'yes' | 'no' | 'true' | 'false';
};
export type ClickTrackingInfo = {
    active: 'yes' | 'no' | 'true' | 'false' | 'htmlonly';
};
export type UnsubscribeTrackingInfo = {
    active: 'yes' | 'no' | 'true' | 'false';
    html_footer: string;
    text_footer: string;
};
