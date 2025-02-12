import { Resolution } from '../../Enums/index.js';
export type MetricsFilterValue = {
    label?: string;
    value: string;
};
export type MetricsFilter = {
    attribute: string;
    comparator: string;
    values: MetricsFilterValue[];
};
export type MetricsQuery = {
    start?: Date | string;
    end?: Date | string;
    resolution?: Resolution;
    duration?: string;
    dimensions?: string[];
    metrics?: string[];
    filter?: {
        AND: MetricsFilter[];
    };
    include_subaccounts?: boolean;
    include_aggregates?: boolean;
};
export type Metrics = {
    accepted_outgoing_count?: number;
    delivered_smtp_count?: number;
    accepted_count?: number;
    delivered_http_count?: number;
    accepted_incoming_count?: number;
    delivered_optimized_count?: number;
    stored_count?: number;
    delivered_count?: number;
    processed_count?: number;
    sent_count?: number;
    opened_count?: number;
    unique_opened_count?: number;
    clicked_count?: number;
    unique_clicked_count?: number;
    complained_count?: number;
    permanent_failed_count?: number;
    failed_count?: number;
    rate_limit_count?: number;
    unsubscribed_count?: number;
    temporary_failed_count?: number;
    permanent_failed_optimized_count?: number;
    bounced_count?: number;
    esp_block_count?: number;
    webhook_count?: number;
    delayed_bounce_count?: number;
    soft_bounces_count?: number;
    permanent_failed_old_count?: number;
    suppressed_bounces_count?: number;
    delivered_subsequent_count?: number;
    delivered_rate?: string;
    delayed_first_attempt_count?: number;
    unsubscribed_rate?: string;
    delivered_first_attempt_count?: number;
    opened_rate?: string;
    suppressed_complaints_count?: number;
    delivered_two_plus_attempts_count?: number;
    hard_bounces_count?: number;
    suppressed_unsubscribed_count?: number;
    unique_opened_rate?: string;
    fail_rate?: string;
    complained_rate?: string;
    clicked_rate?: string;
    unique_clicked_rate?: string;
    bounce_rate?: string;
    delayed_rate?: string;
    permanent_fail_rate?: string;
    temporary_fail_rate?: string;
};
export type MetricsPagination = {
    sort: string;
    skip: number;
    limit: number;
    total: number;
};
export type MetricsDimension = {
    dimension: string;
    value: string;
    display_value: string;
};
export type MetricsResponseItem = {
    dimensions: MetricsDimension[];
    metrics: Metrics;
};
export type MetricsResult = {
    items: MetricsResponseItem[];
    resolution: string;
    start: Date | null;
    aggregates: {
        metrics: Metrics;
    };
    dimensions: string[];
    pagination: MetricsPagination;
    end: Date | null;
    duration?: string;
    status: number;
};
