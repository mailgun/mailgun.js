import {
  MessageResponse, TagLimitsResult, TagsListQuery, TagsListResult
} from '../../Types/index.js';

export interface ITagsClient {
    list(query: TagsListQuery): Promise<TagsListResult>
    limits(): Promise<TagLimitsResult>
    update(tag: string, description: string): Promise<MessageResponse>
    destroy(
        tag: string
    ): Promise<MessageResponse>
}
