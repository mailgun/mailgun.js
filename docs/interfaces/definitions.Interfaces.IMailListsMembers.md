[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMailListsMembers

# Interface: IMailListsMembers

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMailListsMembers

## Table of contents

### Methods

- [createMember](definitions.Interfaces.IMailListsMembers.md#createmember)
- [createMembers](definitions.Interfaces.IMailListsMembers.md#createmembers)
- [destroyMember](definitions.Interfaces.IMailListsMembers.md#destroymember)
- [getMember](definitions.Interfaces.IMailListsMembers.md#getmember)
- [listMembers](definitions.Interfaces.IMailListsMembers.md#listmembers)
- [updateMember](definitions.Interfaces.IMailListsMembers.md#updatemember)

## Methods

### createMember

▸ **createMember**(`mailListAddress`, `data`): `Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`CreateUpdateMailListMembers`](../modules/definitions.md#createupdatemaillistmembers) |

#### Returns

`Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:18](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L18)

___

### createMembers

▸ **createMembers**(`mailListAddress`, `data`): `Promise`\<[`NewMultipleMembersResponse`](../modules/definitions.md#newmultiplemembersresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`MultipleMembersData`](../modules/definitions.md#multiplemembersdata) |

#### Returns

`Promise`\<[`NewMultipleMembersResponse`](../modules/definitions.md#newmultiplemembersresponse)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:21](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L21)

___

### destroyMember

▸ **destroyMember**(`address`, `memberAddress`): `Promise`\<[`DeletedMember`](../modules/definitions.md#deletedmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |

#### Returns

`Promise`\<[`DeletedMember`](../modules/definitions.md#deletedmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:28](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L28)

___

### getMember

▸ **getMember**(`address`, `memberAddress`): `Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |

#### Returns

`Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:17](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L17)

___

### listMembers

▸ **listMembers**(`mailListAddress`, `query?`): `Promise`\<[`MailListMembersResult`](../modules/definitions.md#maillistmembersresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `query?` | [`MailListMembersQuery`](../modules/definitions.md#maillistmembersquery) |

#### Returns

`Promise`\<[`MailListMembersResult`](../modules/definitions.md#maillistmembersresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:12](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L12)

___

### updateMember

▸ **updateMember**(`address`, `memberAddress`, `data`): `Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |
| `data` | [`CreateUpdateMailListMembers`](../modules/definitions.md#createupdatemaillistmembers) |

#### Returns

`Promise`\<[`MailListMember`](../modules/definitions.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:24](https://github.com/mailgun/mailgun.js/blob/de57db7/lib/Interfaces/MailingLists/MailingListMembers.ts#L24)
