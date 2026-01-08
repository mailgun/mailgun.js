[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / ITagsClient

# Interface: ITagsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).ITagsClient

## Table of contents

### Methods

- [destroy](definitions.Interfaces.ITagsClient.md#destroy)
- [limits](definitions.Interfaces.ITagsClient.md#limits)
- [list](definitions.Interfaces.ITagsClient.md#list)
- [update](definitions.Interfaces.ITagsClient.md#update)

## Methods

### destroy

▸ **destroy**(`tag`): `Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` |

#### Returns

`Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Defined in

[Interfaces/Tags/ITagsClient.ts:9](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Tags/ITagsClient.ts#L9)

___

### limits

▸ **limits**(): `Promise`\<[`TagLimitsResult`](../modules/definitions.md#taglimitsresult)\>

#### Returns

`Promise`\<[`TagLimitsResult`](../modules/definitions.md#taglimitsresult)\>

#### Defined in

[Interfaces/Tags/ITagsClient.ts:7](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Tags/ITagsClient.ts#L7)

___

### list

▸ **list**(`query`): `Promise`\<[`TagsListResult`](../modules/definitions.md#tagslistresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`TagsListQuery`](../modules/definitions.md#tagslistquery) |

#### Returns

`Promise`\<[`TagsListResult`](../modules/definitions.md#tagslistresult)\>

#### Defined in

[Interfaces/Tags/ITagsClient.ts:6](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Tags/ITagsClient.ts#L6)

___

### update

▸ **update**(`tag`, `description`): `Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` |
| `description` | `string` |

#### Returns

`Promise`\<[`MessageResponse`](../modules/definitions.md#messageresponse)\>

#### Defined in

[Interfaces/Tags/ITagsClient.ts:8](https://github.com/mailgun/mailgun.js/blob/bb42d24/lib/Interfaces/Tags/ITagsClient.ts#L8)
