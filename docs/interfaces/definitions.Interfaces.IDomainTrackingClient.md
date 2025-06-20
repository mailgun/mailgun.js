[mailgun.js](../README.md) / [Modules](../modules.md) / [definitions](../modules/definitions.md) / [Interfaces](../modules/definitions.Interfaces.md) / IDomainTrackingClient

# Interface: IDomainTrackingClient

[definitions](../modules/definitions.md).[Interfaces](../modules/definitions.Interfaces.md).IDomainTrackingClient

## Table of contents

### Methods

- [generate](definitions.Interfaces.IDomainTrackingClient.md#generate)
- [get](definitions.Interfaces.IDomainTrackingClient.md#get)
- [getTracking](definitions.Interfaces.IDomainTrackingClient.md#gettracking)
- [regenerate](definitions.Interfaces.IDomainTrackingClient.md#regenerate)
- [updateTracking](definitions.Interfaces.IDomainTrackingClient.md#updatetracking)

## Methods

### generate

▸ **generate**(`domain`): `Promise`\<[`GenerateDomainTrackingCertificateResponse`](../modules/definitions.md#generatedomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`GenerateDomainTrackingCertificateResponse`](../modules/definitions.md#generatedomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:14](https://github.com/mailgun/mailgun.js/blob/20b24c7/lib/Interfaces/Domains/DomainTracking.ts#L14)

___

### get

▸ **get**(`domain`): `Promise`\<[`GetDomainTrackingCertificateResponse`](../modules/definitions.md#getdomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`GetDomainTrackingCertificateResponse`](../modules/definitions.md#getdomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:13](https://github.com/mailgun/mailgun.js/blob/20b24c7/lib/Interfaces/Domains/DomainTracking.ts#L13)

___

### getTracking

▸ **getTracking**(`domain`): `Promise`\<[`DomainTrackingData`](../modules/definitions.md#domaintrackingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`DomainTrackingData`](../modules/definitions.md#domaintrackingdata)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:16](https://github.com/mailgun/mailgun.js/blob/20b24c7/lib/Interfaces/Domains/DomainTracking.ts#L16)

___

### regenerate

▸ **regenerate**(`domain`): `Promise`\<[`RegenerateDomainTrackingCertificateResponse`](../modules/definitions.md#regeneratedomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`\<[`RegenerateDomainTrackingCertificateResponse`](../modules/definitions.md#regeneratedomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:15](https://github.com/mailgun/mailgun.js/blob/20b24c7/lib/Interfaces/Domains/DomainTracking.ts#L15)

___

### updateTracking

▸ **updateTracking**(`domain`, `type`, `data`): `Promise`\<[`UpdatedOpenTracking`](../modules/definitions.md#updatedopentracking)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`OpenTrackingInfo`](../modules/definitions.md#opentrackinginfo) \| [`ClickTrackingInfo`](../modules/definitions.md#clicktrackinginfo) \| [`UnsubscribeTrackingInfo`](../modules/definitions.md#unsubscribetrackinginfo) |

#### Returns

`Promise`\<[`UpdatedOpenTracking`](../modules/definitions.md#updatedopentracking)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:17](https://github.com/mailgun/mailgun.js/blob/20b24c7/lib/Interfaces/Domains/DomainTracking.ts#L17)
