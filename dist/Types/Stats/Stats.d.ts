export declare type Stat = {
    time: string | Date;
    delivered: {
        smtp: number;
        http: number;
        total: number;
    };
};
export declare type StatsOptions = {
    start: string | Date;
    end: string | Date;
    resolution: string;
    stats: Stat[];
};
export declare type StatsEvent = 'accepted' | 'delivered' | 'opened' | 'clicked' | 'unsubscribed' | 'stored' | 'complained' | 'failed';
export declare type StatsQuery = {
    event: StatsEvent | StatsEvent[];
    start?: string | Date;
    end?: string | Date;
    resolution?: 'hour' | 'day' | 'month';
    duration?: string;
};
