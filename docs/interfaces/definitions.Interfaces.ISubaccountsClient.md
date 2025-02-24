[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ISubaccountsClient

# Interface: ISubaccountsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ISubaccountsClient

## Table of contents

### Methods

- [create](definitions.Interfaces.ISubaccountsClient.md#create)
- [disable](definitions.Interfaces.ISubaccountsClient.md#disable)
- [enable](definitions.Interfaces.ISubaccountsClient.md#enable)
- [get](definitions.Interfaces.ISubaccountsClient.md#get)
- [list](definitions.Interfaces.ISubaccountsClient.md#list)

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

[Interfaces/Subaccounts/ISubaccountsClient.ts:6](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L6)

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

[Interfaces/Subaccounts/ISubaccountsClient.ts:7](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L7)

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

[Interfaces/Subaccounts/ISubaccountsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L8)

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

[Interfaces/Subaccounts/ISubaccountsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L5)

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

[Interfaces/Subaccounts/ISubaccountsClient.ts:4](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L4)
