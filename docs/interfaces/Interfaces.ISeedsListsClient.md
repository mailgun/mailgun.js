[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / ISeedsListsClient

# Interface: ISeedsListsClient

[Interfaces](../modules/Interfaces.md).ISeedsListsClient

## Table of contents

### Properties

- [attributes](Interfaces.ISeedsListsClient.md#attributes)
- [filters](Interfaces.ISeedsListsClient.md#filters)

### Methods

- [create](Interfaces.ISeedsListsClient.md#create)
- [destroy](Interfaces.ISeedsListsClient.md#destroy)
- [get](Interfaces.ISeedsListsClient.md#get)
- [list](Interfaces.ISeedsListsClient.md#list)
- [update](Interfaces.ISeedsListsClient.md#update)

## Properties

### attributes

• **attributes**: [`IInboxPlacementsAttributesClient`](Interfaces.IInboxPlacementsAttributesClient.md)

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L13)

___

### filters

• **filters**: [`IInboxPlacementsFiltersClient`](Interfaces.IInboxPlacementsFiltersClient.md)

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L14)

## Methods

### create

▸ **create**(`data`): `Promise`<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `SeedsListsCreatingData` |

#### Returns

`Promise`<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L17)

___

### destroy

▸ **destroy**(`address`): `Promise`<`SeedsListsDestroyApiResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`SeedsListsDestroyApiResponse`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:19](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L19)

___

### get

▸ **get**(`address`): `Promise`<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L16)

___

### list

▸ **list**(`query`): `Promise`<`SeedsListsResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `SeedsListsQuery` |

#### Returns

`Promise`<`SeedsListsResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L15)

___

### update

▸ **update**(`address`, `data`): `Promise`<`SeedListResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `data` | `SeedsListsUpdatingData` |

#### Returns

`Promise`<`SeedListResult`\>

#### Defined in

[Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts:18](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts#L18)
