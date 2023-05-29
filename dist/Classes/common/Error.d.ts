import { APIErrorOptions, APIErrorType } from '../../Types/Common';
export default class APIError extends Error implements APIErrorType {
    status: number;
    stack: string;
    details: string;
    type: string;
    constructor({ status, statusText, message, body }: APIErrorOptions);
}
