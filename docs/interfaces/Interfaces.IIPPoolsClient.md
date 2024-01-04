[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IIPPoolsClient

# Interface: IIPPoolsClient

[Interfaces](../modules/Interfaces.md).IIPPoolsClient

## Table of contents

### Methods

- [create](Interfaces.IIPPoolsClient.md#create)
- [delete](Interfaces.IIPPoolsClient.md#delete)
- [list](Interfaces.IIPPoolsClient.md#list)
- [update](Interfaces.IIPPoolsClient.md#update)

## Methods

### create

▸ **create**(`data`): `Promise`<[`IpPoolCreateResult`](../modules.md#ippoolcreateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IpPoolCreateData`](../modules.md#ippoolcreatedata) |

#### Returns

`Promise`<[`IpPoolCreateResult`](../modules.md#ippoolcreateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/6248cc0/lib/Interfaces/IPPools/IIPPoolsClient.ts#L9)

___

### delete

▸ **delete**(`poolId`, `data`): `Promise`<[`IpPoolMessageResult`](../modules.md#ippoolmessageresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolDeleteData`](../modules.md#ippooldeletedata) |

#### Returns

`Promise`<[`IpPoolMessageResult`](../modules.md#ippoolmessageresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/6248cc0/lib/Interfaces/IPPools/IIPPoolsClient.ts#L11)

___

### list

▸ **list**(): `Promise`<[`IpPoolListResult`](../modules.md#ippoollistresult)\>

#### Returns

`Promise`<[`IpPoolListResult`](../modules.md#ippoollistresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/6248cc0/lib/Interfaces/IPPools/IIPPoolsClient.ts#L8)

___

### update

▸ **update**(`poolId`, `data`): `Promise`<[`IpPoolMessageResult`](../modules.md#ippoolmessageresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolUpdateData`](../modules.md#ippoolupdatedata) |

#### Returns

`Promise`<[`IpPoolMessageResult`](../modules.md#ippoolmessageresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/6248cc0/lib/Interfaces/IPPools/IIPPoolsClient.ts#L10)
