export enum Resolution {
    HOUR = 'hour',
    DAY = 'day',
    MONTH = 'month'
}

export enum SuppressionModels {
    BOUNCES = 'bounces',
    COMPLAINTS = 'complaints',
    UNSUBSCRIBES = 'unsubscribes',
    WHITELISTS = 'whitelists'
}

export enum WebhooksIds {
    CLICKED = 'clicked',
    OPENED = 'opened',
    UNSUBSCRIBED = 'unsubscribe',
    DELIVERED = 'delivered',
    PERMANENT_FAIL = 'permanent_fail',
    TEMPORARY_FAIL = 'temporary_fail',
    COMPLAINED = 'complained',
    ACCEPTED = 'accepted',
}

export enum YesNo {
    YES = 'yes',
    NO = 'no'
}
