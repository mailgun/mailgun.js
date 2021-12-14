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
export interface StatsQuery {
    event: string | string[];
    start: string | Date;
    end: string | Date;
    resolution: 'hour' | 'day' | 'month';
    duration: string;
}
