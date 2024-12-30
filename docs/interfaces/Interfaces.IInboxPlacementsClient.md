[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IInboxPlacementsClient

# Interface: IInboxPlacementsClient

[Interfaces](../modules/Interfaces.md).IInboxPlacementsClient

## Table of contents

### Properties

- [providers](Interfaces.IInboxPlacementsClient.md#providers)
- [results](Interfaces.IInboxPlacementsClient.md#results)
- [seedsLists](Interfaces.IInboxPlacementsClient.md#seedslists)

### Methods

- [runTest](Interfaces.IInboxPlacementsClient.md#runtest)

## Properties

### providers

• **providers**: `IInboxPlacementsProvidersClient`

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L9)

___

### results

• **results**: [`IInboxPlacementsResultsClient`](Interfaces.IInboxPlacementsResultsClient.md)

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L8)

___

### seedsLists

• **seedsLists**: [`ISeedsListsClient`](Interfaces.ISeedsListsClient.md)

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:7](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L7)

## Methods

### runTest

▸ **runTest**(`data`): `Promise`<`InboxPlacementsTestResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `InboxPlacementsData` |

#### Returns

`Promise`<`InboxPlacementsTestResult`\>

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L10)
