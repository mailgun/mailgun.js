export type LogsFilterValue = {
    label: string;
    value: string;
};
export type LogsFilter = {
    AND: {
        attribute: string;
        comparator: string;
        values: LogsFilterValue[];
    }[];
};
export type LogsQuery = {
    start?: Date;
    end?: Date;
    events?: string[];
    'metric_events'?: string[];
    'include_subaccounts'?: boolean;
    'include_totals'?: boolean;
    pagination?: {
        sort?: string;
        token?: string;
        limit?: number;
    };
    filter?: LogsFilter;
};
export type LogsParsedQuery = Omit<LogsQuery, 'start' | 'end'> & {
    start?: string;
    end?: string;
};
export type LogsDeliveryStatus = {
    message?: string;
    'attempt-no'?: number;
    'code'?: number;
    'bounce-type'?: string;
    description?: string;
    'session-seconds'?: number;
    'retry-seconds'?: number;
    'enhanced-code'?: string;
    'mx-host'?: string;
    'certificate-verified'?: boolean;
    'tls'?: boolean;
    'utf8'?: boolean;
    'first-delivery-attempt-seconds'?: number;
    'last-code'?: number;
    'last-message'?: string;
};
export type LogsEvent = {
    id: string;
    event: string;
    '@timestamp': string;
    account?: {
        'parent-id': string;
        'id': string;
    };
    campaigns?: {
        id: string;
        name: string;
    }[];
    tags?: string[];
    method?: string;
    'originating-ip'?: string;
    'api-key-id'?: string;
    'delivery-status'?: LogsDeliveryStatus;
    'i-delivery-optimizer'?: string;
    domain: {
        name: string;
    };
    recipient?: string;
    'recipient-domain'?: string;
    'recipient-provider'?: string;
    envelope?: {
        sender?: string;
        transport?: string;
        'sending-ip'?: string;
        targets?: string;
        'i-ip-pool-id'?: string;
    };
    storage?: {
        region?: string;
        env?: string;
        key?: string;
        url?: string[];
    };
    template?: {
        name?: string;
        version?: string;
        'is-text'?: boolean;
    };
    'log-level'?: string;
    'user-variables'?: string;
    'message'?: {
        headers?: {
            to: string;
            'message-id': string;
            from: string;
            subject: string;
        };
        attachments?: {
            filename?: string;
            'content-type'?: string;
            size?: number;
        }[];
        recipients?: string[];
        size?: number;
        'scheduled-for'?: number;
    };
    flags?: {
        'is-authenticated': boolean;
        'is-system-test': boolean;
        'is-routed': boolean;
        'is-amp'?: boolean;
        'is-test-mode': boolean;
        'is-delayed-bounce': boolean;
        'is-callback': boolean;
        'is-encrypted': boolean;
    };
    'primary-dkim'?: string;
    ip?: string;
    geolocation?: {
        city?: string;
        country?: string;
        region?: string;
        timezone?: string;
    };
    'client-info'?: {
        'client-name'?: string;
        'client-os'?: string;
        'client-type'?: string;
        'device-type'?: string;
        'user-agent'?: string;
        ip?: string;
        bot?: string;
    };
    severity?: string;
    reason?: string;
    routes?: {
        actions?: string;
        description?: string;
        expression?: string;
        id?: string;
        priority?: number;
        match?: {
            recipient?: string;
        };
    };
    'mailing-list'?: {
        address?: string;
        'list-id'?: string;
        sid?: string;
    };
    url?: string;
};
export type LogsEventItem = Omit<LogsEvent, '@timestamp'> & {
    '@timestamp': Date;
};
export type LogsList = {
    start: Date;
    end: Date;
    items: LogsEventItem[];
    pagination: {
        previous?: string;
        first?: string;
        last?: string;
        next?: string;
        total?: number;
    };
    aggregates: {
        all: number;
        metrics: object;
    };
    status: number;
};
