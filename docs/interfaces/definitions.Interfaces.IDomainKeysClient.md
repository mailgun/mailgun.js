[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainKeysClient

# Interface: IDomainKeysClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainKeysClient

## Table of contents

### Methods

- [activate](definitions.Interfaces.IDomainKeysClient.md#activate)
- [create](definitions.Interfaces.IDomainKeysClient.md#create)
- [deactivate](definitions.Interfaces.IDomainKeysClient.md#deactivate)
- [destroy](definitions.Interfaces.IDomainKeysClient.md#destroy)
- [list](definitions.Interfaces.IDomainKeysClient.md#list)
- [listAll](definitions.Interfaces.IDomainKeysClient.md#listall)
- [updateDKIMAuthority](definitions.Interfaces.IDomainKeysClient.md#updatedkimauthority)
- [updateDKIMSelector](definitions.Interfaces.IDomainKeysClient.md#updatedkimselector)

## Methods

### activate

▸ **activate**(`domainName`, `selector`): `Promise`\<[`ActivateDomainKeyResponse`](../modules/definitions.md#activatedomainkeyresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |
| `selector` | `string` |

#### Returns

`Promise`\<[`ActivateDomainKeyResponse`](../modules/definitions.md#activatedomainkeyresponse)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:24](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L24)

___

### create

▸ **create**(`data`): `Promise`\<[`DomainKeyCreateDataResult`](../modules/definitions.md#domainkeycreatedataresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DomainKeyCreateData`](../modules/definitions.md#domainkeycreatedata) |

#### Returns

`Promise`\<[`DomainKeyCreateDataResult`](../modules/definitions.md#domainkeycreatedataresult)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:19](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L19)

___

### deactivate

▸ **deactivate**(`domainName`, `selector`): `Promise`\<[`DeactivateDomainKeyResponse`](../modules/definitions.md#deactivatedomainkeyresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |
| `selector` | `string` |

#### Returns

`Promise`\<[`DeactivateDomainKeyResponse`](../modules/definitions.md#deactivatedomainkeyresponse)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:28](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L28)

___

### destroy

▸ **destroy**(`domain`, `selector`): `Promise`\<[`DeletedDomainKeysResult`](../modules/definitions.md#deleteddomainkeysresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `selector` | `string` |

#### Returns

`Promise`\<[`DeletedDomainKeysResult`](../modules/definitions.md#deleteddomainkeysresult)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:20](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L20)

___

### list

▸ **list**(`domainName`): `Promise`\<[`DomainKeysListResult`](../modules/definitions.md#domainkeyslistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |

#### Returns

`Promise`\<[`DomainKeysListResult`](../modules/definitions.md#domainkeyslistresult)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:17](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L17)

___

### listAll

▸ **listAll**(`query`): `Promise`\<[`DomainKeysListAllResult`](../modules/definitions.md#domainkeyslistallresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`DomainKeysListAllQuery`](../modules/definitions.md#domainkeyslistallquery) |

#### Returns

`Promise`\<[`DomainKeysListAllResult`](../modules/definitions.md#domainkeyslistallresult)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:18](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L18)

___

### updateDKIMAuthority

▸ **updateDKIMAuthority**(`domain`, `data`): `Promise`\<[`UpdatedDKIMAuthority`](../modules/definitions.md#updateddkimauthority)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMAuthorityInfo`](../modules/definitions.md#dkimauthorityinfo) |

#### Returns

`Promise`\<[`UpdatedDKIMAuthority`](../modules/definitions.md#updateddkimauthority)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:29](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L29)

___

### updateDKIMSelector

▸ **updateDKIMSelector**(`domain`, `data`): `Promise`\<[`UpdatedDKIMSelectorResult`](../modules/definitions.md#updateddkimselectorresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DKIMSelectorInfo`](../modules/definitions.md#dkimselectorinfo) |

#### Returns

`Promise`\<[`UpdatedDKIMSelectorResult`](../modules/definitions.md#updateddkimselectorresult)\>

#### Defined in

[Interfaces/Domains/DomainKeys.ts:30](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Domains/DomainKeys.ts#L30)
