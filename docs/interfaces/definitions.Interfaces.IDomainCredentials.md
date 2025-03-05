[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainCredentials

# Interface: IDomainCredentials

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainCredentials

## Table of contents

### Methods

- [create](definitions.Interfaces.IDomainCredentials.md#create)
- [destroy](definitions.Interfaces.IDomainCredentials.md#destroy)
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

[Interfaces/Domains/DomainCredentials.ts:11](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/Domains/DomainCredentials.ts#L11)

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

[Interfaces/Domains/DomainCredentials.ts:18](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/Domains/DomainCredentials.ts#L18)

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

[Interfaces/Domains/DomainCredentials.ts:10](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/Domains/DomainCredentials.ts#L10)

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

[Interfaces/Domains/DomainCredentials.ts:13](https://github.com/mailgun/mailgun.js/blob/f0fcce3/lib/Interfaces/Domains/DomainCredentials.ts#L13)
