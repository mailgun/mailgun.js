[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ISuppressionClient

# Interface: ISuppressionClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ISuppressionClient

## Table of contents

### Methods

- [create](definitions.Interfaces.ISuppressionClient.md#create)
- [destroy](definitions.Interfaces.ISuppressionClient.md#destroy)
- [destroyAll](definitions.Interfaces.ISuppressionClient.md#destroyall)
- [get](definitions.Interfaces.ISuppressionClient.md#get)
- [list](definitions.Interfaces.ISuppressionClient.md#list)
- [upload](definitions.Interfaces.ISuppressionClient.md#upload)

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

[Interfaces/Suppressions/ISuppressionsClient.ts:26](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L26)

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

[Interfaces/Suppressions/ISuppressionsClient.ts:32](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L32)

___

### destroyAll

▸ **destroyAll**(`domain`, `type`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | [`SuppressionModelNames`](../modules/definitions.md#suppressionmodelnames) |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:44](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L44)

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

[Interfaces/Suppressions/ISuppressionsClient.ts:20](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L20)

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

[Interfaces/Suppressions/ISuppressionsClient.ts:18](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L18)

___

### upload

▸ **upload**(`domain`, `type`, `file`): `Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | [`SuppressionModelNames`](../modules/definitions.md#suppressionmodelnames) |
| `file` | [`SuppressionUploadData`](../modules/definitions.md#suppressionuploaddata) |

#### Returns

`Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Defined in

[Interfaces/Suppressions/ISuppressionsClient.ts:38](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/Suppressions/ISuppressionsClient.ts#L38)
