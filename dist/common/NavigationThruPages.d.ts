import { ParsedPage, ParsedPagesList, ResponseWithPaging } from '../interfaces/NavigationThruPages';
export default abstract class NavigationThruPages<T> {
    protected parsePage(id: string, pageUrl: string, urlSeparator?: string): ParsedPage;
    protected parsePageLinks(response: ResponseWithPaging, urlSeparator?: string): ParsedPagesList;
    protected abstract parseList(response: ResponseWithPaging): T;
}
