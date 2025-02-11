import { APIErrorOptions, APIErrorType } from '../../Types/Common';
export default class APIError extends Error implements APIErrorType {
    status: number;
    stack: string;
    details: string;
    type: string;
    static getUserDataError(statusText: string, message: string): APIError;
    constructor({ status, statusText, message, body }: APIErrorOptions);
}
