import { UserListResult, UserResult, UsersListQuery } from '../../Types/index.js';
import Request from '../common/Request.js';
import { IUsersClient } from '../../Interfaces/index.js';
export default class UsersClient implements IUsersClient {
    private baseRoute;
    request: Request;
    constructor(request: Request);
    private formatResponse;
    list(data?: UsersListQuery): Promise<UserListResult>;
    get(id: string): Promise<UserResult>;
    me(): Promise<UserResult>;
}
