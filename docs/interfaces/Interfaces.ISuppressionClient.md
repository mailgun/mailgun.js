[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / ISuppressionClient

# Interface: ISuppressionClient

[Interfaces](../modules/Interfaces.md).ISuppressionClient

## Table of contents

### Methods

- [create](Interfaces.ISuppressionClient.md#create)
- [destroy](Interfaces.ISuppressionClient.md#destroy)
- [get](Interfaces.ISuppressionClient.md#get)
- [list](Interfaces.ISuppressionClient.md#list)

## Methods

### create

▸ **create**(`domain`, `type`, `data`): `Promise`<[`SuppressionCreationResult`](../modules.md#suppressioncreationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`SuppressionCreationData`](../modules.md#suppressioncreationdata) \| [`SuppressionCreationData`](../modules.md#suppressioncreationdata)[] |

#### Returns

`Promise`<[`SuppressionCreationResult`](../modules.md#suppressioncreationresult)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:22](https://github.com/mailgun/mailgun.js/blob/0486635/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L22)

___

### destroy

▸ **destroy**(`domain`, `type`, `address`): `Promise`<[`SuppressionDestroyResult`](../modules.md#suppressiondestroyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `address` | `string` |

#### Returns

`Promise`<[`SuppressionDestroyResult`](../modules.md#suppressiondestroyresult)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:28](https://github.com/mailgun/mailgun.js/blob/0486635/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L28)

___

### get

▸ **get**(`domain`, `type`, `address`): `Promise`<[`IBounce`](Interfaces.IBounce.md) \| [`IComplaint`](Interfaces.IComplaint.md) \| [`IUnsubscribe`](Interfaces.IUnsubscribe.md) \| [`IWhiteList`](Interfaces.IWhiteList.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `address` | `string` |

#### Returns

`Promise`<[`IBounce`](Interfaces.IBounce.md) \| [`IComplaint`](Interfaces.IComplaint.md) \| [`IUnsubscribe`](Interfaces.IUnsubscribe.md) \| [`IWhiteList`](Interfaces.IWhiteList.md)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/0486635/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L16)

___

### list

▸ **list**(`domain`, `type`, `query?`): `Promise`<[`SuppressionList`](../modules.md#suppressionlist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `query?` | [`SuppressionListQuery`](../modules.md#suppressionlistquery) |

#### Returns

`Promise`<[`SuppressionList`](../modules.md#suppressionlist)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/0486635/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L14)
