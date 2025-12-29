[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IRoutesClient

# Interface: IRoutesClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IRoutesClient

## Table of contents

### Methods

- [create](definitions.Interfaces.IRoutesClient.md#create)
- [destroy](definitions.Interfaces.IRoutesClient.md#destroy)
- [get](definitions.Interfaces.IRoutesClient.md#get)
- [list](definitions.Interfaces.IRoutesClient.md#list)
- [update](definitions.Interfaces.IRoutesClient.md#update)

## Methods

### create

▸ **create**(`data`): `Promise`\<[`Route`](../modules/definitions.md#route)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CreateUpdateRouteData`](../modules/definitions.md#createupdateroutedata) |

#### Returns

`Promise`\<[`Route`](../modules/definitions.md#route)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:8](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Routes/IRoutesClient.ts#L8)

___

### destroy

▸ **destroy**(`id`): `Promise`\<[`DestroyRouteResponse`](../modules/definitions.md#destroyrouteresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`DestroyRouteResponse`](../modules/definitions.md#destroyrouteresponse)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:10](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Routes/IRoutesClient.ts#L10)

___

### get

▸ **get**(`id`): `Promise`\<[`Route`](../modules/definitions.md#route)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<[`Route`](../modules/definitions.md#route)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:7](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Routes/IRoutesClient.ts#L7)

___

### list

▸ **list**(`query`): `Promise`\<[`Route`](../modules/definitions.md#route)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`RoutesListQuery`](../modules/definitions.md#routeslistquery) |

#### Returns

`Promise`\<[`Route`](../modules/definitions.md#route)[]\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:6](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Routes/IRoutesClient.ts#L6)

___

### update

▸ **update**(`id`, `data`): `Promise`\<[`UpdateRouteResponse`](../modules/definitions.md#updaterouteresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`CreateUpdateRouteData`](../modules/definitions.md#createupdateroutedata) |

#### Returns

`Promise`\<[`UpdateRouteResponse`](../modules/definitions.md#updaterouteresponse)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:9](https://github.com/mailgun/mailgun.js/blob/0b962eb/lib/Interfaces/Routes/IRoutesClient.ts#L9)
