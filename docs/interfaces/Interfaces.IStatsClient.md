[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IStatsClient

# Interface: IStatsClient

[Interfaces](../modules/Interfaces.md).IStatsClient

## Table of contents

### Methods

- [getAccount](Interfaces.IStatsClient.md#getaccount)
- [getDomain](Interfaces.IStatsClient.md#getdomain)

## Methods

### getAccount

▸ **getAccount**(`query?`): `Promise`<[`IStatsContainer`](Interfaces.IStatsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`StatsQuery`](../modules.md#statsquery) |

#### Returns

`Promise`<[`IStatsContainer`](Interfaces.IStatsContainer.md)\>

#### Defined in

[Interfaces/Stats/StatsClient.ts:6](https://github.com/mailgun/mailgun.js/blob/c7e8515/lib/Interfaces/Stats/StatsClient.ts#L6)

___

### getDomain

▸ **getDomain**(`domain`, `query?`): `Promise`<[`IStatsContainer`](Interfaces.IStatsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query?` | [`StatsQuery`](../modules.md#statsquery) |

#### Returns

`Promise`<[`IStatsContainer`](Interfaces.IStatsContainer.md)\>

#### Defined in

[Interfaces/Stats/StatsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/c7e8515/lib/Interfaces/Stats/StatsClient.ts#L5)
