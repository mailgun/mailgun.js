[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMailingListsClient

# Interface: IMailingListsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMailingListsClient

## Table of contents

### Properties

- [members](definitions.Interfaces.IMailingListsClient.md#members)

### Methods

- [cancelValidation](definitions.Interfaces.IMailingListsClient.md#cancelvalidation)
- [create](definitions.Interfaces.IMailingListsClient.md#create)
- [destroy](definitions.Interfaces.IMailingListsClient.md#destroy)
- [get](definitions.Interfaces.IMailingListsClient.md#get)
- [list](definitions.Interfaces.IMailingListsClient.md#list)
- [update](definitions.Interfaces.IMailingListsClient.md#update)
- [validate](definitions.Interfaces.IMailingListsClient.md#validate)
- [validationResult](definitions.Interfaces.IMailingListsClient.md#validationresult)

## Properties

### members

• **members**: [`IMailListsMembers`](definitions.Interfaces.IMailListsMembers.md)

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L9)

## Methods

### cancelValidation

▸ **cancelValidation**(`mailListAddress`): `Promise`\<[`MailingListCancelValidationResult`](../modules/definitions.md#mailinglistcancelvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`\<[`MailingListCancelValidationResult`](../modules/definitions.md#mailinglistcancelvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L17)

___

### create

▸ **create**(`data`): `Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CreateUpdateList`](../modules/definitions.md#createupdatelist) |

#### Returns

`Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:12](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L12)

___

### destroy

▸ **destroy**(`mailListAddress`): `Promise`\<[`DestroyedList`](../modules/definitions.md#destroyedlist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`\<[`DestroyedList`](../modules/definitions.md#destroyedlist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L14)

___

### get

▸ **get**(`mailListAddress`): `Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L11)

___

### list

▸ **list**(`query?`): `Promise`\<[`MailingListResult`](../modules/definitions.md#mailinglistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`ListsQuery`](../modules/definitions.md#listsquery) |

#### Returns

`Promise`\<[`MailingListResult`](../modules/definitions.md#mailinglistresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L10)

___

### update

▸ **update**(`mailListAddress`, `data`): `Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`CreateUpdateList`](../modules/definitions.md#createupdatelist) |

#### Returns

`Promise`\<[`MailingList`](../modules/definitions.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L13)

___

### validate

▸ **validate**(`mailListAddress`): `Promise`\<[`StartValidationResult`](../modules/definitions.md#startvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`\<[`StartValidationResult`](../modules/definitions.md#startvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L15)

___

### validationResult

▸ **validationResult**(`mailListAddress`): `Promise`\<[`MailingListValidationResult`](../modules/definitions.md#mailinglistvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`\<[`MailingListValidationResult`](../modules/definitions.md#mailinglistvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/MailingLists/MailingListsClient.ts#L16)
