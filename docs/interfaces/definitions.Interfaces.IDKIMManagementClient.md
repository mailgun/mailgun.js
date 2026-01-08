[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDKIMManagementClient

# Interface: IDKIMManagementClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDKIMManagementClient

## Table of contents

### Methods

- [rotateImmediately](definitions.Interfaces.IDKIMManagementClient.md#rotateimmediately)
- [update](definitions.Interfaces.IDKIMManagementClient.md#update)

## Methods

### rotateImmediately

▸ **rotateImmediately**(`domainName`): `Promise`\<[`DKIMRotateImmediatelyResult`](../modules/definitions.md#dkimrotateimmediatelyresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |

#### Returns

`Promise`\<[`DKIMRotateImmediatelyResult`](../modules/definitions.md#dkimrotateimmediatelyresult)\>

#### Defined in

[Interfaces/DKIM/IDKIMManagementClient.ts:5](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/DKIM/IDKIMManagementClient.ts#L5)

___

### update

▸ **update**(`domainName`, `data`): `Promise`\<[`DKIMUpdateRotationResult`](../modules/definitions.md#dkimupdaterotationresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |
| `data` | [`DKIMRotationData`](../modules/definitions.md#dkimrotationdata) |

#### Returns

`Promise`\<[`DKIMUpdateRotationResult`](../modules/definitions.md#dkimupdaterotationresult)\>

#### Defined in

[Interfaces/DKIM/IDKIMManagementClient.ts:4](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/DKIM/IDKIMManagementClient.ts#L4)
