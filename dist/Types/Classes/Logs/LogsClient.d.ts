import Request from '../common/Request.js';
import { LogsList, LogsQuery } from '../../Types/Logs/Logs.js';
import { ILogsClient } from '../../Interfaces/Logs/ILogsClient.js';
export default class LogsClient implements ILogsClient {
    request: Request;
    constructor(request: Request);
    private parseListResponse;
    private prepareDate;
    private parseQuery;
    private validateQuery;
    list(queryData: LogsQuery): Promise<LogsList>;
}
