[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IDomainsClient

# Interface: IDomainsClient

[Interfaces](../modules/Interfaces.md).IDomainsClient

## Table of contents

### Properties

- [domainCredentials](Interfaces.IDomainsClient.md#domaincredentials)
- [domainTags](Interfaces.IDomainsClient.md#domaintags)
- [domainTemplates](Interfaces.IDomainsClient.md#domaintemplates)

### Methods

- [assignIp](Interfaces.IDomainsClient.md#assignip)
- [create](Interfaces.IDomainsClient.md#create)
- [deleteIp](Interfaces.IDomainsClient.md#deleteip)
- [destroy](Interfaces.IDomainsClient.md#destroy)
- [get](Interfaces.IDomainsClient.md#get)
- [getConnection](Interfaces.IDomainsClient.md#getconnection)
- [getIps](Interfaces.IDomainsClient.md#getips)
- [getTracking](Interfaces.IDomainsClient.md#gettracking)
- [linkIpPool](Interfaces.IDomainsClient.md#linkippool)
- [list](Interfaces.IDomainsClient.md#list)
- [unlinkIpPoll](Interfaces.IDomainsClient.md#unlinkippoll)
- [update](Interfaces.IDomainsClient.md#update)
- [updateConnection](Interfaces.IDomainsClient.md#updateconnection)
- [updateDKIMAuthority](Interfaces.IDomainsClient.md#updatedkimauthority)
- [updateDKIMSelector](Interfaces.IDomainsClient.md#updatedkimselector)
- [updateTracking](Interfaces.IDomainsClient.md#updatetracking)
- [updateWebPrefix](Interfaces.IDomainsClient.md#updatewebprefix)
- [verify](Interfaces.IDomainsClient.md#verify)

## Properties

### domainCredentials

• **domainCredentials**: [`IDomainCredentials`](Interfaces.IDomainCredentials.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:28](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L28)

___

### domainTags

• **domainTags**: [`IDomainTagsClient`](Interfaces.IDomainTagsClient.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:30](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L30)

___

### domainTemplates

• **domainTemplates**: [`IDomainTemplatesClient`](Interfaces.IDomainTemplatesClient.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:29](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L29)

## Methods

### assignIp

▸ **assignIp**(`domain`, `ip`): `Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `ip` | `string` |

#### Returns

`Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:46](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L46)

___

### create

▸ **create**(`data`): `Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DomainInfo`](../modules.md#domaininfo) |

#### Returns

`Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:33](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L33)

___

### deleteIp

▸ **deleteIp**(`domain`, `ip`): `Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `ip` | `string` |

#### Returns

`Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:47](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L47)

___

### destroy

▸ **destroy**(`domain`): `Promise`<[`MessageResponse`](../modules.md#messageresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`MessageResponse`](../modules.md#messageresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:36](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L36)

___

### get

▸ **get**(`domain`): `Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:32](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L32)

___

### getConnection

▸ **getConnection**(`domain`): `Promise`<[`ConnectionSettings`](../modules.md#connectionsettings)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`ConnectionSettings`](../modules.md#connectionsettings)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:37](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L37)

___

### getIps

▸ **getIps**(`domain`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:45](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L45)

___

### getTracking

▸ **getTracking**(`domain`): `Promise`<[`DomainTrackingData`](../modules.md#domaintrackingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`DomainTrackingData`](../modules.md#domaintrackingdata)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:39](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L39)

___

### linkIpPool

▸ **linkIpPool**(`domain`, `pool_id`): `Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `pool_id` | `string` |

#### Returns

`Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:49](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L49)

___

### list

▸ **list**(`query?`): `Promise`<[`TDomain`](../modules.md#tdomain)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`DomainsQuery`](../modules.md#domainsquery) |

#### Returns

`Promise`<[`TDomain`](../modules.md#tdomain)[]\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:31](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L31)

___

### unlinkIpPoll

▸ **unlinkIpPoll**(`domain`, `replacement`): `Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `replacement` | [`ReplacementForPool`](../modules.md#replacementforpool) |

#### Returns

`Promise`<[`APIResponse`](../modules.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:50](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L50)

___

### update

▸ **update**(`domain`, `data`): `Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainUpdateInfo`](../modules.md#domainupdateinfo) |

#### Returns

`Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:34](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L34)

___

### updateConnection

▸ **updateConnection**(`domain`, `data`): `Promise`<[`UpdatedConnectionSettings`](../modules.md#updatedconnectionsettings)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`ConnectionSettings`](../modules.md#connectionsettings) |

#### Returns

`Promise`<[`UpdatedConnectionSettings`](../modules.md#updatedconnectionsettings)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:38](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L38)

___

### updateDKIMAuthority

▸ **updateDKIMAuthority**(`domain`, `data`): `Promise`<[`UpdatedDKIMAuthority`](../modules.md#updateddkimauthority)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMAuthorityInfo`](../modules.md#dkimauthorityinfo) |

#### Returns

`Promise`<[`UpdatedDKIMAuthority`](../modules.md#updateddkimauthority)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:51](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L51)

___

### updateDKIMSelector

▸ **updateDKIMSelector**(`domain`, `data`): `Promise`<[`UpdatedDKIMSelectorResponse`](../modules.md#updateddkimselectorresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMSelectorInfo`](../modules.md#dkimselectorinfo) |

#### Returns

`Promise`<[`UpdatedDKIMSelectorResponse`](../modules.md#updateddkimselectorresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:52](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L52)

___

### updateTracking

▸ **updateTracking**(`domain`, `type`, `data`): `Promise`<[`UpdatedOpenTracking`](../modules.md#updatedopentracking)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`OpenTrackingInfo`](../modules.md#opentrackinginfo) \| [`ClickTrackingInfo`](../modules.md#clicktrackinginfo) \| [`UnsubscribeTrackingInfo`](../modules.md#unsubscribetrackinginfo) |

#### Returns

`Promise`<[`UpdatedOpenTracking`](../modules.md#updatedopentracking)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:40](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L40)

___

### updateWebPrefix

▸ **updateWebPrefix**(`domain`, `data`): `Promise`<[`UpdatedWebPrefixResponse`](../modules.md#updatedwebprefixresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`WebPrefixInfo`](../modules.md#webprefixinfo) |

#### Returns

`Promise`<[`UpdatedWebPrefixResponse`](../modules.md#updatedwebprefixresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:53](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L53)

___

### verify

▸ **verify**(`domain`): `Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`TDomain`](../modules.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:35](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Domains/DomainsClient.ts#L35)
