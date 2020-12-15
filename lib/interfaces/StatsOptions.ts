export default interface StatsOptions {
  start: string | Date;
  end: string | Date;
  resolution: string;
  stats: {
    time: string | Date,
    delivered: {
      smtp: number,
      http: number,
      total: number
    }
  }[];
}