[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IAccountManagementClient

# Interface: IAccountManagementClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IAccountManagementClient

## Table of contents

### Methods

- [addSandboxAuthorizedRecipient](definitions.Interfaces.IAccountManagementClient.md#addsandboxauthorizedrecipient)
- [createWebhookSigningKey](definitions.Interfaces.IAccountManagementClient.md#createwebhooksigningkey)
- [getSandboxAuthorizedRecipients](definitions.Interfaces.IAccountManagementClient.md#getsandboxauthorizedrecipients)
- [getWebhookSigningKey](definitions.Interfaces.IAccountManagementClient.md#getwebhooksigningkey)
- [removeSandboxAuthorizedRecipient](definitions.Interfaces.IAccountManagementClient.md#removesandboxauthorizedrecipient)
- [resendActivationEmail](definitions.Interfaces.IAccountManagementClient.md#resendactivationemail)
- [updateAccountFeature](definitions.Interfaces.IAccountManagementClient.md#updateaccountfeature)
- [updateAccountSettings](definitions.Interfaces.IAccountManagementClient.md#updateaccountsettings)

## Methods

### addSandboxAuthorizedRecipient

▸ **addSandboxAuthorizedRecipient**(`email`): `Promise`\<[`AuthorizedRecipientResult`](../modules/definitions.md#authorizedrecipientresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `email` | `string` |

#### Returns

`Promise`\<[`AuthorizedRecipientResult`](../modules/definitions.md#authorizedrecipientresult)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:16](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L16)

___

### createWebhookSigningKey

▸ **createWebhookSigningKey**(): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:14](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L14)

___

### getSandboxAuthorizedRecipients

▸ **getSandboxAuthorizedRecipients**(): `Promise`\<[`AuthorizedRecipientsResult`](../modules/definitions.md#authorizedrecipientsresult)\>

#### Returns

`Promise`\<[`AuthorizedRecipientsResult`](../modules/definitions.md#authorizedrecipientsresult)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:15](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L15)

___

### getWebhookSigningKey

▸ **getWebhookSigningKey**(): `Promise`\<`Omit`\<[`ResponseWithSigninKey`](../modules/definitions.md#responsewithsigninkey), ``"message"``\>\>

#### Returns

`Promise`\<`Omit`\<[`ResponseWithSigninKey`](../modules/definitions.md#responsewithsigninkey), ``"message"``\>\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:13](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L13)

___

### removeSandboxAuthorizedRecipient

▸ **removeSandboxAuthorizedRecipient**(`email`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `email` | `string` |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:17](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L17)

___

### resendActivationEmail

▸ **resendActivationEmail**(): `Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Returns

`Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:18](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L18)

___

### updateAccountFeature

▸ **updateAccountFeature**(`data`): `Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`AccountFeatureInput`](../modules/definitions.md#accountfeatureinput) |

#### Returns

`Promise`\<[`SuccessResult`](../modules/definitions.md#successresult)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:19](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L19)

___

### updateAccountSettings

▸ **updateAccountSettings**(`settingsObj`): `Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `settingsObj` | [`AccountSettings`](../modules/definitions.md#accountsettings) |

#### Returns

`Promise`\<[`MessageResponseWithStatus`](../modules/definitions.md#messageresponsewithstatus)\>

#### Defined in

[Interfaces/AccountManagement/IAccountManagementClient.ts:12](https://github.com/mailgun/mailgun.js/blob/e14cb60/lib/Interfaces/AccountManagement/IAccountManagementClient.ts#L12)
