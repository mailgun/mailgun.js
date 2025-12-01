[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainsClient

# Interface: IDomainsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainsClient

## Table of contents

### Properties

- [domainCredentials](definitions.Interfaces.IDomainsClient.md#domaincredentials)
- [domainTags](definitions.Interfaces.IDomainsClient.md#domaintags)
- [domainTemplates](definitions.Interfaces.IDomainsClient.md#domaintemplates)
- [domainTracking](definitions.Interfaces.IDomainsClient.md#domaintracking)

### Methods

- [assignIp](definitions.Interfaces.IDomainsClient.md#assignip)
- [create](definitions.Interfaces.IDomainsClient.md#create)
- [deleteIp](definitions.Interfaces.IDomainsClient.md#deleteip)
- [destroy](definitions.Interfaces.IDomainsClient.md#destroy)
- [get](definitions.Interfaces.IDomainsClient.md#get)
- [getConnection](definitions.Interfaces.IDomainsClient.md#getconnection)
- [getIps](definitions.Interfaces.IDomainsClient.md#getips)
- [getTracking](definitions.Interfaces.IDomainsClient.md#gettracking)
- [linkIpPool](definitions.Interfaces.IDomainsClient.md#linkippool)
- [list](definitions.Interfaces.IDomainsClient.md#list)
- [unlinkIpPoll](definitions.Interfaces.IDomainsClient.md#unlinkippoll)
- [update](definitions.Interfaces.IDomainsClient.md#update)
- [updateConnection](definitions.Interfaces.IDomainsClient.md#updateconnection)
- [updateDKIMAuthority](definitions.Interfaces.IDomainsClient.md#updatedkimauthority)
- [updateDKIMSelector](definitions.Interfaces.IDomainsClient.md#updatedkimselector)
- [updateTracking](definitions.Interfaces.IDomainsClient.md#updatetracking)
- [updateWebPrefix](definitions.Interfaces.IDomainsClient.md#updatewebprefix)
- [verify](definitions.Interfaces.IDomainsClient.md#verify)

## Properties

### domainCredentials

• **domainCredentials**: [`IDomainCredentials`](definitions.Interfaces.IDomainCredentials.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:31](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L31)

___

### domainTags

• **domainTags**: [`IDomainTagsClient`](definitions.Interfaces.IDomainTagsClient.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:33](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L33)

___

### domainTemplates

• **domainTemplates**: [`IDomainTemplatesClient`](definitions.Interfaces.IDomainTemplatesClient.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:32](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L32)

___

### domainTracking

• **domainTracking**: [`IDomainTrackingClient`](definitions.Interfaces.IDomainTrackingClient.md)

#### Defined in

[Interfaces/Domains/DomainsClient.ts:34](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L34)

## Methods

### assignIp

▸ **assignIp**(`domain`, `ip`): `Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `ip` | `string` |

#### Returns

`Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:50](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L50)

___

### create

▸ **create**(`data`): `Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DomainInfo`](../modules/definitions.md#domaininfo) |

#### Returns

`Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:37](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L37)

___

### deleteIp

▸ **deleteIp**(`domain`, `ip`): `Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `ip` | `string` |

#### Returns

`Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:51](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L51)

___

### destroy

▸ **destroy**(`domain`): `Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:40](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L40)

___

### get

▸ **get**(`domain`, `query?`): `Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query?` | [`DomainGetQuery`](../modules/definitions.md#domaingetquery) |

#### Returns

`Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:36](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L36)

___

### getConnection

▸ **getConnection**(`domain`): `Promise`\<[`ConnectionSettings`](../modules/definitions.md#connectionsettings)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`ConnectionSettings`](../modules/definitions.md#connectionsettings)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:41](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L41)

___

### getIps

▸ **getIps**(`domain`): `Promise`\<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:49](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L49)

___

### getTracking

▸ **getTracking**(`domain`): `Promise`\<[`DomainTrackingData`](../modules/definitions.md#domaintrackingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`DomainTrackingData`](../modules/definitions.md#domaintrackingdata)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:43](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L43)

___

### linkIpPool

▸ **linkIpPool**(`domain`, `pool_id`): `Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `pool_id` | `string` |

#### Returns

`Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:53](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L53)

___

### list

▸ **list**(`query?`): `Promise`\<[`TDomain`](../modules/definitions.md#tdomain)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`DomainsQuery`](../modules/definitions.md#domainsquery) |

#### Returns

`Promise`\<[`TDomain`](../modules/definitions.md#tdomain)[]\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:35](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L35)

___

### unlinkIpPoll

▸ **unlinkIpPoll**(`domain`, `replacement`): `Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `replacement` | [`ReplacementForPool`](../modules/definitions.md#replacementforpool) |

#### Returns

`Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:54](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L54)

___

### update

▸ **update**(`domain`, `data`): `Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainUpdateInfo`](../modules/definitions.md#domainupdateinfo) |

#### Returns

`Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:38](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L38)

___

### updateConnection

▸ **updateConnection**(`domain`, `data`): `Promise`\<[`UpdatedConnectionSettings`](../modules/definitions.md#updatedconnectionsettings)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`ConnectionSettings`](../modules/definitions.md#connectionsettings) |

#### Returns

`Promise`\<[`UpdatedConnectionSettings`](../modules/definitions.md#updatedconnectionsettings)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:42](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L42)

___

### updateDKIMAuthority

▸ **updateDKIMAuthority**(`domain`, `data`): `Promise`\<[`UpdatedDKIMAuthority`](../modules/definitions.md#updateddkimauthority)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMAuthorityInfo`](../modules/definitions.md#dkimauthorityinfo) |

#### Returns

`Promise`\<[`UpdatedDKIMAuthority`](../modules/definitions.md#updateddkimauthority)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:55](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L55)

___

### updateDKIMSelector

▸ **updateDKIMSelector**(`domain`, `data`): `Promise`\<[`UpdatedDKIMSelectorResult`](../modules/definitions.md#updateddkimselectorresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMSelectorInfo`](../modules/definitions.md#dkimselectorinfo) |

#### Returns

`Promise`\<[`UpdatedDKIMSelectorResult`](../modules/definitions.md#updateddkimselectorresult)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:56](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L56)

___

### updateTracking

▸ **updateTracking**(`domain`, `type`, `data`): `Promise`\<[`UpdatedOpenTracking`](../modules/definitions.md#updatedopentracking)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`OpenTrackingInfo`](../modules/definitions.md#opentrackinginfo) \| [`ClickTrackingInfo`](../modules/definitions.md#clicktrackinginfo) \| [`UnsubscribeTrackingInfo`](../modules/definitions.md#unsubscribetrackinginfo) |

#### Returns

`Promise`\<[`UpdatedOpenTracking`](../modules/definitions.md#updatedopentracking)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:44](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L44)

___

### updateWebPrefix

▸ **updateWebPrefix**(`domain`, `data`): `Promise`\<[`UpdatedWebPrefixResponse`](../modules/definitions.md#updatedwebprefixresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`WebPrefixInfo`](../modules/definitions.md#webprefixinfo) |

#### Returns

`Promise`\<[`UpdatedWebPrefixResponse`](../modules/definitions.md#updatedwebprefixresponse)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:57](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L57)

___

### verify

▸ **verify**(`domain`): `Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`TDomain`](../modules/definitions.md#tdomain)\>

#### Defined in

[Interfaces/Domains/DomainsClient.ts:39](https://github.com/mailgun/mailgun.js/blob/dcbfb69/lib/Interfaces/Domains/DomainsClient.ts#L39)
