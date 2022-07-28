import { ParsedPage, ParsedPagesList, QueryWithPage, ResponseWithPaging } from '../interfaces/NavigationThruPages';
import { BounceData, IBounce } from '../interfaces/Suppressions/Bounce';
import { ComplaintData, IComplaint } from '../interfaces/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from '../interfaces/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from '../interfaces/Suppressions/WhiteList';
import Request from '../request';
export default abstract class NavigationThruPages<T> {
    request?: Request;
    constructor(request?: Request);
    protected parsePage(id: string, pageUrl: string, urlSeparator: string, iteratorName: string | undefined): ParsedPage;
    protected parsePageLinks(response: ResponseWithPaging, urlSeparator: string, iteratorName?: string): ParsedPagesList;
    private updateUrlAndQuery;
    protected requestListWithPages(clientUrl: string, query?: QueryWithPage, Model?: {
        new (data: BounceData | ComplaintData | UnsubscribeData | WhiteListData): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): Promise<T>;
    protected abstract parseList(response: ResponseWithPaging, Model?: {
        new (data: BounceData | ComplaintData | UnsubscribeData | WhiteListData): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): T;
}
