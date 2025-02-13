export type Stat = {
    time: string | Date;
    delivered: {
        smtp: number;
        http: number;
        total: number;
    };
};
export type StatsOptions = {
    start: string | Date;
    end: string | Date;
    resolution: string;
    stats: Stat[];
};
export type StatsEvent = 'accepted' | 'delivered' | 'opened' | 'clicked' | 'unsubscribed' | 'stored' | 'complained' | 'failed';
export type StatsQuery = {
    event: StatsEvent | StatsEvent[];
    start?: string | Date;
    end?: string | Date;
    resolution?: 'hour' | 'day' | 'month';
    duration?: string;
};
