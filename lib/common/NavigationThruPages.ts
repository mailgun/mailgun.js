import {
  PagesList,
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  ResponseWithPaging
} from '../interfaces/NavigationThruPages';

export default abstract class NavigationThruPages <T> {
  protected parsePage(id: string, pageUrl: string, urlSeparator = '?'): ParsedPage {
    const parsedUrl = new URL(pageUrl);
    const { searchParams } = parsedUrl;
    const pageValue = pageUrl && typeof pageUrl === 'string' ? pageUrl.split(urlSeparator).pop() || '' : '';
    return {
      id,
      page: urlSeparator === '?' ? `?${pageValue}` : pageValue,
      address: searchParams.has('address') ? searchParams.get('address') : undefined,
      url: pageUrl
    } as ParsedPage;
  }

  protected parsePageLinks(response: ResponseWithPaging, urlSeparator?: string): ParsedPagesList {
    const pages = Object.entries(response.body.paging as PagesList);
    return pages.reduce(
      (acc: PagesListAccumulator, pair: [pageUrl: string, id: string]) => {
        const id = pair[0];
        const pageUrl = pair[1];
        acc[id] = this.parsePage(id, pageUrl, urlSeparator);
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  protected abstract parseList(response: ResponseWithPaging): T;
}
