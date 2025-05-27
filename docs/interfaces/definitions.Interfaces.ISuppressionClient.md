[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ISuppressionClient

# Interface: ISuppressionClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ISuppressionClient

## Table of contents

### Methods

- [create](definitions.Interfaces.ISuppressionClient.md#create)
- [destroy](definitions.Interfaces.ISuppressionClient.md#destroy)
- [get](definitions.Interfaces.ISuppressionClient.md#get)
- [list](definitions.Interfaces.ISuppressionClient.md#list)

## Methods

### create

▸ **create**(`domain`, `type`, `data`): `Promise`\<[`SuppressionCreationResult`](../modules/definitions.md#suppressioncreationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`SuppressionCreationData`](../modules/definitions.md#suppressioncreationdata) \| [`SuppressionCreationData`](../modules/definitions.md#suppressioncreationdata)[] |

#### Returns

`Promise`\<[`SuppressionCreationResult`](../modules/definitions.md#suppressioncreationresult)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:22](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L22)

___

### destroy

▸ **destroy**(`domain`, `type`, `address`): `Promise`\<[`SuppressionDestroyResult`](../modules/definitions.md#suppressiondestroyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `address` | `string` |

#### Returns

`Promise`\<[`SuppressionDestroyResult`](../modules/definitions.md#suppressiondestroyresult)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:28](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L28)

___

### get

▸ **get**(`domain`, `type`, `address`): `Promise`\<[`IBounce`](definitions.Interfaces.IBounce.md) \| [`IComplaint`](definitions.Interfaces.IComplaint.md) \| [`IUnsubscribe`](definitions.Interfaces.IUnsubscribe.md) \| [`IWhiteList`](definitions.Interfaces.IWhiteList.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `address` | `string` |

#### Returns

`Promise`\<[`IBounce`](definitions.Interfaces.IBounce.md) \| [`IComplaint`](definitions.Interfaces.IComplaint.md) \| [`IUnsubscribe`](definitions.Interfaces.IUnsubscribe.md) \| [`IWhiteList`](definitions.Interfaces.IWhiteList.md)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L16)

___

### list

▸ **list**(`domain`, `type`, `query?`): `Promise`\<[`SuppressionList`](../modules/definitions.md#suppressionlist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `query?` | [`SuppressionListQuery`](../modules/definitions.md#suppressionlistquery) |

#### Returns

`Promise`\<[`SuppressionList`](../modules/definitions.md#suppressionlist)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/d21489b/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L14)
