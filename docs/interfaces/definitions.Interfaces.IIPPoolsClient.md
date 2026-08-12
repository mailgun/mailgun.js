[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IIPPoolsClient

# Interface: IIPPoolsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IIPPoolsClient

## Table of contents

### Methods

- [addIp](definitions.Interfaces.IIPPoolsClient.md#addip)
- [addIps](definitions.Interfaces.IIPPoolsClient.md#addips)
- [create](definitions.Interfaces.IIPPoolsClient.md#create)
- [delegate](definitions.Interfaces.IIPPoolsClient.md#delegate)
- [destroy](definitions.Interfaces.IIPPoolsClient.md#destroy)
- [get](definitions.Interfaces.IIPPoolsClient.md#get)
- [linkedDomains](definitions.Interfaces.IIPPoolsClient.md#linkeddomains)
- [list](definitions.Interfaces.IIPPoolsClient.md#list)
- [removeDomainPool](definitions.Interfaces.IIPPoolsClient.md#removedomainpool)
- [removeIp](definitions.Interfaces.IIPPoolsClient.md#removeip)
- [removeIpFromDomainPool](definitions.Interfaces.IIPPoolsClient.md#removeipfromdomainpool)
- [revokeDelegation](definitions.Interfaces.IIPPoolsClient.md#revokedelegation)
- [unlinkDomainPool](definitions.Interfaces.IIPPoolsClient.md#unlinkdomainpool)
- [update](definitions.Interfaces.IIPPoolsClient.md#update)

## Methods

### addIp

▸ **addIp**(`poolId`, `ip`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `ip` | `string` |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L17)

___

### addIps

▸ **addIps**(`poolId`, `ips`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `ips` | `string`[] |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:21](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L21)

___

### create

▸ **create**(`data`): `Promise`\<[`IpPoolCreateResult`](../modules/definitions.md#ippoolcreateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IpPoolCreateData`](../modules/definitions.md#ippoolcreatedata) |

#### Returns

`Promise`\<[`IpPoolCreateResult`](../modules/definitions.md#ippoolcreateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L13)

___

### delegate

▸ **delegate**(`poolId`, `subAccountId`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `subAccountId` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:19](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L19)

___

### destroy

▸ **destroy**(`poolId`, `data`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolDeleteData`](../modules/definitions.md#ippooldeletedata) |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L15)

___

### get

▸ **get**(`poolId`): `Promise`\<[`IpPoolDetails`](../modules/definitions.md#ippooldetails)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |

#### Returns

`Promise`\<[`IpPoolDetails`](../modules/definitions.md#ippooldetails)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:12](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L12)

___

### linkedDomains

▸ **linkedDomains**(`poolId`, `query?`): `Promise`\<[`IpPoolLinkedDomains`](../modules/definitions.md#ippoollinkeddomains)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `query?` | [`IpPoolLinkedDomainsQuery`](../modules/definitions.md#ippoollinkeddomainsquery) |

#### Returns

`Promise`\<[`IpPoolLinkedDomains`](../modules/definitions.md#ippoollinkeddomains)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L16)

___

### list

▸ **list**(): `Promise`\<[`IpPoolListResult`](../modules/definitions.md#ippoollistresult)\>

#### Returns

`Promise`\<[`IpPoolListResult`](../modules/definitions.md#ippoollistresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L11)

___

### removeDomainPool

▸ **removeDomainPool**(`domain`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:27](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L27)

___

### removeIp

▸ **removeIp**(`poolId`, `ip`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `ip` | `string` |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:18](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L18)

___

### removeIpFromDomainPool

▸ **removeIpFromDomainPool**(`domain`, `ip`, `replacementPoolId?`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `ip` | `string` |
| `replacementPoolId?` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:22](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L22)

___

### revokeDelegation

▸ **revokeDelegation**(`poolId`, `subAccountId`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `subAccountId` | `string` |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:20](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L20)

___

### unlinkDomainPool

▸ **unlinkDomainPool**(`domain`, `replacementPoolId`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `replacementPoolId` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:28](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L28)

___

### update

▸ **update**(`poolId`, `data`): `Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolId` | `string` |
| `data` | [`IpPoolUpdateData`](../modules/definitions.md#ippoolupdatedata) |

#### Returns

`Promise`\<[`IpPoolUpdateResult`](../modules/definitions.md#ippoolupdateresult)\>

#### Defined in

[Interfaces/IPPools/IIPPoolsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/IPPools/IIPPoolsClient.ts#L14)
