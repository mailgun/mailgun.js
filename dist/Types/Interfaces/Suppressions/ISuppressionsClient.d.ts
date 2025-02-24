import { SuppressionList, SuppressionCreationData, SuppressionCreationResult, SuppressionListQuery, SuppressionDestroyResult } from '../../Types/Suppressions/index.js';
import { IBounce } from './Bounce.js';
import { IComplaint } from './Complaint.js';
import { IUnsubscribe } from './Unsubscribe.js';
import { IWhiteList } from './WhiteList.js';
export interface ISuppressionClient {
    list(domain: string, type: string, query?: SuppressionListQuery): Promise<SuppressionList>;
    get(domain: string, type: string, address: string): Promise<IBounce | IComplaint | IUnsubscribe | IWhiteList>;
    create(domain: string, type: string, data: SuppressionCreationData | SuppressionCreationData[]): Promise<SuppressionCreationResult>;
    destroy(domain: string, type: string, address: string): Promise<SuppressionDestroyResult>;
}
