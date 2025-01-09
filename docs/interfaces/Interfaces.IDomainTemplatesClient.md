[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IDomainTemplatesClient

# Interface: IDomainTemplatesClient

[Interfaces](../modules/Interfaces.md).IDomainTemplatesClient

## Table of contents

### Methods

- [create](Interfaces.IDomainTemplatesClient.md#create)
- [createVersion](Interfaces.IDomainTemplatesClient.md#createversion)
- [destroy](Interfaces.IDomainTemplatesClient.md#destroy)
- [destroyAll](Interfaces.IDomainTemplatesClient.md#destroyall)
- [destroyVersion](Interfaces.IDomainTemplatesClient.md#destroyversion)
- [get](Interfaces.IDomainTemplatesClient.md#get)
- [getVersion](Interfaces.IDomainTemplatesClient.md#getversion)
- [list](Interfaces.IDomainTemplatesClient.md#list)
- [listVersions](Interfaces.IDomainTemplatesClient.md#listversions)
- [update](Interfaces.IDomainTemplatesClient.md#update)
- [updateVersion](Interfaces.IDomainTemplatesClient.md#updateversion)

## Methods

### create

▸ **create**(`domain`, `data`): `Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainTemplateData`](../modules.md#domaintemplatedata) |

#### Returns

`Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:31](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L31)

___

### createVersion

▸ **createVersion**(`domain`, `templateName`, `data`): `Promise`<[`CreateDomainTemplateVersionResult`](../modules.md#createdomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `data` | [`DomainTemplateVersionData`](../modules.md#domaintemplateversiondata) |

#### Returns

`Promise`<[`CreateDomainTemplateVersionResult`](../modules.md#createdomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:39](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L39)

___

### destroy

▸ **destroy**(`domain`, `templateName`): `Promise`<[`UpdateOrDeleteDomainTemplateResult`](../modules.md#updateordeletedomaintemplateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |

#### Returns

`Promise`<[`UpdateOrDeleteDomainTemplateResult`](../modules.md#updateordeletedomaintemplateresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:37](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L37)

___

### destroyAll

▸ **destroyAll**(`domain`): `Promise`<[`NotificationResult`](../modules.md#notificationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`NotificationResult`](../modules.md#notificationresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:38](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L38)

___

### destroyVersion

▸ **destroyVersion**(`domain`, `templateName`, `tag`): `Promise`<[`MutateDomainTemplateVersionResult`](../modules.md#mutatedomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`MutateDomainTemplateVersionResult`](../modules.md#mutatedomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:51](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L51)

___

### get

▸ **get**(`domain`, `templateName`, `query?`): `Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `query?` | [`TemplateQuery`](../modules.md#templatequery) |

#### Returns

`Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:30](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L30)

___

### getVersion

▸ **getVersion**(`domain`, `templateName`, `tag`): `Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |

#### Returns

`Promise`<[`IDomainTemplate`](Interfaces.IDomainTemplate.md)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:44](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L44)

___

### list

▸ **list**(`domain`, `query?`): `Promise`<[`ListDomainTemplatesResult`](../modules.md#listdomaintemplatesresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query?` | [`DomainTemplatesQuery`](../modules.md#domaintemplatesquery) |

#### Returns

`Promise`<[`ListDomainTemplatesResult`](../modules.md#listdomaintemplatesresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:29](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L29)

___

### listVersions

▸ **listVersions**(`domain`, `templateName`, `query?`): `Promise`<[`ListDomainTemplateVersionsResult`](../modules.md#listdomaintemplateversionsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `query?` | [`DomainTemplatesQuery`](../modules.md#domaintemplatesquery) |

#### Returns

`Promise`<[`ListDomainTemplateVersionsResult`](../modules.md#listdomaintemplateversionsresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:55](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L55)

___

### update

▸ **update**(`domain`, `templateName`, `data`): `Promise`<[`UpdateOrDeleteDomainTemplateResult`](../modules.md#updateordeletedomaintemplateresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `data` | [`DomainTemplateUpdateData`](../modules.md#domaintemplateupdatedata) |

#### Returns

`Promise`<[`UpdateOrDeleteDomainTemplateResult`](../modules.md#updateordeletedomaintemplateresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:32](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L32)

___

### updateVersion

▸ **updateVersion**(`domain`, `templateName`, `tag`, `data`): `Promise`<[`MutateDomainTemplateVersionResult`](../modules.md#mutatedomaintemplateversionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `templateName` | `string` |
| `tag` | `string` |
| `data` | [`DomainTemplateUpdateVersionData`](../modules.md#domaintemplateupdateversiondata) |

#### Returns

`Promise`<[`MutateDomainTemplateVersionResult`](../modules.md#mutatedomaintemplateversionresult)\>

#### Defined in

[Interfaces/Domains/DomainTemplates.ts:45](https://github.com/mailgun/mailgun.js/blob/009065a/lib/Interfaces/Domains/DomainTemplates.ts#L45)
