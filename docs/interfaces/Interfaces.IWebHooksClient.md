[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IWebHooksClient

# Interface: IWebHooksClient

[Interfaces](../modules/Interfaces.md).IWebHooksClient

## Table of contents

### Methods

- [create](Interfaces.IWebHooksClient.md#create)
- [destroy](Interfaces.IWebHooksClient.md#destroy)
- [get](Interfaces.IWebHooksClient.md#get)
- [list](Interfaces.IWebHooksClient.md#list)
- [update](Interfaces.IWebHooksClient.md#update)

## Methods

### create

▸ **create**(`domain`, `id`, `url`, `test`): `Promise`<[`WebhookValidationResponse`](../modules.md#webhookvalidationresponse) \| [`WebhookResult`](../modules.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |
| `url` | `string` |
| `test` | `boolean` |

#### Returns

`Promise`<[`WebhookValidationResponse`](../modules.md#webhookvalidationresponse) \| [`WebhookResult`](../modules.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:14](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Webhooks/IWebHooksClient.ts#L14)

___

### destroy

▸ **destroy**(`domain`, `id`): `Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |

#### Returns

`Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:20](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Webhooks/IWebHooksClient.ts#L20)

___

### get

▸ **get**(`domain`, `id`): `Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | [`WebhooksIds`](../enums/Enums.WebhooksIds.md) |

#### Returns

`Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:13](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Webhooks/IWebHooksClient.ts#L13)

___

### list

▸ **list**(`domain`, `query`): `Promise`<[`WebhookList`](../modules.md#webhooklist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query` | [`WebhooksQuery`](../modules.md#webhooksquery) |

#### Returns

`Promise`<[`WebhookList`](../modules.md#webhooklist)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:12](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Webhooks/IWebHooksClient.ts#L12)

___

### update

▸ **update**(`domain`, `id`, `url`): `Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |
| `url` | `string` |

#### Returns

`Promise`<[`WebhookResult`](../modules.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:19](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Webhooks/IWebHooksClient.ts#L19)
