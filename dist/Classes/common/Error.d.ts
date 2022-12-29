import { APIErrorOptions } from '../../Types/Common/APIErrorOptions';
export default class APIError extends Error {
    status: number | string;
    stack: string;
    details: string;
    constructor({ status, statusText, message, body }: APIErrorOptions);
}
