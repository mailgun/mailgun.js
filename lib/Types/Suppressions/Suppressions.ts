import Bounce from '../../Classes/Suppressions/Bounce';
import Complaint from '../../Classes/Suppressions/Complaint';
import Unsubscribe from '../../Classes/Suppressions/Unsubscribe';
import WhiteList from '../../Classes/Suppressions/WhiteList';
import {
  BounceData,
  ComplaintData,
  UnsubscribeData,
  WhiteListData
} from '.';

import { PagesList, ParsedPagesList } from '../../interfaces/NavigationThruPages';

/* eslint-disable camelcase */

export type SuppressionList = {
  items: (Bounce | Complaint | Unsubscribe | WhiteList)[];
  pages: ParsedPagesList;
  status: number;
}

export type SuppressionListQuery = {
  limit?: number;
  page?: string;
}

export type SuppressionDataType = BounceData | ComplaintData | UnsubscribeData | WhiteListData;

export type SuppressionListResponse = {
  body: {
    items: BounceData[] | ComplaintData[] | UnsubscribeData[] | WhiteListData[];
    paging: PagesList;
  }
  status: number;
}

export type SuppressionResponse = {
  body: SuppressionDataType;
  status: number;
}

export type SuppressionDestroyResponse = {
  body: {
    message: string;
    value?: string;
    address?: string;
  }
  status: number;
}

export type SuppressionDestroyResult = {
  message: string;
  value: string;
  address: string;
  status: number;
}

export type SuppressionCreationData = {
  address: string;
  code?: number;
  error?: string;
  domain?: string;
  tag?: string;
  created_at?: string ;
}

export type SuppressionCreationResponse = {
  body:{
    message:string;
    type?: string;
    value?: string;
  }
  status: number;
}

export type SuppressionCreationResult = {
  message:string;
  type: string;
  value: string;
  status: number;
}
