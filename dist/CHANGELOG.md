# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [9.3.0](https://github.com/mailgun/mailgun.js/compare/v9.2.1...v9.3.0) (2023-09-18)


### Features

* Update webhook.update method to allow multiple URLs ([633bce9](https://github.com/mailgun/mailgun.js/commits/633bce9f2a7a704972251af16aeafdc73d5cbbde))


### Other changes

* Update docs ([3a3b8d8](https://github.com/mailgun/mailgun.js/commits/3a3b8d8a9ced9f6a2d63ce42010980d20cfaf815))

### [9.2.1](https://github.com/mailgun/mailgun.js/compare/v9.2.0...v9.2.1) (2023-08-16)


### Bug Fixes

* Node.js native FormData issue ([f00dd57](https://github.com/mailgun/mailgun.js/commits/f00dd57137334e663b01dc833deefad2f36b23f6))


### Other changes

* Update readme for events ([83996c9](https://github.com/mailgun/mailgun.js/commits/83996c95fce7d8ecc3f2c5b8fcd0241500a7b1a5))

## [9.2.0](https://github.com/mailgun/mailgun.js/compare/v9.1.2...v9.2.0) (2023-07-07)


### Features

* Add skiped domain update method ([cef4e3b](https://github.com/mailgun/mailgun.js/commits/cef4e3ba97e0003f27a5ef9a5d905b942838cb9d))


### Other changes

* Move type from class file ([24c6002](https://github.com/mailgun/mailgun.js/commits/24c6002b64e0377fef8cdaf49591f3fb925a5821))

### [9.1.2](https://github.com/mailgun/mailgun.js/compare/v9.1.1...v9.1.2) (2023-06-30)


### Bug Fixes

* Added priority? to DNSRecord type ([65a9d02](https://github.com/mailgun/mailgun.js/commits/65a9d02e81dc2c78a64095c073ab69530081577d))
* Dependencies update ([60478d0](https://github.com/mailgun/mailgun.js/commits/60478d0b5075defaf032ac91dd6e21ea9dba3b1b))


### Other changes

* Update build ([bdc3dc5](https://github.com/mailgun/mailgun.js/commits/bdc3dc5afe7cca544e02238aa31d5e07e10ad5d8))

### [9.1.1](https://github.com/mailgun/mailgun.js/compare/v9.1.0...v9.1.1) (2023-06-23)


### Bug Fixes

* Creating one unsubscribe with the tag property ([6f27372](https://github.com/mailgun/mailgun.js/commits/6f2737229d14977093e4f8076c053be77002322c))
* Replace models map by object to remove eslint warning ([1faada1](https://github.com/mailgun/mailgun.js/commits/1faada106b50bb05ddac0b5af1b139264059a12b))


### Other changes

* Readme update ([3ccc575](https://github.com/mailgun/mailgun.js/commits/3ccc57535ac6d4eda46b12b5cad398c4eb11ff9d))

## [9.1.0](https://github.com/mailgun/mailgun.js/compare/v9.0.1...v9.1.0) (2023-06-16)


### Features

* Add tags property for unsubscribe data type ([3a02a50](https://github.com/mailgun/mailgun.js/commits/3a02a50bc824ed2393075a262399f3e660cf771c))


### Other changes

* Add issues template ([c7e8515](https://github.com/mailgun/mailgun.js/commits/c7e85152f7cc725a15612385c090a4f794461a78))
* Add to release commit TS docs files ([7c7376e](https://github.com/mailgun/mailgun.js/commits/7c7376e1fd3802e79c5259b74418aa8063e4e2f7))
* Freshest docs ([5258cda](https://github.com/mailgun/mailgun.js/commits/5258cda2b1864e4f71681db1549df8b90daa8ca6))
* Rename issue template file ([4f7857d](https://github.com/mailgun/mailgun.js/commits/4f7857db8b0e331c89d2e6e3a19aa47c87bf3e39))
* Update readme with a link to docs ([371a46f](https://github.com/mailgun/mailgun.js/commits/371a46f8c20d5418d6389df769eabd4e957f7732))
* Update typedoc to use markdown ([393c6f1](https://github.com/mailgun/mailgun.js/commits/393c6f186cd2416c0e2802aa50848bf6556a1a15))

### [9.0.1](https://github.com/mailgun/mailgun.js/compare/v9.0.0...v9.0.1) (2023-06-06)


### Bug Fixes

* Add public properties to IDomainsClient interface ([f4ca325](https://github.com/mailgun/mailgun.js/commits/f4ca3253c9042cd67739024cc6096996dbdcd026))
* Add public properties to IMailListsMembers interface ([0782c8d](https://github.com/mailgun/mailgun.js/commits/0782c8d3d04b520cce6eaec51231089ba44864a1))
* Add public properties to IMultipleValidationClient interface ([f1fd614](https://github.com/mailgun/mailgun.js/commits/f1fd6142c5ccbf5b772ce91d51d165fcb867af54))


### Other changes

* Add tests for IDomainsClient public props ([8f1b81e](https://github.com/mailgun/mailgun.js/commits/8f1b81e663d4c26f16e22b3073045abf98061f14))

## [9.0.0](https://github.com/mailgun/mailgun.js/compare/v8.2.2...v9.0.0) (2023-05-29)


### ⚠ BREAKING CHANGES

* Types available as a named import from the package
* Add missing types and interfaces
* Move StatsClient and StatsContainer classes to different files
* Move rest of the types to appropriate folders
* Move common types to another folder
* Move Validations types to another folder
* Move Suppressions types to another folder
* Move MailingLists types to another folder
* Move domains types to another folder
* WebhookClient class renamed to WebhooksClient
* Client class renamed to MailgunClient
* Options interfase renamed to MailgunClientOptions

### Features

* Add missing types and interfaces ([ea4f289](https://github.com/mailgun/mailgun.js/commits/ea4f2898c93504354c57eb26bf6264dbfdec80e2))
* Add types,enums, and interfaces to default export from SDK ([6ccc043](https://github.com/mailgun/mailgun.js/commits/6ccc0433569cb55de48125a527cf6d527f329c6f))
* TS version update ([8523c11](https://github.com/mailgun/mailgun.js/commits/8523c118e2320e13a2d4ce430bbef1d9756dc082))
* Types available as a named import from the package ([adf93c8](https://github.com/mailgun/mailgun.js/commits/adf93c81391f2224a11432739c0caa75c6c7079b))


### Breaking changes

* Group enums to own folder ([306e19a](https://github.com/mailgun/mailgun.js/commits/306e19a56c97ce03c9b8af5fc6363a0726864c61))
* Group related Classes and Interfaces to folders ([8d785fa](https://github.com/mailgun/mailgun.js/commits/8d785fa1fd6232dca4651b8f38666192369961c3))
* Move common types to another folder ([d31b802](https://github.com/mailgun/mailgun.js/commits/d31b8026799d5d2d66a940cccb9973e6e78e6681))
* Move domains types to another folder ([6f5b479](https://github.com/mailgun/mailgun.js/commits/6f5b479d8e03c3e2ba3b40dc6f31982e20f87a47))
* Move MailingLists types to another folder ([416e7be](https://github.com/mailgun/mailgun.js/commits/416e7be1860e2ce7883fadcbf7d124be23b3bf5b))
* Move rest of the types to appropriate folders ([4c0c81a](https://github.com/mailgun/mailgun.js/commits/4c0c81a8da036f438cb549d741b6322e8653367a))
* Move StatsClient and StatsContainer classes to different files ([bfc25cf](https://github.com/mailgun/mailgun.js/commits/bfc25cf9ff926657b73e8dc7c7593f67ec9e2dc7))
* Move Suppressions types to another folder ([efd2e92](https://github.com/mailgun/mailgun.js/commits/efd2e929b82200bfca7407e424069462a543b7da))
* Move Validations types to another folder ([a64112a](https://github.com/mailgun/mailgun.js/commits/a64112aa32c8f03b8dd8e467f5a87e9e1a2d4b49))


### Other changes

* Add typedock generation step to release ([d7afc0e](https://github.com/mailgun/mailgun.js/commits/d7afc0ea06db5b38f228f1beb32aeeee1b925dd5))
* Decrease number of eslint warnings ([c372344](https://github.com/mailgun/mailgun.js/commits/c37234443a4a853ac5a668a32ddd140d8bc3d6a9))
* Merge branch 'master' into expose-types ([53f6435](https://github.com/mailgun/mailgun.js/commits/53f643512686619506cebf8fe59bb546306d6263))
* Move suppressions classes to different files ([2b692de](https://github.com/mailgun/mailgun.js/commits/2b692deb2b7acb11cb3ce189342d751844d441b5))
* Rename suppressions.ts file to SuppressionClient.ts ([b3ba0ac](https://github.com/mailgun/mailgun.js/commits/b3ba0acc90111d953f2278b4c0d49729cd649c8b))
* Update interfaces folder name to be Interfaces in dist ([0b22bcd](https://github.com/mailgun/mailgun.js/commits/0b22bcd6be02b111a1030df2b0d3c0ae6d491e3c))
* Update readme one more time ([0f5a98b](https://github.com/mailgun/mailgun.js/commits/0f5a98b507d2dca3668d2efda05c0aa7d42a1043))
* Update registry for npm ([3175093](https://github.com/mailgun/mailgun.js/commits/3175093de9501eb5976387a31c237fdd349da1fd))
* Update ts-loader and ts-node ([d6b0ba0](https://github.com/mailgun/mailgun.js/commits/d6b0ba0b96a9346a7f7347c0b2ddb40bee16a608))
* Update Typedoc documentation ([6ae20c2](https://github.com/mailgun/mailgun.js/commits/6ae20c2b82968ac89c4bd01e1a8c45c122c5445e))

### [8.2.2](https://github.com/mailgun/mailgun.js/compare/v8.2.1...v8.2.2) (2023-05-26)


### Bug Fixes

* **deps-dev:** bump webpack from 5.70.0 to 5.76.0 ([3b28232](https://github.com/mailgun/mailgun.js/commits/3b2823281e5ff59f1d04e55bf4f37da6bc691df7))
* **deps:** bump yaml and @commitlint/cli ([c6d1538](https://github.com/mailgun/mailgun.js/commits/c6d153874e306a8b4209b544005918e5307ce332))

### [8.2.1](https://github.com/mailgun/mailgun.js/compare/v8.2.0...v8.2.1) (2023-03-06)


### Bug Fixes

* **#342:** Items Can be Missing When Paging ([95ca758](https://github.com/mailgun/mailgun.js/commits/95ca7587eba6067a278179f7f015366c97a4f757)), closes [#342](https://github.com/mailgun/mailgun.js/issues/342)


### Other changes

* Udpate build ([1db5554](https://github.com/mailgun/mailgun.js/commits/1db555450f63d21f415c164cfef43de377399133))
* Update eslit rules for tests ([0d0a00d](https://github.com/mailgun/mailgun.js/commits/0d0a00db7a2dc342dfc3e615ce51a07c597cdbc1))
* Update suppressions tests to decrease usage of any ([2d3754a](https://github.com/mailgun/mailgun.js/commits/2d3754a4b632a074d7275535ea708380bfa064ad))

## [8.2.0](https://github.com/mailgun/mailgun.js/compare/v8.1.0...v8.2.0) (2023-03-02)


### Features

* Add type propert to errors ([71efcc5](https://github.com/mailgun/mailgun.js/commits/71efcc534ec69400b335091950dc59f372263486))


### Other changes

* Update d.ts file ([b25f2bf](https://github.com/mailgun/mailgun.js/commits/b25f2bf1bc996b30dba14181cddb31bd0b80b4d8))

## [8.1.0](https://github.com/mailgun/mailgun.js/compare/v8.0.6...v8.1.0) (2023-02-23)


### Features

* Add support for FormData Node.js in v18 ([7176d24](https://github.com/mailgun/mailgun.js/commits/7176d2412465b81d098d6dc30a3f96c0d3749dfe))


### Bug Fixes

* **deps:** bump json5 from 1.0.1 to 1.0.2 ([28732c8](https://github.com/mailgun/mailgun.js/commits/28732c8f469c494c878c224d3ca76ab74adc267e))
* Headers object processing ([f3f5523](https://github.com/mailgun/mailgun.js/commits/f3f5523e518f5d658a361255a34b2ae16c945a64))


### Other changes

* Add build and changelog steps ([433b41f](https://github.com/mailgun/mailgun.js/commits/433b41ffe7102f412d654a087e54fe620c349e4b))
* Add indents to the readme file ([8934a2f](https://github.com/mailgun/mailgun.js/commits/8934a2fd92d4055b077ac031755f10c7fe775974))
* Add linter to GA. Fix linter issues ([cc63d14](https://github.com/mailgun/mailgun.js/commits/cc63d14eed799a83d2903ebec27c2f91374a4316))
* Add suppresions destroy method to documentation ([5c1deb8](https://github.com/mailgun/mailgun.js/commits/5c1deb8bcf75e525eae8842b20d45262ad2df705))

### [8.0.6](https://github.com/mailgun/mailgun.js/compare/v8.0.5...v8.0.6) (2022-11-17)


### Bug Fixes

* Fix domains list method when items property is null ([4153941](https://github.com/mailgun/mailgun.js/commits/41539418a1b774a79bc05082d7df9409cc5bdf81))

### [8.0.5](https://github.com/mailgun/mailgun.js/compare/v8.0.4...v8.0.5) (2022-11-17)


### Bug Fixes

* **deps:** bump loader-utils from 2.0.3 to 2.0.4 ([59f140c](https://github.com/mailgun/mailgun.js/commits/59f140cdbaaa9276c1b9cba6e97aea8a2863d223))


### Other changes

* Update standard-version types array to include pull-requests from dependabot ([ba165a8](https://github.com/mailgun/mailgun.js/commits/ba165a81391f8bd68d8f62109d715757b7708a97))

### [8.0.4](https://github.com/mailgun/mailgun.js/compare/v8.0.3...v8.0.4) (2022-11-16)


### Bug Fixes

* **types:** Clarify DomainTemplatesQuery properties ([dcc633c](https://github.com/mailgun/mailgun.js/commits/dcc633c131e3e118518c27b0e4c9c34957d57bff))

### [8.0.3](https://github.com/mailgun/mailgun.js/compare/v8.0.2...v8.0.3) (2022-11-16)

### Bug Fixes
* Bumps [loader-utils](https://github.com/webpack/loader-utils) from 2.0.2 to 2.0.3.


### [8.0.2](https://github.com/mailgun/mailgun.js/compare/v8.0.1...v8.0.2) (2022-10-24)


### Bug Fixes

* Increase limit on body size ([8cd6fad](https://github.com/mailgun/mailgun.js/commits/8cd6fad1c497839a22a08a682690287a44954428))


### Other changes

* Update comment ([d2dbff5](https://github.com/mailgun/mailgun.js/commits/d2dbff516acfe70a0a8b6addff755a3fb9bc55c7))

### [8.0.1](https://github.com/mailgun/mailgun.js/compare/v8.0.0...v8.0.1) (2022-08-30)


### Bug Fixes

* Move webpack-merge to the dev dependencies ([68304c2](https://github.com/mailgun/mailgun.js/commits/68304c20f28ad38b8202ddf008c4a5f0786f1f54))


### Other changes

* Update build ([633e539](https://github.com/mailgun/mailgun.js/commits/633e5392b5bc2843fa08e3541a63f5b67179dcf6))
* Update send-email example ([a5a7c5a](https://github.com/mailgun/mailgun.js/commits/a5a7c5aeaa560cf8e6d6d9936b9c0137e84ba7e9))

## [8.0.0](https://github.com/mailgun/mailgun.js/compare/v7.0.4...v8.0.0) (2022-07-28)


### ⚠ BREAKING CHANGES

* (MultipleValidationClient) Changed result interface for Multiple Validation.
* (ListsClient) property with the name 'skip' was replaced by 'page' in the ListsQuery interface.
* (ListsClient.list)'list' method changed the response interface to MailingListResult
* Unify iterating thru pages in Domain Templates
* (SuppressionClient) Some interfaces moved from Suppressions.d.ts to separate files
(SuppressionClient.list) Property with name 'address' was replaced by iteratorPosition in the response in 'pages'
* (EventClient.get) Number propery was replaced by iteratorPosition in pages property of response
* (DomainTagsClient) Page property was added to DomainTagsQuery.
* (DomainTagsClient) Status property was added to DomainTagsList.
* (DomainTagsClient) Address property replaced by iteratorPosition in ParsedPage for list method.
* (MailListsMembers) Updated listMembers response to be object with MailListMembersResult interface

### Features

* Add query to MultipleValidationClient ([2a7fd64](https://github.com/mailgun/mailgun.js/commits/2a7fd646af22675c75c81d144821f1d05ce87815))
* Unify iterating thru pages in domain tags ([2ee7bd2](https://github.com/mailgun/mailgun.js/commits/2ee7bd2afee6d397ae41357c9cf66e4c88e7feff))
* Unify iterating thru pages in Domain Templates ([2dcf453](https://github.com/mailgun/mailgun.js/commits/2dcf453ad9c53d2359620f890edd709f373e9aee))
* Unify iterating thru pages in events ([41de3bb](https://github.com/mailgun/mailgun.js/commits/41de3bb084dc3c5b90abb81cdcfe7c365b6df097))
* Unify iterating thru pages in Mailing lists ([40a6859](https://github.com/mailgun/mailgun.js/commits/40a685944057c308e7cb09c7f8d02b2b7177b87e))
* Unify iterating thru pages in Multiple Validations ([db0d1f8](https://github.com/mailgun/mailgun.js/commits/db0d1f8629dda5849ff54a95607b7b388dde57d9))
* Unify iterating thru pages in suppressions ([11962dc](https://github.com/mailgun/mailgun.js/commits/11962dcb7f8fe716af4f559ab97984154f3a30c6))


### Bug Fixes

* Fix assignment for force_dkim_authority ([ab442fe](https://github.com/mailgun/mailgun.js/commits/ab442fea88631e0e09c9399f14e1498782cc8373))


### Breaking changes

* Add pages navigation for mail list members ([a62ebbf](https://github.com/mailgun/mailgun.js/commits/a62ebbfc26768d56d78d1514836e97f8fdf1351f))


### Other changes

* Add release:test command ([6fd1e48](https://github.com/mailgun/mailgun.js/commits/6fd1e48f17bfb001f3fa337a85bbca9714025532))
* Increase test coverage ([93014da](https://github.com/mailgun/mailgun.js/commits/93014dafc2ff91cc9b8ef52830472e9d354cb605))
* Move duplicate logic to common class ([4603fd2](https://github.com/mailgun/mailgun.js/commits/4603fd2d35c0e94499aa0914b3c42168ece6d203))
* Regenerate docs ([665068d](https://github.com/mailgun/mailgun.js/commits/665068d210b1b36b17cb4678dab178686db0c232))
* Update commitlint rules ([a5a8897](https://github.com/mailgun/mailgun.js/commits/a5a8897932cb2499f62aabaf31f6f5c8650236a5))
* Update readme ([3c32f1b](https://github.com/mailgun/mailgun.js/commits/3c32f1b726c0f19bcd5e009bd36b12c98e23cc8d))

### [7.0.4](https://github.com/mailgun/mailgun.js/compare/v7.0.3...v7.0.4) (2022-07-07)


### Bug Fixes

* Message Data (one of text, html, template required) ([abd2862](https://github.com/mailgun/mailgun.js/commits/abd2862fcf36ca54d68dea14cb2b2658d33092ec))


### Other changes

* Add content to message data ([a878cc1](https://github.com/mailgun/mailgun.js/commits/a878cc1acb0b4ca441b100278ca0fd2b47d137e3))
* Add propetry for mime messages ([f701cfb](https://github.com/mailgun/mailgun.js/commits/f701cfb591f08dbb882953bb2b77131fae089bad))
* Fix build error ([c7fcb5e](https://github.com/mailgun/mailgun.js/commits/c7fcb5e05bd84fc6ef04589bde37846a11f9466d))
* Fix tests ([b4791c4](https://github.com/mailgun/mailgun.js/commits/b4791c4e746a97aec359635272c2b29cb956ab6f))

### [7.0.3](https://github.com/mailgun/mailgun.js/compare/v7.0.2...v7.0.3) (2022-06-30)


### Bug Fixes

* Update handler of mime messages to support strings ([8d88163](https://github.com/mailgun/mailgun.js/commits/8d881636e7de54275d2cccb9652198c9af8cf0a1))


### Other changes

* Add missed subject property in readme ([7f4d128](https://github.com/mailgun/mailgun.js/commits/7f4d1286642d4009b25224514d75a0fb51af9bef))
* Fix link to doc for domains ([944a189](https://github.com/mailgun/mailgun.js/commits/944a1898b03ea020534a7e1be64b1b993ba86439))
* Regenerate docs ([7f6d318](https://github.com/mailgun/mailgun.js/commits/7f6d3184523c2f9a851093f2b733c5c8fc6806a4))
* Replace console.log by console.error for logging errors in the readme ([fd9a31f](https://github.com/mailgun/mailgun.js/commits/fd9a31fe90908c9e2e40b2df34cf94a39a716687))

### [7.0.2](https://github.com/mailgun/mailgun.js/compare/v7.0.1...v7.0.2) (2022-06-14)


### Bug Fixes

* Add boolean values handling in message create ([ff91208](https://github.com/mailgun/mailgun.js/commits/ff91208aac087913df51563928b76583ba1eac05))

### [7.0.1](https://github.com/mailgun/mailgun.js/compare/v7.0.0...v7.0.1) (2022-06-10)


### Bug Fixes

* Update max body length configuration. Fix Axios error handling ([cbc4182](https://github.com/mailgun/mailgun.js/commits/cbc4182db59ec6e41aada0eaad5fbf39a344d4b6))

## [7.0.0](https://github.com/mailgun/mailgun.js/compare/v6.0.1...v7.0.0) (2022-05-19)


### ⚠ BREAKING CHANGES

* Replaced ky with axios

### Features

* Fix tests. Improve error handling ([063e3ee](https://github.com/mailgun/mailgun.js/commits/063e3eedcd7d55b59bd32e521aa053be0a8d3101))


### Bug Fixes

* Correct handling of options body. Add header for form-data ([e2e210d](https://github.com/mailgun/mailgun.js/commits/e2e210d919ca1a68d76ed4c4aa93cc1178f6ebba))
* Corrected test to check body and not improper status code ([d11cd39](https://github.com/mailgun/mailgun.js/commits/d11cd39a1316c34bac0bc437bb43d4f8797cd3bd))
* Refactored ky usage with axios ([df4da91](https://github.com/mailgun/mailgun.js/commits/df4da916f10a0653d1a7e3ed8243f02bd3b824e1))
* Removed console.log ([b4e21c7](https://github.com/mailgun/mailgun.js/commits/b4e21c74b218f92a8292237aa8fe8b2af91b4b81))


### Other changes

* Update docs and readme ([1ccaeac](https://github.com/mailgun/mailgun.js/commits/1ccaeaca4ed954985b2ee9a0c0e7666c2f8f6b0f))


### Breaking changes

* Replaced ky with axios ([142bb7a](https://github.com/mailgun/mailgun.js/commits/142bb7ada1671c31a636d89efd7ffc62afaf3671))

### [6.0.1](https://github.com/mailgun/mailgun.js/compare/v6.0.0...v6.0.1) (2022-05-10)


### Bug Fixes

* Remove file property handling as a file ([d1a8a14](https://github.com/mailgun/mailgun.js/commits/d1a8a14eb5b12ca38772f9414e068fd49a011bad))


### Other changes

* Update tests ([52e443c](https://github.com/mailgun/mailgun.js/commits/52e443c20bd57c36e1b50aa1b8d930e160370ab6))

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
