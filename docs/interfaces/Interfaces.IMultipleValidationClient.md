[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IMultipleValidationClient

# Interface: IMultipleValidationClient

[Interfaces](../modules/Interfaces.md).IMultipleValidationClient

## Table of contents

### Methods

- [create](Interfaces.IMultipleValidationClient.md#create)
- [destroy](Interfaces.IMultipleValidationClient.md#destroy)
- [get](Interfaces.IMultipleValidationClient.md#get)
- [list](Interfaces.IMultipleValidationClient.md#list)

## Methods

### create

▸ **create**(`listId`, `data`): `Promise`<[`CreatedMultipleValidationJob`](../modules.md#createdmultiplevalidationjob)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |
| `data` | [`MultipleValidationCreationData`](../modules.md#multiplevalidationcreationdata) |

#### Returns

`Promise`<[`CreatedMultipleValidationJob`](../modules.md#createdmultiplevalidationjob)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:13](https://github.com/mailgun/mailgun.js/blob/90086ca/lib/Interfaces/Validations/MultipleValidation.ts#L13)

___

### destroy

▸ **destroy**(`listId`): `Promise`<[`CanceledMultipleValidationJob`](../modules.md#canceledmultiplevalidationjob)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |

#### Returns

`Promise`<[`CanceledMultipleValidationJob`](../modules.md#canceledmultiplevalidationjob)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:17](https://github.com/mailgun/mailgun.js/blob/90086ca/lib/Interfaces/Validations/MultipleValidation.ts#L17)

___

### get

▸ **get**(`listId`): `Promise`<[`MultipleValidationJobResult`](../modules.md#multiplevalidationjobresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |

#### Returns

`Promise`<[`MultipleValidationJobResult`](../modules.md#multiplevalidationjobresult)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:12](https://github.com/mailgun/mailgun.js/blob/90086ca/lib/Interfaces/Validations/MultipleValidation.ts#L12)

___

### list

▸ **list**(`query?`): `Promise`<[`MultipleValidationJobsListResult`](../modules.md#multiplevalidationjobslistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`MultipleValidationJobsListQuery`](../modules.md#multiplevalidationjobslistquery) |

#### Returns

`Promise`<[`MultipleValidationJobsListResult`](../modules.md#multiplevalidationjobslistresult)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:11](https://github.com/mailgun/mailgun.js/blob/90086ca/lib/Interfaces/Validations/MultipleValidation.ts#L11)
