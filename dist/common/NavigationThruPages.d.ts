import { ParsedPage, ParsedPagesList, QueryWithPage, ResponseWithPaging, UpdatedUrlAndQuery } from '../interfaces/NavigationThruPages';
import { BounceData, IBounce } from '../interfaces/Suppressions/Bounce';
import { ComplaintData, IComplaint } from '../interfaces/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from '../interfaces/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from '../interfaces/Suppressions/WhiteList';
export default abstract class NavigationThruPages<T> {
    protected parsePage(id: string, pageUrl: string, urlSeparator: string, iteratorName: string | undefined): ParsedPage;
    protected parsePageLinks(response: ResponseWithPaging, urlSeparator: string, iteratorName?: string): ParsedPagesList;
    protected updateUrlAndQuery(clientUrl: string, query?: QueryWithPage): UpdatedUrlAndQuery;
    protected abstract parseList(response: ResponseWithPaging, Model?: {
        new (data: BounceData | ComplaintData | UnsubscribeData | WhiteListData): IBounce | IComplaint | IUnsubscribe | IWhiteList;
    }): T;
}
