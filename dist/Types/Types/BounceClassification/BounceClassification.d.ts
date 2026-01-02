export type BounceClassificationQueryDimensions = 'entity-name' | 'domain.name' | 'envelope.sending-ip' | 'account.name' | 'envelope.i-ip-pool-name' | 'tags' | 'tag' | 'recipient-domain' | 'group-id' | 'criticality' | 'severity' | 'category' | 'timestamp';
export type BounceClassificationQueryMetrics = 'critical_bounce_count' | 'non_critical_bounce_count' | 'critical_delay_count' | 'non_critical_delay_count' | 'delivered_smtp_count' | 'classified_failures_count' | 'critical_bounce_rate' | 'non_critical_bounce_rate' | 'critical_delay_rate' | 'non_critical_delay_rate';
export type BounceClassificationQueryFilterAttribute = 'entity-name' | 'domain.name' | 'envelope.sending-ip' | 'account.name' | 'envelope.i-ip-pool-name' | 'tags' | 'tag' | 'recipient-domain' | 'group-id' | 'criticality' | 'severity' | 'category';
export type BounceClassificationQueryFilter = {
    AND: {
        attribute: BounceClassificationQueryFilterAttribute;
        comparator: string;
        values: {
            label: string;
            value: string;
        }[];
    }[];
};
export type BounceClassificationQueryData = {
    start?: Date;
    end?: Date;
    resolution?: 'hour' | 'day';
    duration?: string;
    dimensions?: BounceClassificationQueryDimensions[];
    metrics?: BounceClassificationQueryMetrics[];
    filter?: BounceClassificationQueryFilter;
    'include_subaccounts'?: boolean;
    'pagination': {
        sort?: string;
        skip?: number;
        limit?: number;
    };
};
export type BounceClassificationAPIQuery = Omit<BounceClassificationQueryData, 'start' | 'end'> & {
    start?: string;
    end?: string;
};
export type BounceClassificationResultItem = {
    'account.id': string | null;
    'account.name': string | null;
    'entity-name': string | null;
    'recipient-provider': string | null;
    'recipient-domain': string | null;
    'domain.name': string | null;
    'envelope.i-ip-pool-id': string | null;
    'envelope.i-ip-pool-name': string | null;
    'envelope.sending-ip': string | null;
    timestamp: string | null;
    tags: string | null;
    tag: string | null;
    criticality: string | null;
    severity: string | null;
    category: string | null;
    'group-id': string | null;
    'sample-text': string | null;
    explanation: string | null;
    metrics: {
        [K in BounceClassificationQueryMetrics]: number;
    };
};
export type BounceClassificationResult = {
    start: Date;
    end: Date;
    resolution: 'hour' | 'day' | 'month';
    duration?: string;
    dimensions?: BounceClassificationQueryDimensions[];
    pagination: {
        sort: string;
        skip: number;
        limit: number;
        total: number;
    };
    items: BounceClassificationResultItem[];
};
export type BounceClassificationAPIResponse = Omit<BounceClassificationResult, 'start' | 'end'> & {
    start: string;
    end: string;
};
