[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IMailListsMembers

# Interface: IMailListsMembers

[Interfaces](../modules/Interfaces.md).IMailListsMembers

## Table of contents

### Methods

- [createMember](Interfaces.IMailListsMembers.md#createmember)
- [createMembers](Interfaces.IMailListsMembers.md#createmembers)
- [destroyMember](Interfaces.IMailListsMembers.md#destroymember)
- [getMember](Interfaces.IMailListsMembers.md#getmember)
- [listMembers](Interfaces.IMailListsMembers.md#listmembers)
- [updateMember](Interfaces.IMailListsMembers.md#updatemember)

## Methods

### createMember

▸ **createMember**(`mailListAddress`, `data`): `Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`CreateUpdateMailListMembers`](../modules.md#createupdatemaillistmembers) |

#### Returns

`Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:18](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L18)

___

### createMembers

▸ **createMembers**(`mailListAddress`, `data`): `Promise`<[`NewMultipleMembersResponse`](../modules.md#newmultiplemembersresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `data` | [`MultipleMembersData`](../modules.md#multiplemembersdata) |

#### Returns

`Promise`<[`NewMultipleMembersResponse`](../modules.md#newmultiplemembersresponse)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:21](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L21)

___

### destroyMember

▸ **destroyMember**(`address`, `memberAddress`): `Promise`<[`DeletedMember`](../modules.md#deletedmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |

#### Returns

`Promise`<[`DeletedMember`](../modules.md#deletedmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:28](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L28)

___

### getMember

▸ **getMember**(`address`, `memberAddress`): `Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |

#### Returns

`Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:17](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L17)

___

### listMembers

▸ **listMembers**(`mailListAddress`, `query?`): `Promise`<[`MailListMembersResult`](../modules.md#maillistmembersresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `query?` | [`MailListMembersQuery`](../modules.md#maillistmembersquery) |

#### Returns

`Promise`<[`MailListMembersResult`](../modules.md#maillistmembersresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:12](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L12)

___

### updateMember

▸ **updateMember**(`address`, `memberAddress`, `data`): `Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `memberAddress` | `string` |
| `data` | [`CreateUpdateMailListMembers`](../modules.md#createupdatemaillistmembers) |

#### Returns

`Promise`<[`MailListMember`](../modules.md#maillistmember)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:24](https://github.com/mailgun/mailgun.js/blob/9c77dbb/lib/Interfaces/MailingLists/MailingListMembers.ts#L24)
