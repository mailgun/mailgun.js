[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ISeedsListsClient

# Interface: ISeedsListsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ISeedsListsClient

## Table of contents

### Properties

- [attributes](definitions.Interfaces.ISeedsListsClient.md#attributes)
- [filters](definitions.Interfaces.ISeedsListsClient.md#filters)

### Methods

- [create](definitions.Interfaces.ISeedsListsClient.md#create)
- [destroy](definitions.Interfaces.ISeedsListsClient.md#destroy)
- [get](definitions.Interfaces.ISeedsListsClient.md#get)
- [list](definitions.Interfaces.ISeedsListsClient.md#list)
- [update](definitions.Interfaces.ISeedsListsClient.md#update)

## Properties

### attributes

• **attributes**: [`IInboxPlacementsAttributesClient`](definitions.Interfaces.IInboxPlacementsAttributesClient.md)

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L13)

___

### filters

• **filters**: [`IInboxPlacementsFiltersClient`](definitions.Interfaces.IInboxPlacementsFiltersClient.md)

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L14)

## Methods

### create

▸ **create**(`data`): `Promise`\<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `SeedsListsCreatingData` |

#### Returns

`Promise`\<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L17)

___

### destroy

▸ **destroy**(`address`): `Promise`\<`SeedsListsDestroyApiResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`SeedsListsDestroyApiResponse`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:19](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L19)

___

### get

▸ **get**(`address`): `Promise`\<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L16)

___

### list

▸ **list**(`query`): `Promise`\<`SeedsListsResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `SeedsListsQuery` |

#### Returns

`Promise`\<`SeedsListsResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L15)

___

### update

▸ **update**(`address`, `data`): `Promise`\<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `data` | `SeedsListsUpdatingData` |

#### Returns

`Promise`\<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:18](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L18)
