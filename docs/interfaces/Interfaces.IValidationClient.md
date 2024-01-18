[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IValidationClient

# Interface: IValidationClient

[Interfaces](../modules/Interfaces.md).IValidationClient

## Table of contents

### Properties

- [multipleValidation](Interfaces.IValidationClient.md#multiplevalidation)

### Methods

- [get](Interfaces.IValidationClient.md#get)

## Properties

### multipleValidation

• **multipleValidation**: [`IMultipleValidationClient`](Interfaces.IMultipleValidationClient.md)

#### Defined in

[Interfaces/Validations/Validation.ts:6](https://github.com/mailgun/mailgun.js/blob/c2f73b1/lib/Interfaces/Validations/Validation.ts#L6)

## Methods

### get

▸ **get**(`address`): `Promise`<[`ValidationResult`](../modules.md#validationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`ValidationResult`](../modules.md#validationresult)\>

#### Defined in

[Interfaces/Validations/Validation.ts:7](https://github.com/mailgun/mailgun.js/blob/c2f73b1/lib/Interfaces/Validations/Validation.ts#L7)
