import { PagesList, ParsedPagesList } from './NavigationThruPages';
export interface EventsPage {
    id: string;
    number: string;
    url: string;
}
export interface FilterField {
    event?: string;
    list?: string;
    attachment?: string;
    from?: string;
    'message-id'?: string;
    subject?: string;
    to?: string;
    size?: string;
    recipient?: string;
    recipients?: string;
    tags?: string;
    severity?: string;
}
export interface EventsQuery extends FilterField {
    page?: string;
    begin?: string;
    end?: string;
    ascending?: 'yes' | 'no';
    limit?: number;
}
export interface EventsResponse {
    body: {
        items: [];
        paging: PagesList;
    };
    status: number;
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
export interface EventsList {
    items: DomainEvent[];
    pages: ParsedPagesList;
    status: number;
}
