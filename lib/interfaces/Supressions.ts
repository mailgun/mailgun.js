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
