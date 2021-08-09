/* eslint-disable camelcase */

export interface DomainTrackingData {
    click: { active: boolean };
    open: { active: boolean };
    unsubscribe: {
        active: boolean;
        html_footer: string;
        text_footer: string;
    }
}

export interface DomainTrackingResponse {
    status: number;
    body: {
        tracking: DomainTrackingData
    };
}

export interface UpdatedOpenTracking {
    message: 'Domain tracking settings have been updated';
    open?: { active: boolean };
    click?: { active: boolean | 'htmlonly'};
    unsubscribe?: {
        active: boolean,
        html_footer: string;
        text_footer: string;
    };
}

export interface UpdateDomainTrackingResponse {
    status: number;
    body: UpdatedOpenTracking;
}

export interface OpenTrackingInfo {
    active: 'yes' | 'no';
}
export interface ClickTrackingInfo {
    active: 'yes' | 'no' | 'htmlonly';
}

export interface UnsubscribeTrackingInfo {
    active: boolean;
    html_footer: string;
    text_footer: string;
}
