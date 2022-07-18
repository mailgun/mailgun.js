import {
  PagesList,
  PagesListAccumulator,
  ParsedPage,
  ParsedPagesList,
  ResponseWithPaging
} from '../interfaces/NavigationThruPages';

export default abstract class NavigationThruPages <T> {
  protected parsePage(id: string, pageUrl: string, urlSeparator = '?', iteratorName: string|undefined): ParsedPage {
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
    urlSeparator?: string,
    iteratorName?: string
  ): ParsedPagesList {
    const pages = Object.entries(response.body.paging as PagesList);
    return pages.reduce(
      (acc: PagesListAccumulator, pair: [pageUrl: string, id: string]) => {
        const id = pair[0];
        const pageUrl = pair[1];
        acc[id] = this.parsePage(id, pageUrl, urlSeparator, iteratorName);
        return acc;
      }, {}
    ) as unknown as ParsedPagesList;
  }

  protected abstract parseList(response: ResponseWithPaging): T;
}
