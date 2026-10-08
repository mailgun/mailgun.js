import { UserListResult, UserResult, UsersListQuery } from '../../Types/index.js';
export interface IUsersClient {
    list(data?: UsersListQuery): Promise<UserListResult>;
    get(id: string): Promise<UserResult>;
    me(): Promise<UserResult>;
}
