import { IAPIKeysClient } from '../../Interfaces/index.js';
import {
  APIKeyCreateResult,
  APIKeyData,
  APIKeyResponseData,
  APIKeyResultData,
  APIKeysQuery,
  APIKeysResponse,
  APIKeysResult,
  MessageResponseWithStatus,
  RegeneratePublicKeyResult
} from '../../Types/index.js';
import APIError from '../common/Error.js';
import Request from '../common/Request.js';

export default class APIKeysClient implements IAPIKeysClient {
  request: Request;
  private path: string;

  constructor(request: Request) {
    this.request = request;
    this.path = '/v1/keys';
  }

  private parseItem(item: APIKeyResponseData): APIKeyResultData {
    const data = item || {};
    return {
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
      expires_at: data.expires_at ? new Date(data.expires_at) : null
    };
  }

  private prepareList(data:APIKeysResponse): Omit<APIKeysResult, 'status'> {
    const items = data.items.map((item) => this.parseItem(item));
    return {
      totalCount: data.total_count,
      items
    };
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/keys/get-v1-keys
  async list(data: APIKeysQuery): Promise<APIKeysResult> {
    const query = data || {};
    const response = await this.request.get(`${this.path}`, query);
    return {
      status: response.status,
      ...this.prepareList(response.body)
    };
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/keys/post-v1-keys
  async create(data: APIKeyData): Promise<APIKeyCreateResult> {
    const response = await this.request.postWithFD(`${this.path}`, data);
    return {
      status: response.status,
      message: response.body?.message,
      key: this.parseItem(response.body?.key)
    };
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/keys/delete-v1-keys--key-id-
  async destroy(keyId: string): Promise<MessageResponseWithStatus> {
    if (!keyId) {
      throw APIError.getUserDataError('Missing keyId', 'The keyId parameter is required to delete an API key.');
    }
    const response = await this.request.delete(`${this.path}/${keyId}`);
    return {
      status: response.status,
      message: response.body.message
    };
  }

  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/keys/post-v1-keys-public
  async regeneratePublicKey(): Promise<RegeneratePublicKeyResult> {
    const response = await this.request.post(`${this.path}/public`);
    return {
      status: response.status,
      message: response.body.message,
      key: response.body.key
    };
  }
}
