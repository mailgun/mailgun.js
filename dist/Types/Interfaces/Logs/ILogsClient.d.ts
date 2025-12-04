import { LogsList, LogsQuery } from '../../Types/Logs/index.js';
export interface ILogsClient {
    list(query: LogsQuery): Promise<LogsList>;
}
