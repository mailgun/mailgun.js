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
- [listMembersByAddress](definitions.Interfaces.IMailListsMembers.md#listmembersbyaddress)
- [updateMember](definitions.Interfaces.IMailListsMembers.md#updatemember)
- [upload](definitions.Interfaces.IMailListsMembers.md#upload)

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

[Interfaces/MailingLists/MailingListMembers.ts:25](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L25)

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

[Interfaces/MailingLists/MailingListMembers.ts:28](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L28)

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

[Interfaces/MailingLists/MailingListMembers.ts:35](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L35)

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

[Interfaces/MailingLists/MailingListMembers.ts:24](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L24)

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

[Interfaces/MailingLists/MailingListMembers.ts:16](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L16)

___

### listMembersByAddress

▸ **listMembersByAddress**(`mailListAddress`, `query?`): `Promise`\<[`MailListMembersByAddressResult`](../modules/definitions.md#maillistmembersbyaddressresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailListAddress` | `string` |
| `query?` | [`MailListMembersByAddressQuery`](../modules/definitions.md#maillistmembersbyaddressquery) |

#### Returns

`Promise`\<[`MailListMembersByAddressResult`](../modules/definitions.md#maillistmembersbyaddressresult)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:20](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L20)

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

[Interfaces/MailingLists/MailingListMembers.ts:31](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L31)

___

### upload

▸ **upload**(`mailingListAddress`, `file`, `subscribed?`, `upsert?`): `Promise`\<[`MailListMembersUploadResponse`](../modules/definitions.md#maillistmembersuploadresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mailingListAddress` | `string` |
| `file` | [`MailListMembersUploadData`](../modules/definitions.md#maillistmembersuploaddata) |
| `subscribed?` | `boolean` |
| `upsert?` | `boolean` |

#### Returns

`Promise`\<[`MailListMembersUploadResponse`](../modules/definitions.md#maillistmembersuploadresponse)\>

#### Defined in

[Interfaces/MailingLists/MailingListMembers.ts:36](https://github.com/mailgun/mailgun.js/blob/aa8c929/lib/Interfaces/MailingLists/MailingListMembers.ts#L36)
