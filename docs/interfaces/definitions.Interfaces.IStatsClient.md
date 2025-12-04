[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IStatsClient

# Interface: IStatsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IStatsClient

## Table of contents

### Methods

- [getAccount](definitions.Interfaces.IStatsClient.md#getaccount)
- [getDomain](definitions.Interfaces.IStatsClient.md#getdomain)

## Methods

### getAccount

▸ **getAccount**(`query?`): `Promise`\<[`IStatsContainer`](definitions.Interfaces.IStatsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`StatsQuery`](../modules/definitions.md#statsquery) |

#### Returns

`Promise`\<[`IStatsContainer`](definitions.Interfaces.IStatsContainer.md)\>

#### Defined in

[Interfaces/Stats/StatsClient.ts:6](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/Stats/StatsClient.ts#L6)

___

### getDomain

▸ **getDomain**(`domain`, `query?`): `Promise`\<[`IStatsContainer`](definitions.Interfaces.IStatsContainer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `query?` | [`StatsQuery`](../modules/definitions.md#statsquery) |

#### Returns

`Promise`\<[`IStatsContainer`](definitions.Interfaces.IStatsContainer.md)\>

#### Defined in

[Interfaces/Stats/StatsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/13b7f4f/lib/Interfaces/Stats/StatsClient.ts#L5)
