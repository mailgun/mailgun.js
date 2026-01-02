[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ISubaccountsClient

# Interface: ISubaccountsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ISubaccountsClient

## Table of contents

### Methods

- [create](definitions.Interfaces.ISubaccountsClient.md#create)
- [destroy](definitions.Interfaces.ISubaccountsClient.md#destroy)
- [disable](definitions.Interfaces.ISubaccountsClient.md#disable)
- [enable](definitions.Interfaces.ISubaccountsClient.md#enable)
- [get](definitions.Interfaces.ISubaccountsClient.md#get)
- [getMonthlySendingLimit](definitions.Interfaces.ISubaccountsClient.md#getmonthlysendinglimit)
- [list](definitions.Interfaces.ISubaccountsClient.md#list)
- [setMonthlySendingLimit](definitions.Interfaces.ISubaccountsClient.md#setmonthlysendinglimit)

## Methods

### create

▸ **create**(`name`): `Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L13)

___

### destroy

▸ **destroy**(`id`): `Promise`\<[`SubaccountDestroyResponse`](../modules/definitions.md#subaccountdestroyresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SubaccountDestroyResponse`](../modules/definitions.md#subaccountdestroyresponse)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L16)

___

### disable

▸ **disable**(`id`): `Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L14)

___

### enable

▸ **enable**(`id`): `Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L15)

___

### get

▸ **get**(`id`): `Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SubaccountResponseData`](../modules/definitions.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:12](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L12)

___

### getMonthlySendingLimit

▸ **getMonthlySendingLimit**(`id`): `Promise`\<[`SubaccountSendingLimitResponse`](../modules/definitions.md#subaccountsendinglimitresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`SubaccountSendingLimitResponse`](../modules/definitions.md#subaccountsendinglimitresponse)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L17)

___

### list

▸ **list**(`query?`): `Promise`\<[`SubaccountListResponseData`](../modules/definitions.md#subaccountlistresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`SubaccountsQuery`](../modules/definitions.md#subaccountsquery) |

#### Returns

`Promise`\<[`SubaccountListResponseData`](../modules/definitions.md#subaccountlistresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L11)

___

### setMonthlySendingLimit

▸ **setMonthlySendingLimit**(`id`, `limit`): `Promise`\<[`SubaccountSetSendingLimitResponse`](../modules/definitions.md#subaccountsetsendinglimitresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `limit` | `number` |

#### Returns

`Promise`\<[`SubaccountSetSendingLimitResponse`](../modules/definitions.md#subaccountsetsendinglimitresponse)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:18](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L18)
