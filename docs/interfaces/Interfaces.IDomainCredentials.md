[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IDomainCredentials

# Interface: IDomainCredentials

[Interfaces](../modules/Interfaces.md).IDomainCredentials

## Table of contents

### Methods

- [create](Interfaces.IDomainCredentials.md#create)
- [destroy](Interfaces.IDomainCredentials.md#destroy)
- [list](Interfaces.IDomainCredentials.md#list)
- [update](Interfaces.IDomainCredentials.md#update)

## Methods

### create

▸ **create**(`domain`, `data`): `Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainCredentials`](../modules.md#domaincredentials) |

#### Returns

`Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:11](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Domains/DomainCredentials.ts#L11)

___

### destroy

▸ **destroy**(`domain`, `credentialsLogin`): `Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `credentialsLogin` | `string` |

#### Returns

`Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:18](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Domains/DomainCredentials.ts#L18)

___

### list

▸ **list**(`domain`, `query`): `Promise`<[`DomainCredentialsList`](../modules.md#domaincredentialslist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query` | [`DomainCredentialsQuery`](../modules.md#domaincredentialsquery) |

#### Returns

`Promise`<[`DomainCredentialsList`](../modules.md#domaincredentialslist)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:10](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Domains/DomainCredentials.ts#L10)

___

### update

▸ **update**(`domain`, `credentialsLogin`, `data`): `Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `credentialsLogin` | `string` |
| `data` | [`UpdateDomainCredentialsData`](../modules.md#updatedomaincredentialsdata) |

#### Returns

`Promise`<[`DomainCredentialsResult`](../modules.md#domaincredentialsresult)\>

#### Defined in

[Interfaces/Domains/DomainCredentials.ts:13](https://github.com/mailgun/mailgun.js/blob/044491a/lib/Interfaces/Domains/DomainCredentials.ts#L13)
