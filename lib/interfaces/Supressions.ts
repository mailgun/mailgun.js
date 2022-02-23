/* eslint-disable camelcase */
export interface BounceData {
  address: string;
  code: number;
  error: string;
  created_at: string | Date;
}

export interface ComplaintData {
  address: string;
  created_at: string | Date;
}

export interface UnsubscribeData {
  address: string;
  tags: any;
  created_at: string | Date;
}

export interface WhiteListData {
  type: string;
  value: string;
  reason: string;
  createdAt: string | Date;
}

export interface IBounce {
  type: string;
  address: string;
  code: number;
  error: string;
  created_at: Date;
}
export interface IComplaint {
  type: string;
  address: any;
  created_at: Date;
}
export interface IUnsubscribe {
  type: string;
  address: string;
  tags: any;
  created_at: Date;
}
export interface IWhiteList {
  type: string;
  value: string;
  reason: string;
  createdAt: Date;
}

export interface ParsedPage {
  id: string;
  page: string | undefined;
  address: string | undefined;
  url: string
}
export interface ParsedPagesList {
  previous: ParsedPage;
  first: ParsedPage;
  last: ParsedPage;
  next: ParsedPage;
}

export interface SuppressionList {
  items: IBounce[] | IComplaint[] | IUnsubscribe[] | IWhiteList[];
  pages: ParsedPagesList;
}

export interface PagesList {
  previous: string;
  first: string;
  last: string;
  next: string;
}

export enum SuppressionModels {
  BOUNCES = 'bounces',
  COMPLAINTS = 'complaints',
  UNSUBSCRIBES = 'unsubscribes',
  WHITELISTS = 'whitelists'
}

export interface PagesListAccumulator {
  [index: string]: ParsedPage;
}
