[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IDomainTagsClient

# Interface: IDomainTagsClient

[Interfaces](../modules/Interfaces.md).IDomainTagsClient

## Table of contents

### Methods

- [countries](Interfaces.IDomainTagsClient.md#countries)
- [destroy](Interfaces.IDomainTagsClient.md#destroy)
- [devices](Interfaces.IDomainTagsClient.md#devices)
- [get](Interfaces.IDomainTagsClient.md#get)
- [list](Interfaces.IDomainTagsClient.md#list)
- [providers](Interfaces.IDomainTagsClient.md#providers)
- [statistic](Interfaces.IDomainTagsClient.md#statistic)
- [update](Interfaces.IDomainTagsClient.md#update)

## Methods

### countries

▸ **countries**(`domain`, `tag`): `Promise`<[`DomainTagCountriesAggregation`](../modules.md#domaintagcountriesaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`DomainTagCountriesAggregation`](../modules.md#domaintagcountriesaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:40](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L40)

___

### destroy

▸ **destroy**(`domain`, `tag`): `Promise`<[`DomainTagsMessageRes`](../modules.md#domaintagsmessageres)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`DomainTagsMessageRes`](../modules.md#domaintagsmessageres)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:31](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L31)

___

### devices

▸ **devices**(`domain`, `tag`): `Promise`<[`DomainTagDevicesAggregation`](../modules.md#domaintagdevicesaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`DomainTagDevicesAggregation`](../modules.md#domaintagdevicesaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:42](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L42)

___

### get

▸ **get**(`domain`, `tag`): `Promise`<[`DomainTagsItem`](../modules.md#domaintagsitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`DomainTagsItem`](../modules.md#domaintagsitem)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:25](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L25)

___

### list

▸ **list**(`domain`): `Promise`<[`DomainTagsList`](../modules.md#domaintagslist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`DomainTagsList`](../modules.md#domaintagslist)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:24](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L24)

___

### providers

▸ **providers**(`domain`, `tag`): `Promise`<[`DomainTagProvidersAggregation`](../modules.md#domaintagprovidersaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`DomainTagProvidersAggregation`](../modules.md#domaintagprovidersaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:41](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L41)

___

### statistic

▸ **statistic**(`domain`, `tag`, `query`): `Promise`<[`IDomainTagStatisticResult`](Interfaces.IDomainTagStatisticResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |
| `query` | [`DomainTagsStatisticQuery`](../modules.md#domaintagsstatisticquery) |

#### Returns

`Promise`<[`IDomainTagStatisticResult`](Interfaces.IDomainTagStatisticResult.md)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:35](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L35)

___

### update

▸ **update**(`domain`, `tag`, `description`): `Promise`<[`DomainTagsMessageRes`](../modules.md#domaintagsmessageres)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |
| `description` | `string` |

#### Returns

`Promise`<[`DomainTagsMessageRes`](../modules.md#domaintagsmessageres)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:26](https://github.com/mailgun/mailgun.js/blob/bbdf081/lib/Interfaces/Domains/DomainTags.ts#L26)
