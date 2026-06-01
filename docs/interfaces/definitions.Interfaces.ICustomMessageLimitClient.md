[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ICustomMessageLimitClient

# Interface: ICustomMessageLimitClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ICustomMessageLimitClient

## Table of contents

### Methods

- [destroy](definitions.Interfaces.ICustomMessageLimitClient.md#destroy)
- [enable](definitions.Interfaces.ICustomMessageLimitClient.md#enable)
- [get](definitions.Interfaces.ICustomMessageLimitClient.md#get)
- [set](definitions.Interfaces.ICustomMessageLimitClient.md#set)

## Methods

### destroy

▸ **destroy**(): `Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Returns

`Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Defined in

[Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts:6](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts#L6)

___

### enable

▸ **enable**(): `Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Returns

`Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Defined in

[Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts:7](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts#L7)

___

### get

▸ **get**(): `Promise`\<[`SendingLimitResult`](../modules/definitions.md#sendinglimitresult)\>

#### Returns

`Promise`\<[`SendingLimitResult`](../modules/definitions.md#sendinglimitresult)\>

#### Defined in

[Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts:4](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts#L4)

___

### set

▸ **set**(`limit`): `Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |

#### Returns

`Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Defined in

[Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts:5](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/CustomMessageLimit/ICustomMessageLimitClient.ts#L5)
