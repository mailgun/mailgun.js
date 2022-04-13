export interface Stat {
    time: string | Date;
    delivered: {
        smtp: number;
        http: number;
        total: number;
    };
}
export interface StatsOptions {
    start: string | Date;
    end: string | Date;
    resolution: string;
    stats: Stat[];
}
export declare type StatsEvent = 'accepted' | 'delivered' | 'opened' | 'clicked' | 'unsubscribed' | 'stored' | 'complained' | 'failed';
export interface StatsQuery {
    event: StatsEvent | StatsEvent[];
    start?: string | Date;
    end?: string | Date;
    resolution?: 'hour' | 'day' | 'month';
    duration?: string;
}
