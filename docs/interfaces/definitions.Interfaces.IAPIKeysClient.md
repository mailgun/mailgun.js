[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IAPIKeysClient

# Interface: IAPIKeysClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IAPIKeysClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IAPIKeysClient.md#create)
- [destroy](definitions.Interfaces.IAPIKeysClient.md#destroy)
- [list](definitions.Interfaces.IAPIKeysClient.md#list)
- [regeneratePublicKey](definitions.Interfaces.IAPIKeysClient.md#regeneratepublickey)

## Methods

### create

▸ **create**(`data`): `Promise`\<[`APIKeyResultData`](../modules/definitions.md#apikeyresultdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`APIKeyData`](../modules/definitions.md#apikeydata) |

#### Returns

`Promise`\<[`APIKeyResultData`](../modules/definitions.md#apikeyresultdata)\>

#### Defined in

[Interfaces/APIKeys/IAPIKeysClient.ts:12](https://github.com/mailgun/mailgun.js/blob/88aa902/lib/Interfaces/APIKeys/IAPIKeysClient.ts#L12)

___

### destroy

▸ **destroy**(`keyId`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/APIKeys/IAPIKeysClient.ts:13](https://github.com/mailgun/mailgun.js/blob/88aa902/lib/Interfaces/APIKeys/IAPIKeysClient.ts#L13)

___

### list

▸ **list**(`data`): `Promise`\<[`APIKeysResult`](../modules/definitions.md#apikeysresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`APIKeysQuery`](../modules/definitions.md#apikeysquery) |

#### Returns

`Promise`\<[`APIKeysResult`](../modules/definitions.md#apikeysresult)\>

#### Defined in

[Interfaces/APIKeys/IAPIKeysClient.ts:11](https://github.com/mailgun/mailgun.js/blob/88aa902/lib/Interfaces/APIKeys/IAPIKeysClient.ts#L11)

___

### regeneratePublicKey

▸ **regeneratePublicKey**(): `Promise`\<[`RegeneratePublicKeyResult`](../modules/definitions.md#regeneratepublickeyresult)\>

#### Returns

`Promise`\<[`RegeneratePublicKeyResult`](../modules/definitions.md#regeneratepublickeyresult)\>

#### Defined in

[Interfaces/APIKeys/IAPIKeysClient.ts:14](https://github.com/mailgun/mailgun.js/blob/88aa902/lib/Interfaces/APIKeys/IAPIKeysClient.ts#L14)
