import { SuppressionList, SuppressionCreationData, SuppressionCreationResult, SuppressionListQuery, SuppressionDestroyResult } from '../../Types/Suppressions';
import { IBounce } from './Bounce';
import { IComplaint } from './Complaint';
import { IUnsubscribe } from './Unsubscribe';
import { IWhiteList } from './WhiteList';
export interface ISuppressionClient {
    list(domain: string, type: string, query?: SuppressionListQuery): Promise<SuppressionList>;
    get(domain: string, type: string, address: string): Promise<IBounce | IComplaint | IUnsubscribe | IWhiteList>;
    create(domain: string, type: string, data: SuppressionCreationData | SuppressionCreationData[]): Promise<SuppressionCreationResult>;
    destroy(domain: string, type: string, address: string): Promise<SuppressionDestroyResult>;
}
