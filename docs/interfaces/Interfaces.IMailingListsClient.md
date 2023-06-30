[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IMailingListsClient

# Interface: IMailingListsClient

[Interfaces](../modules/Interfaces.md).IMailingListsClient

## Table of contents

### Properties

- [members](Interfaces.IMailingListsClient.md#members)

### Methods

- [cancelValidation](Interfaces.IMailingListsClient.md#cancelvalidation)
- [create](Interfaces.IMailingListsClient.md#create)
- [destroy](Interfaces.IMailingListsClient.md#destroy)
- [get](Interfaces.IMailingListsClient.md#get)
- [list](Interfaces.IMailingListsClient.md#list)
- [update](Interfaces.IMailingListsClient.md#update)
- [validate](Interfaces.IMailingListsClient.md#validate)
- [validationResult](Interfaces.IMailingListsClient.md#validationresult)

## Properties

### members

• **members**: [`IMailListsMembers`](Interfaces.IMailListsMembers.md)

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L9)

## Methods

### cancelValidation

▸ **cancelValidation**(`mailListAddress`): `Promise`<[`MailingListCancelValidationResult`](../modules.md#mailinglistcancelvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`<[`MailingListCancelValidationResult`](../modules.md#mailinglistcancelvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:17](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L17)

___

### create

▸ **create**(`data`): `Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CreateUpdateList`](../modules.md#createupdatelist) |

#### Returns

`Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:12](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L12)

___

### destroy

▸ **destroy**(`mailListAddress`): `Promise`<[`DestroyedList`](../modules.md#destroyedlist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`<[`DestroyedList`](../modules.md#destroyedlist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:14](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L14)

___

### get

▸ **get**(`mailListAddress`): `Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:11](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L11)

___

### list

▸ **list**(`query?`): `Promise`<[`MailingListResult`](../modules.md#mailinglistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`ListsQuery`](../modules.md#listsquery) |

#### Returns

`Promise`<[`MailingListResult`](../modules.md#mailinglistresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:10](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L10)

___

### update

▸ **update**(`mailListAddress`, `data`): `Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`CreateUpdateList`](../modules.md#createupdatelist) |

#### Returns

`Promise`<[`MailingList`](../modules.md#mailinglist)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:13](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L13)

___

### validate

▸ **validate**(`mailListAddress`): `Promise`<[`StartValidationResult`](../modules.md#startvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`<[`StartValidationResult`](../modules.md#startvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:15](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L15)

___

### validationResult

▸ **validationResult**(`mailListAddress`): `Promise`<[`MailingListValidationResult`](../modules.md#mailinglistvalidationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |

#### Returns

`Promise`<[`MailingListValidationResult`](../modules.md#mailinglistvalidationresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListsClient.ts:16](https://github.com/mailgun/mailgun.js/blob/9d7076d/lib/Interfaces/MailingLists/MailingListsClient.ts#L16)
