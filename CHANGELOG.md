# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0](https://github.com/mailgun/mailgun.js/compare/v5.2.2...v6.0.0) (2022-05-06)


### ⚠ BREAKING CHANGES

* Update ip-pools client responses body shapes. Refactor of request.ts file

### Breaking changes

* Update ip-pools client responses body shapes. Refactor of request.ts file ([0595d62](https://github.com/mailgun/mailgun.js/commits/0595d62eeba66caa98b19b048425385db982d2f0))


### Other changes

* Add tests ([8590989](https://github.com/mailgun/mailgun.js/commits/859098970b21b84a1085cb8cf967db769f28ed0f))

### [5.2.2](https://github.com/mailgun/mailgun.js/compare/v5.2.1...v5.2.2) (2022-04-22)


### Bug Fixes

* Fix parsing of a response body with json data ([d57671f](https://github.com/mailgun/mailgun.js/commits/d57671f0b0af0c24e64684697e3f5d9001fa43cd))
* Update message type. Update readme file ([dd22ec0](https://github.com/mailgun/mailgun.js/commits/dd22ec0588b7ddcf04f2f96f6b109502446f766c))
* Update query parameter type for events get method ([1705a1f](https://github.com/mailgun/mailgun.js/commits/1705a1f34f855d53471548646dda44dbdd0d6338))
* Update response handler to support string response ([6e0f305](https://github.com/mailgun/mailgun.js/commits/6e0f3053e2ffe9dec25dd6fa8cfe19140be626ad))

### [5.2.1](https://github.com/mailgun/mailgun.js/compare/v5.2.0...v5.2.1) (2022-04-14)


### Bug Fixes

* Remove invalid StatsEvent types ([61ac971](https://github.com/mailgun/mailgun.js/commits/61ac97132c384d493f84784a5daae91831bccf75))

## [5.2.0](https://github.com/mailgun/mailgun.js/compare/v5.1.0...v5.2.0) (2022-04-11)


### Features

* Add validation methods to mailing list client ([224790c](https://github.com/mailgun/mailgun.js/commits/224790c4c20466a2203856d703b51e7d4a03a195))

## [5.1.0](https://github.com/mailgun/mailgun.js/compare/v5.0.5...v5.1.0) (2022-04-08)


### Features

* Add verify method to domains ([dd65f7b](https://github.com/mailgun/mailgun.js/commits/dd65f7b50930d4c34f1503ed4b87e0f4b8829b37))

### [5.0.5](https://github.com/mailgun/mailgun.js/compare/v5.0.4...v5.0.5) (2022-03-31)


### Bug Fixes

* Add types to message create method ([5c31628](https://github.com/mailgun/mailgun.js/commits/5c31628f7adbafbfb8fb7283076b64448d10226d))

### [5.0.4](https://github.com/mailgun/mailgun.js/compare/v5.0.3...v5.0.4) (2022-03-29)


### Bug Fixes

* Remove dts-bundle dependency. Add package.json to dist ([94cfd56](https://github.com/mailgun/mailgun.js/commits/94cfd561908317c897d6764e2bbb9fed8b8bd854))
* Update postchangelog command ([08439c8](https://github.com/mailgun/mailgun.js/commits/08439c835ca4f5757cff8d52ec588288892817f7))

### [5.0.3](https://github.com/mailgun/mailgun.js/compare/v5.0.2...v5.0.3) (2022-03-23)


### Bug Fixes

* Remove deprecated url package ([406eb56](https://github.com/mailgun/mailgun.js/commits/406eb56916bd52ca8e3d9b1ffacf419d42db5a86))
* TypeError -> mailgun_js_1.default is not a constructor ([ff91333](https://github.com/mailgun/mailgun.js/commits/ff91333c3f34434c54e993da62a61dc38d6196f4))
* Update DomainsQuery interface for mg.domains.list ([b55eb52](https://github.com/mailgun/mailgun.js/commits/b55eb52c18eb6d81dd3e6fcb991a8b7b5a75a4ab))
* Update get method in Domain templates client interface to have an optional parameter ([12868a8](https://github.com/mailgun/mailgun.js/commits/12868a88e5465d4f3dcb3e3797522c7b4fc552a0))


### Other changes

* Update webpack release config ([240038a](https://github.com/mailgun/mailgun.js/commits/240038a180eb0ad6a704bf24ed01e3c241bef5d5))

### [5.0.2](https://github.com/mailgun/mailgun.js/compare/v5.0.1...v5.0.2) (2022-03-14)


### Bug Fixes

* Make `StatsQuery` interface properties optional, add `StatsEvent` type ([91a2d6a](https://github.com/mailgun/mailgun.js/commits/91a2d6ae22f2c9cb86ee64ccab636d23926bb6d1))

### [5.0.1](https://github.com/mailgun/mailgun.js/compare/v5.0.0...v5.0.1) (2022-02-23)


### Bug Fixes

* Resolve ts strict mode issues ([473f6a2](https://github.com/mailgun/mailgun.js/commits/473f6a2909bfa72e9d779d1233485767eac6f323))

## [5.0.0](https://github.com/mailgun/mailgun.js/compare/v4.2.2...v5.0.0) (2022-02-23)


### ⚠ BREAKING CHANGES

* Concatenation of d.ts files into one. Change import path for types

### Bug Fixes

* Remove redundant log ([49e9e40](https://github.com/mailgun/mailgun.js/commits/49e9e409078a9e520745fb054bcbd89c74b272c5))
* Remove redundant log ([b088f8e](https://github.com/mailgun/mailgun.js/commits/b088f8e7db2f0e4fa086cfbb6143c795abfb6d05))


### Other changes

* Move index.ts file to lib folder ([2592c68](https://github.com/mailgun/mailgun.js/commits/2592c68e8368505b56c29dcf0ff13b338205a045))


### Breaking changes

* Concatenation of d.ts files into one. Change import path for types ([d27db87](https://github.com/mailgun/mailgun.js/commits/d27db87e4f1c08caa68b9719eb17329d94a2a717))

### [4.2.3](https://github.com/mailgun/mailgun.js/compare/v4.2.2...v4.2.3) (2022-02-23)


### Bug Fixes

* Remove redundant log ([b088f8e](https://github.com/mailgun/mailgun.js/commits/b088f8e7db2f0e4fa086cfbb6143c795abfb6d05))

### [4.2.2](https://github.com/mailgun/mailgun.js/compare/v4.2.1...v4.2.2) (2022-02-16)


### Bug Fixes

* Remove reduntant console.log ([3e138dd](https://github.com/mailgun/mailgun.js/commits/3e138ddc5a80dbe9e7a2e424c8095820ebc0fb3f))

### [4.2.1](https://github.com/mailgun/mailgun.js/compare/v4.2.0...v4.2.1) (2022-02-04)


### Bug Fixes

* Remove redundant logs ([27142a0](https://github.com/mailgun/mailgun.js/commits/27142a0f0af6bbb18463a46c50f36dce66f85ad5))


### Other changes

* Update readme ([ea795e6](https://github.com/mailgun/mailgun.js/commits/ea795e62eea82d575907691a570f867b863c0fb9))

## [4.2.0](https://github.com/mailgun/mailgun.js/compare/v4.1.6...v4.2.0) (2022-02-02)


### Features

* Add domains tags functionality ([6cc41e3](https://github.com/mailgun/mailgun.js/commits/6cc41e30f20f70d9dc4a4ec247a600e553d706f4))


### Other changes

* Add tests for new functionality ([e741689](https://github.com/mailgun/mailgun.js/commits/e741689123de9648c35eee4e31f95bb38b86aa78))

### [4.1.6](https://github.com/mailgun/mailgun.js/compare/v4.1.5...v4.1.6) (2022-01-24)


### Bug Fixes

* Update "mocha" to fix "nanoid" dependency ([4e122cf](https://github.com/mailgun/mailgun.js/commits/4e122cffc6d35967bf70380a9003938949a6f442))
* Update "typedoc" version to fix "marked" version ([a84a252](https://github.com/mailgun/mailgun.js/commits/a84a25231e877313c2756cefd89da64d98065196))


### Other changes

* Recompile documentation ([f068746](https://github.com/mailgun/mailgun.js/commits/f0687462e35c237909fbf133a0c563da4a87f6bd))

### [4.1.5](https://github.com/mailgun/mailgun.js/compare/v4.1.4...v4.1.5) (2022-01-24)

### [4.1.4](https://github.com/mailgun/mailgun.js/compare/v4.1.3...v4.1.4) (2021-12-23)


### Bug Fixes

* Add query parameter for the get method in domain templates client ([5aa5cb1](https://github.com/mailgun/mailgun.js/commits/5aa5cb1d5cbc3e23f9e65f8fbf41350dfd7cd435))

### [4.1.3](https://github.com/mailgun/mailgun.js/compare/v4.1.2...v4.1.3) (2021-12-23)

### [4.1.2](https://github.com/mailgun/mailgun.js/compare/v4.1.1...v4.1.2) (2021-12-14)


### Bug Fixes

* Update stats methods to allow an array of events ([#216](https://github.com/mailgun/mailgun.js/issues/216)) ([3b0fc41](https://github.com/mailgun/mailgun.js/commits/3b0fc411a4fa34a27cfd255a914adb17499f3af6))

### [4.1.1](https://github.com/mailgun/mailgun.js/compare/v4.1.0...v4.1.1) (2021-12-13)


### Bug Fixes

* Ip_pools create and update methods fix ([#215](https://github.com/mailgun/mailgun.js/issues/215)) ([eb1830d](https://github.com/mailgun/mailgun.js/commits/eb1830de472737c0b3dc6a4cb8856f73b52d20c2))

## [4.1.0](https://github.com/mailgun/mailgun.js/compare/v4.0.1...v4.1.0) (2021-11-30)


### Features

* Add support of whitelists into suppressions client ([#214](https://github.com/mailgun/mailgun.js/issues/214)) ([1e4fb84](https://github.com/mailgun/mailgun.js/commits/1e4fb84d2528751a9c2dddd1599d2bc0e12b1fdd))

### [4.0.1](https://github.com/mailgun/mailgun.js/compare/v4.0.0...v4.0.1) (2021-11-25)


### Bug Fixes

* Fixes handling of mime messages ([#213](https://github.com/mailgun/mailgun.js/issues/213)) ([ad43490](https://github.com/mailgun/mailgun.js/commits/ad43490a562b95cb77e38cb66f71ef13a4da8331))

## [4.0.0](https://github.com/mailgun/mailgun.js/compare/v3.7.3...v4.0.0) (2021-11-18)


### ⚠ BREAKING CHANGES

* updated signature of unlinkIpPoll method

* feature: Update events client to use v3 of API

* feature: Update webhooks to use v3 of API

* breaking: Update validation to use v4 of API
* removed parse client functionality.
Changed mg.validate.get response
Added multiple email addresses validation

* other: Update domain credentials responses to add status code

* Update endpoints for service methods (#209) ([59f812d](https://github.com/mailgun/mailgun.js/commits/59f812dcf771a5d7ed812424bb5dfaef0f52ff62)), closes [#209](https://github.com/mailgun/mailgun.js/issues/209)

### [3.7.3](https://github.com/mailgun/mailgun.js/compare/v3.7.2...v3.7.3) (2021-11-10)

### [3.7.2](https://github.com/mailgun/mailgun-js/compare/v3.7.1...v3.7.2) (2021-10-28)

### [3.7.1](https://github.com/mailgun/mailgun-js/compare/v3.7.0...v3.7.1) (2021-10-28)


### Bug Fixes

* Fix TS2345 error ([e20b8d7](https://github.com/mailgun/mailgun-js/commits/e20b8d7fd03cc94fd49a1c82b4936d5b115024a3))

## [3.7.0](https://github.com/mailgun/mailgun-js/compare/v3.6.1...v3.7.0) (2021-10-20)


### Features

* Fix linter errors ([126ba03](https://github.com/mailgun/mailgun-js/commits/126ba039bccfbdb257ddde7d17a58790e4cd30a3))

### [3.6.1](https://github.com/mailgun/mailgun-js/compare/v3.6.0...v3.6.1) (2021-10-18)


### Other changes

* Update eslint dependency. Regenerate package-lock file ([0e1fef6](https://github.com/mailgun/mailgun-js/commits/0e1fef683b86e05852a04c6e2f6199db0e39ff22))
* Update mocha to v9 ([768ed1f](https://github.com/mailgun/mailgun-js/commits/768ed1f5896c2bbb7fff59f4fbb68d425ea5a594))

## [3.6.0](https://github.com/mailgun/mailgun-js/compare/v3.5.9...v3.6.0) (2021-10-13)


### Features

* Split the distro for different targets ([1a55085](https://github.com/mailgun/mailgun-js/commits/1a550854765c7cdbb68b13b32c1f1392003abf30))
* Update commitlint rules ([262ce0c](https://github.com/mailgun/mailgun-js/commits/262ce0ccd594bbcd97c9aa9ba5f11ad6ce6fc8c5))

### [3.5.9](https://github.com/mailgun/mailgun-js/compare/v3.5.8...v3.5.9) (2021-09-16)


### Bug Fixes

* Update @commitlint/cli and standard-version dependencies ([fe0233e](https://github.com/mailgun/mailgun-js/commits/fe0233e9afbd546f33b0f1c73930ca9329b5fa38))


### Other changes

* Add templates examples to readme ([f0bf0b8](https://github.com/mailgun/mailgun-js/commits/f0bf0b8cc66b3e7e5899fa913f2f79582f547a37))

### [3.5.8](https://github.com/mailgun/mailgun-js/compare/v3.5.7...v3.5.8) (2021-09-02)


### Features

* Update index.ts export to fix commonJs imports ([246c046](https://github.com/mailgun/mailgun-js/commits/246c046619c593e5f13abe1ff0414fe9c9524cf9))


### Other changes

* Add examples of sending files to the readme ([a922b35](https://github.com/mailgun/mailgun-js/commits/a922b3590a6afd02e15650a2d6acf7b43933bb49))

### [3.5.7](https://github.com/mailgun/mailgun-js/compare/v3.5.6...v3.5.7) (2021-08-16)


### Bug Fixes

* Minification is messing up node-fetch's detection of abort signals ([79564f2](https://github.com/mailgun/mailgun-js/commits/79564f2ea46406e2df4ff911a8e49da44be86260))

### [3.5.6](https://github.com/mailgun/mailgun-js/compare/v3.5.5...v3.5.6) (2021-08-12)


### Bug Fixes

* Blob and buffer attachments not working ([ad69bda](https://github.com/mailgun/mailgun-js/commits/ad69bdaed5627d62571f58b1a79ac870c5086b14))

### [3.5.5](https://github.com/mailgun/mailgun-js/compare/v3.5.4...v3.5.5) (2021-08-09)


### Bug Fixes

* Domain.Creates method returns error ([2068c3d](https://github.com/mailgun/mailgun-js/commits/2068c3d37d54df013d6439c8e0b93f6f553173a7))

### [3.5.4](https://github.com/mailgun/mailgun-js/compare/v3.5.3...v3.5.4) (2021-08-04)


### Bug Fixes

* Error 400 on creating a webhook ([ed1719d](https://github.com/mailgun/mailgun-js/commits/ed1719da3225981c5fe56ae2d48fc4733eb2d7ae))

### [3.5.3](https://github.com/mailgun/mailgun-js/compare/v3.5.2...v3.5.3) (2021-08-03)


### Bug Fixes

* Issue with create and update route methods ([b7cf5ea](https://github.com/mailgun/mailgun-js/commits/b7cf5ea5951e58afce617f7b4b993aeab9f554e9))

### [3.5.2](https://github.com/mailgun/mailgun-js/compare/v3.5.1...v3.5.2) (2021-07-19)


### Other changes

* Add 'standard-version' dependency to auto-generate changelog file ([f3f37f7](https://github.com/mailgun/mailgun-js/commits/f3f37f7e810d259083b13181822e1b5d41f3feeb))
* Add commitlint and husky ([852295b](https://github.com/mailgun/mailgun-js/commits/852295bd2fbfbee8a59c5ddc2b42788213600503))
* Fix auto-changelog ([cae868d](https://github.com/mailgun/mailgun-js/commits/cae868dd638c918de74f54dd76c9d98f6995518f))
* Update readme ([a2069e0](https://github.com/mailgun/mailgun-js/commits/a2069e026af191d70606fdc763cfaa73b59be4c9))
