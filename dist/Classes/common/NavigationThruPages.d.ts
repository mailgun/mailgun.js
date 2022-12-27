import { ParsedPage, ParsedPagesList, QueryWithPage, ResponseWithPaging } from '../../interfaces/NavigationThruPages';
import { IBounce } from '../../interfaces/Suppressions/Bounce';
import { IComplaint } from '../../interfaces/Suppressions/Complaint';
import { IUnsubscribe } from '../../interfaces/Suppressions/Unsubscribe';
import { IWhiteList } from '../../interfaces/Suppressions/WhiteList';
import Request from './Request';
import { SuppressionDataType } from '../../Types/Suppressions';
export default abstract class NavigationThruPages<T> {
    request?: Request;
    constructor(request?: Request);
    protected parsePage(id: string, pageUrl: string, urlSeparator: string, iteratorName: string | undefined): ParsedPage;
    protected parsePageLinks(response: ResponseWithPaging, urlSeparator: string, iteratorName?: string): ParsedPagesList;
    private updateUrlAndQuery;
    protected requestListWithPages(clientUrl: string, query?: QueryWithPage, Model?: {
        new (data: SuppressionDataType): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): Promise<T>;
    protected abstract parseList(response: ResponseWithPaging, Model?: {
        new (data: SuppressionDataType): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): T;
}
