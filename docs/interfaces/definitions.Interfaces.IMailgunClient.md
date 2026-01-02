[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMailgunClient

# Interface: IMailgunClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMailgunClient

## Table of contents

### Properties

- [bounceClassification](definitions.Interfaces.IMailgunClient.md#bounceclassification)
- [dkimManagement](definitions.Interfaces.IMailgunClient.md#dkimmanagement)
- [domains](definitions.Interfaces.IMailgunClient.md#domains)
- [events](definitions.Interfaces.IMailgunClient.md#events)
- [inboxPlacements](definitions.Interfaces.IMailgunClient.md#inboxplacements)
- [ip\_pools](definitions.Interfaces.IMailgunClient.md#ip_pools)
- [ips](definitions.Interfaces.IMailgunClient.md#ips)
- [lists](definitions.Interfaces.IMailgunClient.md#lists)
- [logs](definitions.Interfaces.IMailgunClient.md#logs)
- [messages](definitions.Interfaces.IMailgunClient.md#messages)
- [metrics](definitions.Interfaces.IMailgunClient.md#metrics)
- [request](definitions.Interfaces.IMailgunClient.md#request)
- [routes](definitions.Interfaces.IMailgunClient.md#routes)
- [stats](definitions.Interfaces.IMailgunClient.md#stats)
- [subaccounts](definitions.Interfaces.IMailgunClient.md#subaccounts)
- [suppressions](definitions.Interfaces.IMailgunClient.md#suppressions)
- [validate](definitions.Interfaces.IMailgunClient.md#validate)
- [webhooks](definitions.Interfaces.IMailgunClient.md#webhooks)

### Methods

- [resetSubaccount](definitions.Interfaces.IMailgunClient.md#resetsubaccount)
- [setSubaccount](definitions.Interfaces.IMailgunClient.md#setsubaccount)

## Properties

### bounceClassification

• **bounceClassification**: [`IBounceClassificationClient`](definitions.Interfaces.IBounceClassificationClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:41](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L41)

___

### dkimManagement

• **dkimManagement**: [`IDKIMManagementClient`](definitions.Interfaces.IDKIMManagementClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:40](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L40)

___

### domains

• **domains**: [`IDomainsClient`](definitions.Interfaces.IDomainsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:23](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L23)

___

### events

• **events**: [`IEventClient`](definitions.Interfaces.IEventClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:25](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L25)

___

### inboxPlacements

• **inboxPlacements**: [`IInboxPlacementsClient`](definitions.Interfaces.IInboxPlacementsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:36](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L36)

___

### ip\_pools

• **ip\_pools**: [`IIPPoolsClient`](definitions.Interfaces.IIPPoolsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:33](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L33)

___

### ips

• **ips**: [`IIPsClient`](definitions.Interfaces.IIPsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:32](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L32)

___

### lists

• **lists**: [`IMailingListsClient`](definitions.Interfaces.IMailingListsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:34](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L34)

___

### logs

• **logs**: [`ILogsClient`](definitions.Interfaces.ILogsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:39](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L39)

___

### messages

• **messages**: [`IMessagesClient`](definitions.Interfaces.IMessagesClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:29](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L29)

___

### metrics

• **metrics**: [`IMetricsClient`](definitions.Interfaces.IMetricsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:27](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L27)

___

### request

• **request**: `Request`

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:22](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L22)

___

### routes

• **routes**: [`IRoutesClient`](definitions.Interfaces.IRoutesClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:30](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L30)

___

### stats

• **stats**: [`IStatsClient`](definitions.Interfaces.IStatsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:26](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L26)

___

### subaccounts

• **subaccounts**: [`ISubaccountsClient`](definitions.Interfaces.ISubaccountsClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:35](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L35)

___

### suppressions

• **suppressions**: [`ISuppressionClient`](definitions.Interfaces.ISuppressionClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:28](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L28)

___

### validate

• **validate**: [`IValidationClient`](definitions.Interfaces.IValidationClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:31](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L31)

___

### webhooks

• **webhooks**: [`IWebHooksClient`](definitions.Interfaces.IWebHooksClient.md)

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:24](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L24)

## Methods

### resetSubaccount

▸ **resetSubaccount**(): `void`

#### Returns

`void`

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:38](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L38)

___

### setSubaccount

▸ **setSubaccount**(`subaccountId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subaccountId` | `string` |

#### Returns

`void`

#### Defined in

[Interfaces/MailgunClient/IMailgunClient.ts:37](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailgunClient/IMailgunClient.ts#L37)
