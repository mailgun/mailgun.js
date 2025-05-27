[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IInboxPlacementsClient

# Interface: IInboxPlacementsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IInboxPlacementsClient

## Table of contents

### Properties

- [providers](definitions.Interfaces.IInboxPlacementsClient.md#providers)
- [results](definitions.Interfaces.IInboxPlacementsClient.md#results)
- [seedsLists](definitions.Interfaces.IInboxPlacementsClient.md#seedslists)

### Methods

- [runTest](definitions.Interfaces.IInboxPlacementsClient.md#runtest)

## Properties

### providers

• **providers**: [`IInboxPlacementsProvidersClient`](definitions.Interfaces.IInboxPlacementsProvidersClient.md)

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L9)

___

### results

• **results**: [`IInboxPlacementsResultsClient`](definitions.Interfaces.IInboxPlacementsResultsClient.md)

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L8)

___

### seedsLists

• **seedsLists**: [`ISeedsListsClient`](definitions.Interfaces.ISeedsListsClient.md)

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:7](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L7)

## Methods

### runTest

▸ **runTest**(`data`): `Promise`\<`InboxPlacementsTestResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `InboxPlacementsData` |

#### Returns

`Promise`\<`InboxPlacementsTestResult`\>

#### Defined in

[Interfaces/InboxPlacements/InboxPlacementsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts#L10)
