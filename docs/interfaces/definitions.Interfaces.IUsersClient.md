[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IUsersClient

# Interface: IUsersClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IUsersClient

## Table of contents

### Methods

- [get](definitions.Interfaces.IUsersClient.md#get)
- [list](definitions.Interfaces.IUsersClient.md#list)
- [me](definitions.Interfaces.IUsersClient.md#me)

## Methods

### get

▸ **get**(`id`): `Promise`\<[`UserResult`](../modules/definitions.md#userresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`UserResult`](../modules/definitions.md#userresult)\>

#### Defined in

[Interfaces/Users/IUsersClient.ts:9](https://github.com/mailgun/mailgun.js/blob/866a81a/lib/Interfaces/Users/IUsersClient.ts#L9)

___

### list

▸ **list**(`data?`): `Promise`\<[`UserListResult`](../modules/definitions.md#userlistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | [`UsersListQuery`](../modules/definitions.md#userslistquery) |

#### Returns

`Promise`\<[`UserListResult`](../modules/definitions.md#userlistresult)\>

#### Defined in

[Interfaces/Users/IUsersClient.ts:8](https://github.com/mailgun/mailgun.js/blob/866a81a/lib/Interfaces/Users/IUsersClient.ts#L8)

___

### me

▸ **me**(): `Promise`\<[`UserResult`](../modules/definitions.md#userresult)\>

#### Returns

`Promise`\<[`UserResult`](../modules/definitions.md#userresult)\>

#### Defined in

[Interfaces/Users/IUsersClient.ts:10](https://github.com/mailgun/mailgun.js/blob/866a81a/lib/Interfaces/Users/IUsersClient.ts#L10)
