[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IIPsClient

# Interface: IIPsClient

[Interfaces](../modules/Interfaces.md).IIPsClient

## Table of contents

### Methods

- [get](Interfaces.IIPsClient.md#get)
- [list](Interfaces.IIPsClient.md#list)

## Methods

### get

▸ **get**(`ip`): `Promise`<[`IpData`](../modules.md#ipdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ip` | `string` |

#### Returns

`Promise`<[`IpData`](../modules.md#ipdata)\>

#### Defined in

[Interfaces/IPs/IIPsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/c04a97a/lib/Interfaces/IPs/IIPsClient.ts#L5)

___

### list

▸ **list**(`query`): `Promise`<[`IpsListResponseBody`](../modules.md#ipslistresponsebody)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`IPsListQuery`](../modules.md#ipslistquery) |

#### Returns

`Promise`<[`IpsListResponseBody`](../modules.md#ipslistresponsebody)\>

#### Defined in

[Interfaces/IPs/IIPsClient.ts:4](https://github.com/mailgun/mailgun.js/blob/c04a97a/lib/Interfaces/IPs/IIPsClient.ts#L4)
