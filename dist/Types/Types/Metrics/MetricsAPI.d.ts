import { Metrics, MetricsPagination, MetricsQuery, MetricsResponseItem } from './Metrics.js';
export type MetricsAPIQuery = Omit<MetricsQuery, 'start' | 'end'> & {
    start?: string;
    end?: string;
};
export type MetricsAPIResponse = {
    status: number;
    body: {
        items: MetricsResponseItem[];
        resolution: string;
        start: string;
        aggregates: {
            metrics: Metrics;
        };
        dimensions: string[];
        pagination: MetricsPagination;
        end: string;
        duration?: string;
    };
};
