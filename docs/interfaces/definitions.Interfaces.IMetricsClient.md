[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IMetricsClient

# Interface: IMetricsClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IMetricsClient

## Table of contents

### Methods

- [getAccount](definitions.Interfaces.IMetricsClient.md#getaccount)
- [getAccountUsage](definitions.Interfaces.IMetricsClient.md#getaccountusage)

## Methods

### getAccount

▸ **getAccount**(`query?`): `Promise`\<[`MetricsResult`](../modules/definitions.md#metricsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`MetricsQuery`](../modules/definitions.md#metricsquery) |

#### Returns

`Promise`\<[`MetricsResult`](../modules/definitions.md#metricsresult)\>

#### Defined in

[Interfaces/Metrics/MetricsClient.ts:4](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Metrics/MetricsClient.ts#L4)

___

### getAccountUsage

▸ **getAccountUsage**(`query?`): `Promise`\<[`MetricsResult`](../modules/definitions.md#metricsresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | [`MetricsQuery`](../modules/definitions.md#metricsquery) |

#### Returns

`Promise`\<[`MetricsResult`](../modules/definitions.md#metricsresult)\>

#### Defined in

[Interfaces/Metrics/MetricsClient.ts:5](https://github.com/mailgun/mailgun.js/blob/703cf80/lib/Interfaces/Metrics/MetricsClient.ts#L5)
