[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IRequestProvider

# Interface: IRequestProvider

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IRequestProvider

## Table of contents

### Methods

- [makeRequest](definitions.Interfaces.IRequestProvider.md#makerequest)
- [resetSubAccountHeader](definitions.Interfaces.IRequestProvider.md#resetsubaccountheader)
- [setSubAccountHeader](definitions.Interfaces.IRequestProvider.md#setsubaccountheader)

## Methods

### makeRequest

▸ **makeRequest**(`url`, `method`, `data`, `config?`): `Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `method` | `string` |
| `data` | [`RequestData`](../modules/definitions.md#requestdata) |
| `config?` | [`onCallReqConfig`](../modules/definitions.md#oncallreqconfig) |

#### Returns

`Promise`\<[`APIResponse`](../modules/definitions.md#apiresponse)\>

#### Defined in

[Interfaces/Common/RequestProviders/RequestProvider.ts:4](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Common/RequestProviders/RequestProvider.ts#L4)

___

### resetSubAccountHeader

▸ **resetSubAccountHeader**(): `void`

#### Returns

`void`

#### Defined in

[Interfaces/Common/RequestProviders/RequestProvider.ts:11](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Common/RequestProviders/RequestProvider.ts#L11)

___

### setSubAccountHeader

▸ **setSubAccountHeader**(`subAccountId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subAccountId` | `string` |

#### Returns

`void`

#### Defined in

[Interfaces/Common/RequestProviders/RequestProvider.ts:10](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Common/RequestProviders/RequestProvider.ts#L10)
