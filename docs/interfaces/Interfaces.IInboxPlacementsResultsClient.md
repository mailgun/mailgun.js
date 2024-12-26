[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IInboxPlacementsResultsClient

# Interface: IInboxPlacementsResultsClient

[Interfaces](../modules/Interfaces.md).IInboxPlacementsResultsClient

## Table of contents

### Properties

- [attributes](Interfaces.IInboxPlacementsResultsClient.md#attributes)
- [filters](Interfaces.IInboxPlacementsResultsClient.md#filters)
- [sharing](Interfaces.IInboxPlacementsResultsClient.md#sharing)

### Methods

- [destroy](Interfaces.IInboxPlacementsResultsClient.md#destroy)
- [get](Interfaces.IInboxPlacementsResultsClient.md#get)
- [getResultByShareId](Interfaces.IInboxPlacementsResultsClient.md#getresultbyshareid)
- [list](Interfaces.IInboxPlacementsResultsClient.md#list)

## Properties

### attributes

• **attributes**: [`IInboxPlacementsAttributesClient`](Interfaces.IInboxPlacementsAttributesClient.md)

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:13](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L13)

___

### filters

• **filters**: [`IInboxPlacementsFiltersClient`](Interfaces.IInboxPlacementsFiltersClient.md)

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:14](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L14)

___

### sharing

• **sharing**: [`IIPRSharingClient`](Interfaces.IIPRSharingClient.md)

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:12](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L12)

## Methods

### destroy

▸ **destroy**(`id`): `Promise`<`InboxPlacementsDestroyResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`InboxPlacementsDestroyResult`\>

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:17](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L17)

___

### get

▸ **get**(`address`): `Promise`<`InboxPlacementsResultWithStatus`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`InboxPlacementsResultWithStatus`\>

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:16](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L16)

___

### getResultByShareId

▸ **getResultByShareId**(`shareId`): `Promise`<`InboxPlacementsResultWithStatus`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `shareId` | `string` |

#### Returns

`Promise`<`InboxPlacementsResultWithStatus`\>

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:18](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L18)

___

### list

▸ **list**(`query`): `Promise`<`InboxPlacementsResultsList`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `InboxPlacementsResultsQuery` |

#### Returns

`Promise`<`InboxPlacementsResultsList`\>

#### Defined in

[Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts:15](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts#L15)