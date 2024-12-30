[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IRoutesClient

# Interface: IRoutesClient

[Interfaces](../modules/Interfaces.md).IRoutesClient

## Table of contents

### Methods

- [create](Interfaces.IRoutesClient.md#create)
- [destroy](Interfaces.IRoutesClient.md#destroy)
- [get](Interfaces.IRoutesClient.md#get)
- [list](Interfaces.IRoutesClient.md#list)
- [update](Interfaces.IRoutesClient.md#update)

## Methods

### create

▸ **create**(`data`): `Promise`<[`Route`](../modules.md#route)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`CreateUpdateRouteData`](../modules.md#createupdateroutedata) |

#### Returns

`Promise`<[`Route`](../modules.md#route)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:8](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Routes/IRoutesClient.ts#L8)

___

### destroy

▸ **destroy**(`id`): `Promise`<[`DestroyRouteResponse`](../modules.md#destroyrouteresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`DestroyRouteResponse`](../modules.md#destroyrouteresponse)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:10](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Routes/IRoutesClient.ts#L10)

___

### get

▸ **get**(`id`): `Promise`<[`Route`](../modules.md#route)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Route`](../modules.md#route)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:7](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Routes/IRoutesClient.ts#L7)

___

### list

▸ **list**(`query`): `Promise`<[`Route`](../modules.md#route)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`RoutesListQuery`](../modules.md#routeslistquery) |

#### Returns

`Promise`<[`Route`](../modules.md#route)[]\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:6](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Routes/IRoutesClient.ts#L6)

___

### update

▸ **update**(`id`, `data`): `Promise`<[`UpdateRouteResponse`](../modules.md#updaterouteresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `data` | [`CreateUpdateRouteData`](../modules.md#createupdateroutedata) |

#### Returns

`Promise`<[`UpdateRouteResponse`](../modules.md#updaterouteresponse)\>

#### Defined in

[Interfaces/Routes/IRoutesClient.ts:9](https://github.com/mailgun/mailgun.js/blob/5c5802a/lib/Interfaces/Routes/IRoutesClient.ts#L9)
