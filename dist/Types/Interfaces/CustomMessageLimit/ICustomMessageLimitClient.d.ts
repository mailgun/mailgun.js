import { SendingLimitResult, SuccessResult } from '../../Types/index.js';
export interface ICustomMessageLimitClient {
    get(): Promise<SendingLimitResult>;
    set(limit: number): Promise<SuccessResult>;
    destroy(): Promise<SuccessResult>;
    enable(): Promise<SuccessResult>;
}
