[mailgun.js](../README.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / IDomainTrackingClient

# Interface: IDomainTrackingClient

[Interfaces](../modules/Interfaces.md).IDomainTrackingClient

## Table of contents

### Methods

- [generate](Interfaces.IDomainTrackingClient.md#generate)
- [get](Interfaces.IDomainTrackingClient.md#get)
- [getTracking](Interfaces.IDomainTrackingClient.md#gettracking)
- [regenerate](Interfaces.IDomainTrackingClient.md#regenerate)
- [updateTracking](Interfaces.IDomainTrackingClient.md#updatetracking)

## Methods

### generate

▸ **generate**(`domain`): `Promise`<[`GenerateDomainTrackingCertificateResponse`](../modules.md#generatedomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`GenerateDomainTrackingCertificateResponse`](../modules.md#generatedomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:14](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/Domains/DomainTracking.ts#L14)

___

### get

▸ **get**(`domain`): `Promise`<[`GetDomainTrackingCertificateResponse`](../modules.md#getdomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`GetDomainTrackingCertificateResponse`](../modules.md#getdomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:13](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/Domains/DomainTracking.ts#L13)

___

### getTracking

▸ **getTracking**(`domain`): `Promise`<[`DomainTrackingData`](../modules.md#domaintrackingdata)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`DomainTrackingData`](../modules.md#domaintrackingdata)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:16](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/Domains/DomainTracking.ts#L16)

___

### regenerate

▸ **regenerate**(`domain`): `Promise`<[`RegenerateDomainTrackingCertificateResponse`](../modules.md#regeneratedomaintrackingcertificateresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

#### Returns

`Promise`<[`RegenerateDomainTrackingCertificateResponse`](../modules.md#regeneratedomaintrackingcertificateresponse)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:15](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/Domains/DomainTracking.ts#L15)

___

### updateTracking

▸ **updateTracking**(`domain`, `type`, `data`): `Promise`<[`UpdatedOpenTracking`](../modules.md#updatedopentracking)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `type` | `string` |
| `data` | [`OpenTrackingInfo`](../modules.md#opentrackinginfo) \| [`ClickTrackingInfo`](../modules.md#clicktrackinginfo) \| [`UnsubscribeTrackingInfo`](../modules.md#unsubscribetrackinginfo) |

#### Returns

`Promise`<[`UpdatedOpenTracking`](../modules.md#updatedopentracking)\>

#### Defined in

[Interfaces/Domains/DomainTracking.ts:17](https://github.com/mailgun/mailgun.js/blob/ef6853f/lib/Interfaces/Domains/DomainTracking.ts#L17)
