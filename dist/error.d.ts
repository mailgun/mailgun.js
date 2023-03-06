import APIErrorOptions from './interfaces/APIErrorOptions';
export default class APIError extends Error {
    status: number | string;
    stack: string;
    details: string;
    type: string;
    constructor({ status, statusText, message, body }: APIErrorOptions);
}
