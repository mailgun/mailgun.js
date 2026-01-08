import { MessageResponse } from '../../Types/Common/ApiResponse.js';
import { TagsListQuery, TagsListResponse } from '../../Types/index.js';
import Request from '../common/Request.js';
import { ITagsClient } from '../../Interfaces/index.js';
import { TagLimitsResult, TagsListResult } from '../../definitions.js';
export default class TagsClient implements ITagsClient {
    baseRoute: string;
    request: Request;
    constructor(request: Request);
    protected parseListResponse(responseBody: TagsListResponse): TagsListResult;
    list(data: TagsListQuery): Promise<TagsListResult>;
    limits(): Promise<TagLimitsResult>;
    update(tag: string, description: string): Promise<MessageResponse>;
    destroy(tag: string): Promise<MessageResponse>;
}
