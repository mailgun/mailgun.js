[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainTemplatesClient

# Interface: IDomainTemplatesClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainTemplatesClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IDomainTemplatesClient.md#create)
- [createVersion](definitions.Interfaces.IDomainTemplatesClient.md#createversion)
- [destroy](definitions.Interfaces.IDomainTemplatesClient.md#destroy)
- [destroyAll](definitions.Interfaces.IDomainTemplatesClient.md#destroyall)
- [destroyVersion](definitions.Interfaces.IDomainTemplatesClient.md#destroyversion)
- [get](definitions.Interfaces.IDomainTemplatesClient.md#get)
- [getVersion](definitions.Interfaces.IDomainTemplatesClient.md#getversion)
- [list](definitions.Interfaces.IDomainTemplatesClient.md#list)
- [listVersions](definitions.Interfaces.IDomainTemplatesClient.md#listversions)
- [update](definitions.Interfaces.IDomainTemplatesClient.md#update)
- [updateVersion](definitions.Interfaces.IDomainTemplatesClient.md#updateversion)

## Methods

### create

▸ **create**(`domain`, `data`): `Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainTemplateData`](../modules/definitions.md#domaintemplatedata) |

#### Returns

`Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:31](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L31)

___

### createVersion

▸ **createVersion**(`domain`, `templateName`, `data`): `Promise`\<[`CreateDomainTemplateVersionResult`](../modules/definitions.md#createdomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `data` | [`DomainTemplateVersionData`](../modules/definitions.md#domaintemplateversiondata) |

#### Returns

`Promise`\<[`CreateDomainTemplateVersionResult`](../modules/definitions.md#createdomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:39](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L39)

___

### destroy

▸ **destroy**(`domain`, `templateName`): `Promise`\<[`UpdateOrDeleteDomainTemplateResult`](../modules/definitions.md#updateordeletedomaintemplateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |

#### Returns

`Promise`\<[`UpdateOrDeleteDomainTemplateResult`](../modules/definitions.md#updateordeletedomaintemplateresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:37](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L37)

___

### destroyAll

▸ **destroyAll**(`domain`): `Promise`\<[`NotificationResult`](../modules/definitions.md#notificationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`NotificationResult`](../modules/definitions.md#notificationresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:38](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L38)

___

### destroyVersion

▸ **destroyVersion**(`domain`, `templateName`, `tag`): `Promise`\<[`MutateDomainTemplateVersionResult`](../modules/definitions.md#mutatedomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`MutateDomainTemplateVersionResult`](../modules/definitions.md#mutatedomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:51](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L51)

___

### get

▸ **get**(`domain`, `templateName`, `query?`): `Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `query?` | [`TemplateQuery`](../modules/definitions.md#templatequery) |

#### Returns

`Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:30](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L30)

___

### getVersion

▸ **getVersion**(`domain`, `templateName`, `tag`): `Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |

#### Returns

`Promise`\<[`IDomainTemplate`](definitions.Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:44](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L44)

___

### list

▸ **list**(`domain`, `query?`): `Promise`\<[`ListDomainTemplatesResult`](../modules/definitions.md#listdomaintemplatesresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query?` | [`DomainTemplatesQuery`](../modules/definitions.md#domaintemplatesquery) |

#### Returns

`Promise`\<[`ListDomainTemplatesResult`](../modules/definitions.md#listdomaintemplatesresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:29](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L29)

___

### listVersions

▸ **listVersions**(`domain`, `templateName`, `query?`): `Promise`\<[`ListDomainTemplateVersionsResult`](../modules/definitions.md#listdomaintemplateversionsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `query?` | [`DomainTemplatesQuery`](../modules/definitions.md#domaintemplatesquery) |

#### Returns

`Promise`\<[`ListDomainTemplateVersionsResult`](../modules/definitions.md#listdomaintemplateversionsresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:55](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L55)

___

### update

▸ **update**(`domain`, `templateName`, `data`): `Promise`\<[`UpdateOrDeleteDomainTemplateResult`](../modules/definitions.md#updateordeletedomaintemplateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `data` | [`DomainTemplateUpdateData`](../modules/definitions.md#domaintemplateupdatedata) |

#### Returns

`Promise`\<[`UpdateOrDeleteDomainTemplateResult`](../modules/definitions.md#updateordeletedomaintemplateresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:32](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L32)

___

### updateVersion

▸ **updateVersion**(`domain`, `templateName`, `tag`, `data`): `Promise`\<[`MutateDomainTemplateVersionResult`](../modules/definitions.md#mutatedomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |
| `data` | [`DomainTemplateUpdateVersionData`](../modules/definitions.md#domaintemplateupdateversiondata) |

#### Returns

`Promise`\<[`MutateDomainTemplateVersionResult`](../modules/definitions.md#mutatedomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:45](https://github.com/mailgun/mailgun.js/blob/460665c/lib/Interfaces/Domains/DomainTemplates.ts#L45)
