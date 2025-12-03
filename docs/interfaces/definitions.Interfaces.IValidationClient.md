[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IValidationClient

# Interface: IValidationClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IValidationClient

## Table of contents

### Properties

- [multipleValidation](definitions.Interfaces.IValidationClient.md#multiplevalidation)

### Methods

- [get](definitions.Interfaces.IValidationClient.md#get)

## Properties

### multipleValidation

• **multipleValidation**: [`IMultipleValidationClient`](definitions.Interfaces.IMultipleValidationClient.md)

#### Defined in

[Interfaces/Validations/Validation.ts:6](https://github.com/mailgun/mailgun.js/blob/eaf19a2/lib/Interfaces/Validations/Validation.ts#L6)

## Methods

### get

▸ **get**(`address`): `Promise`\<[`ValidationResult`](../modules/definitions.md#validationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`\<[`ValidationResult`](../modules/definitions.md#validationresult)\>

#### Defined in

[Interfaces/Validations/Validation.ts:7](https://github.com/mailgun/mailgun.js/blob/eaf19a2/lib/Interfaces/Validations/Validation.ts#L7)
