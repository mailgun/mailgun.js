[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainTagsClient

# Interface: IDomainTagsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainTagsClient

## Table of contents

### Methods

- [countries](definitions.Interfaces.IDomainTagsClient.md#countries)
- [destroy](definitions.Interfaces.IDomainTagsClient.md#destroy)
- [devices](definitions.Interfaces.IDomainTagsClient.md#devices)
- [get](definitions.Interfaces.IDomainTagsClient.md#get)
- [list](definitions.Interfaces.IDomainTagsClient.md#list)
- [providers](definitions.Interfaces.IDomainTagsClient.md#providers)
- [statistic](definitions.Interfaces.IDomainTagsClient.md#statistic)
- [update](definitions.Interfaces.IDomainTagsClient.md#update)

## Methods

### countries

▸ **countries**(`domain`, `tag`): `Promise`\<[`DomainTagCountriesAggregation`](../modules/definitions.md#domaintagcountriesaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`DomainTagCountriesAggregation`](../modules/definitions.md#domaintagcountriesaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:40](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L40)

___

### destroy

▸ **destroy**(`domain`, `tag`): `Promise`\<[`DomainTagsMessageRes`](../modules/definitions.md#domaintagsmessageres)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`DomainTagsMessageRes`](../modules/definitions.md#domaintagsmessageres)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:31](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L31)

___

### devices

▸ **devices**(`domain`, `tag`): `Promise`\<[`DomainTagDevicesAggregation`](../modules/definitions.md#domaintagdevicesaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`DomainTagDevicesAggregation`](../modules/definitions.md#domaintagdevicesaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:42](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L42)

___

### get

▸ **get**(`domain`, `tag`): `Promise`\<[`DomainTagsItem`](../modules/definitions.md#domaintagsitem)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`DomainTagsItem`](../modules/definitions.md#domaintagsitem)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:25](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L25)

___

### list

▸ **list**(`domain`): `Promise`\<[`DomainTagsList`](../modules/definitions.md#domaintagslist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`DomainTagsList`](../modules/definitions.md#domaintagslist)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:24](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L24)

___

### providers

▸ **providers**(`domain`, `tag`): `Promise`\<[`DomainTagProvidersAggregation`](../modules/definitions.md#domaintagprovidersaggregation)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`DomainTagProvidersAggregation`](../modules/definitions.md#domaintagprovidersaggregation)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:41](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L41)

___

### statistic

▸ **statistic**(`domain`, `tag`, `query`): `Promise`\<[`IDomainTagStatisticResult`](definitions.Interfaces.IDomainTagStatisticResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |
| `query` | [`DomainTagsStatisticQuery`](../modules/definitions.md#domaintagsstatisticquery) |

#### Returns

`Promise`\<[`IDomainTagStatisticResult`](definitions.Interfaces.IDomainTagStatisticResult.md)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:35](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L35)

___

### update

▸ **update**(`domain`, `tag`, `description`): `Promise`\<[`DomainTagsMessageRes`](../modules/definitions.md#domaintagsmessageres)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `tag` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<[`DomainTagsMessageRes`](../modules/definitions.md#domaintagsmessageres)\>

#### Defined in

[Interfaces/Domains/DomainTags.ts:26](https://github.com/mailgun/mailgun.js/blob/aa3958c/lib/Interfaces/Domains/DomainTags.ts#L26)
