import urljoin from 'url-join';
import APIError from '../error';
import { APIErrorOptions } from '../types/APIErrorOptions';
import {
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  QueryWithPage,
  ResponseWithPaging,
  UpdatedUrlAndQuery
} from '../types/NavigationThruPages';
import { BounceData, IBounce } from '../types/Suppressions/Bounce';
import { ComplaintData, IComplaint } from '../types/Suppressions/Complaint';
import { IUnsubscribe, UnsubscribeData } from '../types/Suppressions/Unsubscribe';
import { IWhiteList, WhiteListData } from '../types/Suppressions/WhiteList';
import Request from '../request';

export default abstract class NavigationThruPages <T> {
  request?: Request;
  constructor(request?: Request) {
    if (request) {
      this.request = request;
    }
  }

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
      (acc: PagesListAccumulator, [id, pageUrl]: [ id: string, pageUrl: string]) => {
        acc[id] = this.parsePage(id, pageUrl, urlSeparator, iteratorName);
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  private updateUrlAndQuery(clientUrl: string, query?: QueryWithPage): UpdatedUrlAndQuery {
    let url = clientUrl;
    const queryCopy = { ...query };
    if (queryCopy.page) {
      url = urljoin(clientUrl, queryCopy.page);
      delete queryCopy.page;
    }
    return {
      url,
      updatedQuery: queryCopy
    };
  }

  protected async requestListWithPages(clientUrl:string, query?: QueryWithPage, Model?: {
    new(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData):
    IBounce | IComplaint | IUnsubscribe | IWhiteList
  }): Promise<T> {
    const { url, updatedQuery } = this.updateUrlAndQuery(clientUrl, query);
    if (this.request) {
      const response: ResponseWithPaging = await this.request.get(url, updatedQuery);
      // Model here is usually undefined except for Suppression Client
      return this.parseList(response, Model);
    }
    throw new APIError({
      status: 500,
      statusText: 'Request property is empty',
      body: { message: '' }
    } as APIErrorOptions);
  }

  protected abstract parseList(response: ResponseWithPaging, Model?: {
    new(data: BounceData | ComplaintData | UnsubscribeData | WhiteListData):
    IBounce | IComplaint | IUnsubscribe | IWhiteList
  }): T;
}
