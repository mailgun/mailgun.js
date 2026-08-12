[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainCredentials

# Interface: IDomainCredentials

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainCredentials

## Table of contents

### Methods

- [create](definitions.Interfaces.IDomainCredentials.md#create)
- [destroy](definitions.Interfaces.IDomainCredentials.md#destroy)
- [destroyAll](definitions.Interfaces.IDomainCredentials.md#destroyall)
- [list](definitions.Interfaces.IDomainCredentials.md#list)
- [update](definitions.Interfaces.IDomainCredentials.md#update)

## Methods

### create

▸ **create**(`domain`, `data`): `Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainCredentials`](../modules/definitions.md#domaincredentials) |

#### Returns

`Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:12](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/Domains/DomainCredentials.ts#L12)

___

### destroy

▸ **destroy**(`domain`, `credentialsLogin`): `Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `credentialsLogin` | `string` |

#### Returns

`Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:19](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/Domains/DomainCredentials.ts#L19)

___

### destroyAll

▸ **destroyAll**(`domain`): `Promise`\<[`DeletedAllDomainCredentialsResult`](../modules/definitions.md#deletedalldomaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`DeletedAllDomainCredentialsResult`](../modules/definitions.md#deletedalldomaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:23](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/Domains/DomainCredentials.ts#L23)

___

### list

▸ **list**(`domain`, `query`): `Promise`\<[`DomainCredentialsList`](../modules/definitions.md#domaincredentialslist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query` | [`DomainCredentialsQuery`](../modules/definitions.md#domaincredentialsquery) |

#### Returns

`Promise`\<[`DomainCredentialsList`](../modules/definitions.md#domaincredentialslist)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:11](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/Domains/DomainCredentials.ts#L11)

___

### update

▸ **update**(`domain`, `credentialsLogin`, `data`): `Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `credentialsLogin` | `string` |
| `data` | [`UpdateDomainCredentialsData`](../modules/definitions.md#updatedomaincredentialsdata) |

#### Returns

`Promise`\<[`DomainCredentialsResult`](../modules/definitions.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:14](https://github.com/mailgun/mailgun.js/blob/5493117/lib/Interfaces/Domains/DomainCredentials.ts#L14)
