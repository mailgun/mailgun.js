[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / ISubaccountsClient

# Interface: ISubaccountsClient

[Interfaces](../modules/Interfaces.md).ISubaccountsClient

## Table of contents

### Methods

- [create](Interfaces.ISubaccountsClient.md#create)
- [disable](Interfaces.ISubaccountsClient.md#disable)
- [enable](Interfaces.ISubaccountsClient.md#enable)
- [get](Interfaces.ISubaccountsClient.md#get)
- [list](Interfaces.ISubaccountsClient.md#list)

## Methods

### create

▸ **create**(`name`): `Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:6](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L6)

___

### disable

▸ **disable**(`id`): `Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:7](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L7)

___

### enable

▸ **enable**(`id`): `Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L8)

___

### get

▸ **get**(`id`): `Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`SubaccountResponseData`](../modules.md#subaccountresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L5)

___

### list

▸ **list**(`query?`): `Promise`<[`SubaccountListResponseData`](../modules.md#subaccountlistresponsedata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`SubaccountsQuery`](../modules.md#subaccountsquery) |

#### Returns

`Promise`<[`SubaccountListResponseData`](../modules.md#subaccountlistresponsedata)\>

#### Defined in

[Interfaces/Subaccounts/ISubaccountsClient.ts:4](https://github.com/mailgun/mailgun.js/blob/c7a5a6d/lib/Interfaces/Subaccounts/ISubaccountsClient.ts#L4)
