[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMultipleValidationClient

# Interface: IMultipleValidationClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMultipleValidationClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IMultipleValidationClient.md#create)
- [destroy](definitions.Interfaces.IMultipleValidationClient.md#destroy)
- [get](definitions.Interfaces.IMultipleValidationClient.md#get)
- [list](definitions.Interfaces.IMultipleValidationClient.md#list)

## Methods

### create

▸ **create**(`listId`, `data`): `Promise`\<[`CreatedMultipleValidationJob`](../modules/definitions.md#createdmultiplevalidationjob)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |
| `data` | [`MultipleValidationCreationData`](../modules/definitions.md#multiplevalidationcreationdata) |

#### Returns

`Promise`\<[`CreatedMultipleValidationJob`](../modules/definitions.md#createdmultiplevalidationjob)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:13](https://github.com/mailgun/mailgun.js/blob/e884775/lib/Interfaces/Validations/MultipleValidation.ts#L13)

___

### destroy

▸ **destroy**(`listId`): `Promise`\<[`CanceledMultipleValidationJob`](../modules/definitions.md#canceledmultiplevalidationjob)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |

#### Returns

`Promise`\<[`CanceledMultipleValidationJob`](../modules/definitions.md#canceledmultiplevalidationjob)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:17](https://github.com/mailgun/mailgun.js/blob/e884775/lib/Interfaces/Validations/MultipleValidation.ts#L17)

___

### get

▸ **get**(`listId`): `Promise`\<[`MultipleValidationJobResult`](../modules/definitions.md#multiplevalidationjobresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listId` | `string` |

#### Returns

`Promise`\<[`MultipleValidationJobResult`](../modules/definitions.md#multiplevalidationjobresult)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:12](https://github.com/mailgun/mailgun.js/blob/e884775/lib/Interfaces/Validations/MultipleValidation.ts#L12)

___

### list

▸ **list**(`query?`): `Promise`\<[`MultipleValidationJobsListResult`](../modules/definitions.md#multiplevalidationjobslistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`MultipleValidationJobsListQuery`](../modules/definitions.md#multiplevalidationjobslistquery) |

#### Returns

`Promise`\<[`MultipleValidationJobsListResult`](../modules/definitions.md#multiplevalidationjobslistresult)\>

#### Defined in

[Interfaces/Validations/MultipleValidation.ts:11](https://github.com/mailgun/mailgun.js/blob/e884775/lib/Interfaces/Validations/MultipleValidation.ts#L11)
