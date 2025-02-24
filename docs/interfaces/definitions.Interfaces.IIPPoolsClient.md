[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IIPPoolsClient

# Interface: IIPPoolsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IIPPoolsClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IIPPoolsClient.md#create)
- [delete](definitions.Interfaces.IIPPoolsClient.md#delete)
- [list](definitions.Interfaces.IIPPoolsClient.md#list)
- [update](definitions.Interfaces.IIPPoolsClient.md#update)

## Methods

### create

▸ **create**(`data`): `Promise`\<[`IpPoolCreateResult`](../modules/definitions.md#ippoolcreateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IpPoolCreateData`](../modules/definitions.md#ippoolcreatedata) |

#### Returns

`Promise`\<[`IpPoolCreateResult`](../modules/definitions.md#ippoolcreateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/d73f136/lib/Interfaces/IPPools/IIPPoolsClient.ts#L9)

___

### delete

▸ **delete**(`poolId`, `data`): `Promise`\<[`IpPoolMessageResult`](../modules/definitions.md#ippoolmessageresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolDeleteData`](../modules/definitions.md#ippooldeletedata) |

#### Returns

`Promise`\<[`IpPoolMessageResult`](../modules/definitions.md#ippoolmessageresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/d73f136/lib/Interfaces/IPPools/IIPPoolsClient.ts#L11)

___

### list

▸ **list**(): `Promise`\<[`IpPoolListResult`](../modules/definitions.md#ippoollistresult)\>

#### Returns

`Promise`\<[`IpPoolListResult`](../modules/definitions.md#ippoollistresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/d73f136/lib/Interfaces/IPPools/IIPPoolsClient.ts#L8)

___

### update

▸ **update**(`poolId`, `data`): `Promise`\<[`IpPoolMessageResult`](../modules/definitions.md#ippoolmessageresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolUpdateData`](../modules/definitions.md#ippoolupdatedata) |

#### Returns

`Promise`\<[`IpPoolMessageResult`](../modules/definitions.md#ippoolmessageresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/d73f136/lib/Interfaces/IPPools/IIPPoolsClient.ts#L10)
