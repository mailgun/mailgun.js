import {
  UserListResult,
  UserResponse,
  UserResult,
  UsersListQuery
} from '../../Types/index.js';
import Request from '../common/Request.js';

import { IUsersClient } from '../../Interfaces/index.js';

export default class UsersClient implements IUsersClient {
  private baseRoute: string;
  request: Request;

  constructor(request: Request) {
    this.request = request;
    this.baseRoute = '/v5';
  }

  private formatResponse(user: UserResponse): UserResult {
    return {
      ...user,
      tfa_created_at: user.tfa_created_at ? new Date(user.tfa_created_at) : null,
      password_updated_at: user.password_updated_at ? new Date(user.password_updated_at) : null
    };
  }

  async list(data?: UsersListQuery): Promise<UserListResult> {
    const res = await this.request.get(`/${this.baseRoute}/users`, data);
    const users = res.body.users.map((user: UserResponse) => this.formatResponse(user));
    return {
      status: res.status,
      users,
      total: res.body.total
    };
  }

  async get(id: string): Promise<UserResult> {
    const res = await this.request.get(`/${this.baseRoute}/users/${id}`);
    return this.formatResponse(res.body);
  }

  async me(): Promise<UserResult> {
    const res = await this.request.get(`/${this.baseRoute}/users/me`);
    return this.formatResponse(res.body);
  }
}
