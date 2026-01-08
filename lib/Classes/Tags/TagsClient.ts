import { MessageResponse } from '../../Types/Common/ApiResponse.js';
import {
  TagItem, TagItemAPI, TagsListQuery, TagsListResponse, TagsUpdateData
} from '../../Types/index.js';
import Request from '../common/Request.js';

import { ITagsClient } from '../../Interfaces/index.js';
import { TagLimitsResult, TagsListResult } from '../../definitions.js';

export default class TagsClient implements ITagsClient {
  baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v1';
  }

  protected parseListResponse(
    responseBody: TagsListResponse,
  ): TagsListResult {
    const items: TagItem[] = responseBody.items.map((tagInfo: TagItemAPI) => ({
      ...tagInfo,
      first_seen: new Date(tagInfo.first_seen),
      last_seen: new Date(tagInfo.last_seen)
    }));
    return {
      ...responseBody,
      items
    };
  }

  async list(data: TagsListQuery): Promise<TagsListResult> {
    const res = await this.request.post(`/${this.baseRoute}/analytics/tags`, data);
    return this.parseListResponse(res.body);
  }

  async limits(): Promise<TagLimitsResult> {
    const res = await this.request.get(`/${this.baseRoute}/analytics/tags/limits`);
    return res.body;
  }

  async update(tag: string, description: string): Promise<MessageResponse> {
    const data: TagsUpdateData = { tag, description };
    const res = await this.request.put(`/${this.baseRoute}/analytics/tags`, data);
    return res.body;
  }

  async destroy(
    tag: string
  ): Promise<MessageResponse> {
    const res = await this.request.delete(`/${this.baseRoute}/analytics/tags`, { tag });
    return res.body;
  }
}
