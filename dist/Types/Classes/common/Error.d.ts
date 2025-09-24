import { APIErrorOptions, APIErrorType } from '../../Types/Common/index.js';
export default class APIError extends Error implements APIErrorType {
    status: number;
    stack: string;
    details: string;
    type: string;
    static isApiError(err: unknown): err is APIError;
    static getUserDataError(statusText: string, message: string): APIError;
    constructor({ status, statusText, message, body }: APIErrorOptions);
}
