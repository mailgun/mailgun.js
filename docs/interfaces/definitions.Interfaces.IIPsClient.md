[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IIPsClient

# Interface: IIPsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IIPsClient

## Table of contents

### Methods

- [get](definitions.Interfaces.IIPsClient.md#get)
- [list](definitions.Interfaces.IIPsClient.md#list)

## Methods

### get

▸ **get**(`ip`): `Promise`\<[`IpData`](../modules/definitions.md#ipdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ip` | `string` |

#### Returns

`Promise`\<[`IpData`](../modules/definitions.md#ipdata)\>

#### Defined in

[Interfaces/IPs/IIPsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/73cbc82/lib/Interfaces/IPs/IIPsClient.ts#L5)

___

### list

▸ **list**(`query`): `Promise`\<[`IpsListResponseBody`](../modules/definitions.md#ipslistresponsebody)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`IPsListQuery`](../modules/definitions.md#ipslistquery) |

#### Returns

`Promise`\<[`IpsListResponseBody`](../modules/definitions.md#ipslistresponsebody)\>

#### Defined in

[Interfaces/IPs/IIPsClient.ts:4](https://github.com/mailgun/mailgun.js/blob/73cbc82/lib/Interfaces/IPs/IIPsClient.ts#L4)
