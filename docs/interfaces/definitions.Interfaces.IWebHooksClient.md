[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IWebHooksClient

# Interface: IWebHooksClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IWebHooksClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IWebHooksClient.md#create)
- [destroy](definitions.Interfaces.IWebHooksClient.md#destroy)
- [get](definitions.Interfaces.IWebHooksClient.md#get)
- [list](definitions.Interfaces.IWebHooksClient.md#list)
- [update](definitions.Interfaces.IWebHooksClient.md#update)

## Methods

### create

▸ **create**(`domain`, `id`, `url`, `test`): `Promise`\<[`WebhookValidationResponse`](../modules/definitions.md#webhookvalidationresponse) \| [`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |
| `url` | `string` |
| `test` | `boolean` |

#### Returns

`Promise`\<[`WebhookValidationResponse`](../modules/definitions.md#webhookvalidationresponse) \| [`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:14](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Webhooks/IWebHooksClient.ts#L14)

___

### destroy

▸ **destroy**(`domain`, `id`): `Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |

#### Returns

`Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:20](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Webhooks/IWebHooksClient.ts#L20)

___

### get

▸ **get**(`domain`, `id`): `Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | [`WebhooksIds`](../enums/definitions.Enums.WebhooksIds.md) |

#### Returns

`Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:13](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Webhooks/IWebHooksClient.ts#L13)

___

### list

▸ **list**(`domain`, `query`): `Promise`\<[`WebhookList`](../modules/definitions.md#webhooklist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query` | [`WebhooksQuery`](../modules/definitions.md#webhooksquery) |

#### Returns

`Promise`\<[`WebhookList`](../modules/definitions.md#webhooklist)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:12](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Webhooks/IWebHooksClient.ts#L12)

___

### update

▸ **update**(`domain`, `id`, `url`): `Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `id` | `string` |
| `url` | `string` \| `string`[] |

#### Returns

`Promise`\<[`WebhookResult`](../modules/definitions.md#webhookresult)\>

#### Defined in

[Interfaces/Webhooks/IWebHooksClient.ts:19](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Webhooks/IWebHooksClient.ts#L19)
