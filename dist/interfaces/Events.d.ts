export interface EventsPage {
    id: string;
    number: string;
    url: string;
}
export interface PagesList {
    previous: string;
    first: string;
    last: string;
    next: string;
}
export interface EventsResponse {
    body: {
        items: [];
        paging: PagesList;
    };
}
export interface DomainEvent {
    severity: string;
    tags: string[];
    storage: {
        url: string;
        key: string;
    };
    'delivery-status': {
        tls: boolean;
        'mx-host': string;
        code: number;
        description: string;
        'session-seconds': number;
        utf8: boolean;
        'attempt-no': number;
        message: string;
        'certificate-verified': boolean;
    };
    'recipient-domain': string;
    id: string;
    campaigns: [];
    reason: string;
    'user-variables': {
        [key: string]: any;
    };
    flags: {
        'is-routed': boolean;
        'is-authenticated': boolean;
        'is-system-test': boolean;
        'is-test-mode': boolean;
    };
    'log-level': string;
    template?: any;
    timestamp: number;
    envelope: {
        transport: string;
        sender: string;
        'sending-ip': string;
        targets: string;
    };
    message: {
        headers: {
            to: string;
            'message-id': string;
            from: string;
            subject: string;
        };
        attachments: [];
        size: 308;
    };
    recipient: string;
    event: string;
}
export interface ParsedPage {
    id: string;
    number: string;
    url: string;
}
export interface ParsedPagesList {
    previous: ParsedPage;
    first: ParsedPage;
    last: ParsedPage;
    next: ParsedPage;
}
export interface EventsList {
    items: DomainEvent[];
    pages: ParsedPagesList;
}
export interface PagesListAccumulator {
    [index: string]: EventsPage;
}
