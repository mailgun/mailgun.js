import urljoin from 'url-join';

/* eslint-disable camelcase */

import Request from '../common/Request';

import APIError from '../common/Error';
import NavigationThruPages from '../common/NavigationThruPages';
import Bounce from './Bounce';
import Complaint from './Complaint';
import Unsubscribe from './Unsubscribe';
import WhiteList from './WhiteList';
import Suppression from './Suppression';
import {
  IBounce,
  IComplaint,
  IUnsubscribe,
  IWhiteList
} from '../../Interfaces/Suppressions';
import {
  SuppressionList,
  SuppressionListResponse,
  SuppressionDataType,
  BounceData,
  ComplaintData,
  UnsubscribeData,
  WhiteListData,
  SuppressionCreationData,
  SuppressionCreationResult,
  SuppressionCreationResponse,
  SuppressionListQuery,
  SuppressionResponse,
  SuppressionDestroyResult,
  SuppressionDestroyResponse
} from '../../Types/Suppressions';
import { APIErrorOptions } from '../../Types/Common/APIErrorOptions';

const createOptions = {
  headers: { 'Content-Type': 'application/json' }
};

export default class SuppressionClient extends NavigationThruPages<SuppressionList> {
  request: Request;
  models: Map<string, any>;

  constructor(request: Request) {
    super(request);
    this.request = request;
    this.models = new Map();
    this.models.set('bounces', Bounce);
    this.models.set('complaints', Complaint);
    this.models.set('unsubscribes', Unsubscribe);
    this.models.set('whitelists', WhiteList);
  }

  protected parseList(
    response: SuppressionListResponse,
    Model: {
      new(data: SuppressionDataType):
      IBounce | IComplaint | IUnsubscribe | IWhiteList
    }
  ): SuppressionList {
    const data = {} as SuppressionList;
    data.items = response.body.items.map((item) => new Model(item));

    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;
    return data;
  }

  _parseItem<T extends Suppression>(
    data : SuppressionDataType,
    Model: {
      new(dataType: SuppressionDataType):T
    }
  ): T {
    return new Model(data);
  }

  private createWhiteList(
    domain: string,
    data: SuppressionCreationData | SuppressionCreationData[]
  ): Promise<SuppressionCreationResult> {
    if (Array.isArray(data)) {
      throw new APIError({
        status: 400,
        statusText: 'Data property should be an object',
        body: {
          message: 'Whitelist\'s creation process does not support multiple creations. Data property should be an object'
        }
      } as APIErrorOptions);
    }
    return this.request
      .postWithFD(urljoin('v3', domain, 'whitelists'), data)
      .then(this.prepareResponse);
  }

  private checkType(type: string) {
    if (!this.models.has(type)) {
      throw new APIError({
        status: 400,
        statusText: 'Unknown type value',
        body: { message: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]' }
      } as APIErrorOptions);
    }
  }

  private prepareResponse(response: SuppressionCreationResponse): SuppressionCreationResult {
    return {
      message: response.body.message,
      type: response.body.type || '',
      value: response.body.value || '',
      status: response.status
    };
  }

  async list(
    domain: string,
    type: string,
    query?: SuppressionListQuery
  ): Promise<SuppressionList> {
    this.checkType(type);
    const model = this.models.get(type);
    return this.requestListWithPages(urljoin('v3', domain, type), query, model);
  }

  get(
    domain: string,
    type: string,
    address: string
  ): Promise<Bounce | Complaint | Unsubscribe | WhiteList> {
    this.checkType(type);

    const model = this.models.get(type);
    return this.request
      .get(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: SuppressionResponse) => this._parseItem<typeof model>(response.body, model));
  }

  create(
    domain: string,
    type: string,
    data: SuppressionCreationData | SuppressionCreationData[]
  ): Promise<SuppressionCreationResult> {
    this.checkType(type);
    // supports adding multiple suppressions by default
    let postData;
    if (type === 'whitelists') {
      return this.createWhiteList(domain, data);
    }

    if (!Array.isArray(data)) {
      postData = [data];
    } else {
      postData = [...data];
    }

    return this.request
      .post(urljoin('v3', domain, type), JSON.stringify(postData), createOptions)
      .then(this.prepareResponse);
  }

  destroy(
    domain: string,
    type: string,
    address: string
  ): Promise<SuppressionDestroyResult> {
    this.checkType(type);
    return this.request
      .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
      .then((response: SuppressionDestroyResponse) => ({
        message: response.body.message,
        value: response.body.value || '',
        address: response.body.address || '',
        status: response.status
      }));
  }
}

module.exports = SuppressionClient;
