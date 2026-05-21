import { SendingLimitResult, SuccessResult } from '../../Types/index.js';
import { ICustomMessageLimitClient } from '../../Interfaces/index.js';
import Request from '../common/Request.js';
export default class CustomMessageLimitClient implements ICustomMessageLimitClient {
    request: Request;
    private path;
    constructor(request: Request);
    get(): Promise<SendingLimitResult>;
    set(limit: number): Promise<SuccessResult>;
    destroy(): Promise<SuccessResult>;
    enable(): Promise<SuccessResult>;
}
