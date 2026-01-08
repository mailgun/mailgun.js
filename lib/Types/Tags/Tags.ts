import { Metrics } from '../Metrics/index.js';

export type TagsListPagination = {
  sort?: string;
  skip?: number;
  limit?: number;
  total?: number;
  'include_total'?: boolean;
}

export type TagsListQuery = {
  'include_subaccounts'?: boolean;
  'include_metrics'?: boolean;
  tag?: string;
  pagination?: TagsListPagination;
};

export type TagMetrics = Partial<Metrics> & Partial<{
  'temporary_failed_esp_block_count': number;
  'permanent_failed_esp_block_count': number;
  'hard_bounce_rate': string;
  'soft_bounce_rate': string;
  'email_validation_count': number;
  'email_validation_public_count': number;
  'email_validation_valid_count': number;
  'email_validation_single_count': number;
  'email_validation_bulk_count': number;
  'email_validation_list_count': number;
  'email_validation_mailgun_count': number;
  'email_validation_mailjet_count': number;
  'email_preview_count': number;
  'email_preview_failed_count': number;
  'link_validation_count': number;
  'link_validation_failed_count': number;
  'seed_test_count': number;
  'accessibility_count': number;
  'accessibility_failed_count': number;
  'image_validation_count': number;
  'image_validation_failed_count': number;
}>;

export type TagItem = {
  'account_id': string;
  'parent_account_id': string;
  tag: string;
  description: string;
  'first_seen': Date;
  'last_seen': Date;
  metrics: TagMetrics;
  'account_name': string;
}

export type TagItemAPI = Omit<TagItem, 'first_seen' | 'last_seen'> & {
  'first_seen': string;
  'last_seen': string;
}

export type PaginationInResponse = Omit<TagsListPagination, 'sort' | 'limit'> & {
  sort: string;
  limit: number;
};
export type TagsListResult = {
  pagination: PaginationInResponse;
  items: TagItem[];
};

export type TagsListResponse = {
  pagination: PaginationInResponse;
  items: TagItemAPI[];
};

export type TagLimitsResult = {
  limit: number;
  count: number;
  'limit_reached': boolean;
}

export type TagsUpdateData = {
  tag: string;
  description: string;
};

export type TagDeleteData = Omit<TagsUpdateData, 'description'>
