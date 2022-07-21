import urljoin from 'url-join';
import {
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  QueryWithPage,
  ResponseWithPaging,
  UpdatedUrlAndQuery
} from '../interfaces/NavigationThruPages';
import { BounceData, IBounce } from '../interfaces/Suppressions/Bounce';
import { ComplaintData, IComplaint } from '../interfaces/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from '../interfaces/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from '../interfaces/Suppressions/WhiteList';

export default abstract class NavigationThruPages <T> {
  protected parsePage(
    id: string,
    pageUrl: string,
    urlSeparator: string,
    iteratorName: string | undefined
  ) : ParsedPage {
    const parsedUrl = new URL(pageUrl);
    const { searchParams } = parsedUrl;

    const pageValue = pageUrl && typeof pageUrl === 'string' ? pageUrl.split(urlSeparator).pop() || '' : '';
    let iteratorPosition = null;
    if (iteratorName) {
      iteratorPosition = searchParams.has(iteratorName)
        ? searchParams.get(iteratorName)
        : undefined;
    }
    return {
      id,
      page: urlSeparator === '?' ? `?${pageValue}` : pageValue,
      iteratorPosition,
      url: pageUrl
    } as ParsedPage;
  }

  protected parsePageLinks(
    response: ResponseWithPaging,
    urlSeparator: string,
    iteratorName?: string
  ): ParsedPagesList {
    const pages = Object.entries(response.body.paging);
    return pages.reduce(
      (acc: PagesListAccumulator, pair: [pageUrl: string, id: string]) => {
        const id = pair[0];
        const pageUrl = pair[1];
        acc[id] = this.parsePage(id, pageUrl, urlSeparator, iteratorName);
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  protected updateUrlAndQuery(clientUrl: string, query?: QueryWithPage): UpdatedUrlAndQuery {
    let url = clientUrl;
    const queryCopy = { ...query };
    if (queryCopy && queryCopy.page) {
      url = urljoin(clientUrl, queryCopy.page);
      delete queryCopy.page;
    }
    return {
      url,
      updatedQuery: queryCopy
    };
  }

  protected abstract parseList(response: ResponseWithPaging, Model?: {
    new(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData):
    IBounce | IComplaint | IUnsubscribe | IWhiteList
  }): T;
}
