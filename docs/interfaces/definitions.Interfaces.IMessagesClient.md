[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMessagesClient

# Interface: IMessagesClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMessagesClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IMessagesClient.md#create)

## Methods

### create

▸ **create**(`domain`, `data`): `Promise`\<[`MessagesSendResult`](../modules/definitions.md#messagessendresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`MailgunMessageData`](../modules/definitions.md#mailgunmessagedata) |

#### Returns

`Promise`\<[`MessagesSendResult`](../modules/definitions.md#messagessendresult)\>

#### Defined in

[Interfaces/Messages/IMessagesClient.ts:4](https://github.com/mailgun/mailgun.js/blob/d73f136/lib/Interfaces/Messages/IMessagesClient.ts#L4)
