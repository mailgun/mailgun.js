# Mailgun.js

A javascript sdk for Mailgun built with webpack, babel & es6. This can be used in node or in the browser*.

NOTE: If used in the browser, a proxy is required to communicate with the Mailgun api due to cors limitations. Also, do not publish your private api key in frontend code.

__Table of Contents__

- [Documentation](#documentation)
  - [Install](#install)
  - [Setup Client](#setup-client)
    - [Available Imports](#imports)
    - [Using Subaccounts](#using-subaccounts)
    - [Types imports](#types-imports)
    - [Interfaces and Enums imports](#interfaces-and-enums-imports)
  - [Generated docs](#generated-docs)
  - [Methods](#methods)
  - [Browser Demo](#browser-demo)
  - [Examples](https://github.com/mailgun/mailgun-js/tree/master/examples)
- [Development](#development)
  - [Requirements](#requirements)
  - [Build](#build)
  - [Tests](#tests)
  - [Release Process](#release-process)

# Documentation
[Mailgun API Documentation](https://documentation.mailgun.com/en/latest/api_reference.html):

## Install

- Requires node.js >= 18.x

Install mailgun.js with:

```sh
npm install mailgun.js
```

## Setup Client

The next step is to import the module and instantiate a mailgun client by calling `new Mailgun(formData)` and then using `mailgun.client` setup the client with basic auth credentials `(username: 'api', key: 'key-yourkeyhere')`.

NOTE: starting from version 3.0 you need to pass FormData (we need this to keep library universal). For node.js you can use built-in FormData or `form-data` library.

**IMPORTANT**: if you are using EU infrastructure, you need to also pass `url: 'https://api.eu.mailgun.net'` together with auth credentials as stated in [Mailgun docs](https://documentation.mailgun.com/en/latest/quickstart-sending.html#send-via-api)

### Imports
Once the package is installed, you can import the library using `import` or `require` approach:

```js
  const formData = require('form-data'); // or built-in FormData
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
```
```js
  import FormData from 'form-data'; // or built-in FormData
  import Mailgun from 'mailgun.js';
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
```

Be aware that there are four bundles available for usage. All of them are conditionally exported by package.json and separated by environment (Browser/Node.js):
  - Node.js environment:
    - CommonJS ([CJS](https://nodejs.org/api/modules.html#modules-commonjs-modules)), a bundle to use with the CommonJS module system in Node.js.

      Usage example:

      ``` JS
      // In this case, the .dist/CJS/mailgun.node.cjs file is expected to be used
      const Mailgun = require('mailgun.js');
      const mailgun = new Mailgun(FormData);
      ```

    - ECMAScript modules ([ESM](https://nodejs.org/download/release/v18.11.0/docs/api/esm.html#modules-ecmascript-modules)) a bundle for the **Node.js** environment

      Usage example:
      ``` JS
      // In this case, the .dist/ESM/mailgun.node.js file is expected to be used
      import Mailgun from 'mailgun.js';
      const mailgun = new Mailgun(FormData);
      ...
      ```
      or with dynamic imports:
      ``` JS
      // In this case, the .dist/ESM/mailgun.node.js file is expected to be used
      const Mailgun = await import('mailgun.js');
      const mailgun = new Mailgun.default(FormData);
      ...
      ```

  - Browser environment:
    - Asynchronous Module Definition ([AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)), a bundle to use with the `Require.js` module loader in the browser. This bundle requires the RequireJS module loader to be present in the environment.

      Usage example for the case when the distribution is used directly in the browser:
      ``` HTML
      <script src='http://requirejs.org/docs/release/2.3.6/comments/require.js'></script>
      <script>
      require(['./dist/AMD/mailgun.amd.js'], function(Mailgun) {
        const mailgun = new Mailgun(FormData);
        ...
      })
      </script>
      ```

    - ECMAScript modules ([ESM](https://nodejs.org/download/release/v18.11.0/docs/api/esm.html#modules-ecmascript-modules)) a bundle for **browser** environment.

      Usage example for the case the distribution is used directly in the browser:
      ``` HTML
      <script type="module">
        import Mailgun from './dist/ESM/mailgun.browser.js';
        const mailgun = new Mailgun(FormData);
        ...
      </script>
      ```
      or with dynamic imports:
      ``` HTML
      <script>
      import ('./dist/ESM/mailgun.browser.js').then(Mailgun =>{
        const mailgun = new Mailgun.default(FormData);
        ...
      })
      </script>
      ```
### Using Subaccounts
Primary accounts can make API calls on behalf of their subaccounts. [API documentation](https://documentation.mailgun.com/en/latest/subaccounts.html#subaccounts)
```js
  import FormData from 'form-data'; // or built-in FormData
  import Mailgun from 'mailgun.js';
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
  mg.setSubaccount('subaccount-id');
  // then, if you need to reset it back to the primary account:
  mg.resetSubaccount();
```

### Proxy configuration
By leveraging client configuration options, users can effortlessly establish proxy connections that align with their network requirements.
Ex:
```js
  import FormData from 'form-data'; // or built-in FormData
  import Mailgun from 'mailgun.js';
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
    proxy: {
      protocol: 'https' // 'http' ,
      host: '127.0.0.1', // use your proxy host here
      port: 9000, // use your proxy port here
      auth: { // may be omitted if proxy doesn't require authentication
        username: 'user_name', // provide username
        password: 'user_password' // provide password
      }
    },
  });
```
### Types imports
Types defined by SDK can be imported from 'definitions' submodule:
```TS
 import { MailgunClientOptions, MessagesSendResult } from 'mailgun.js/definitions';
```

### Interfaces and Enums imports
Interfaces and Enums defined by SDK can be imported from 'definitions' submodule:
```TS
  import { Interfaces, Enums } from 'mailgun.js/definitions';
  ...
  const mailgunClient: Interfaces.IMailgunClient = mailgun.client(clientOptions);
  const yes = Enums.YesNo.YES;
  ...
```

### Generated docs
The list of all available Types, Interfaces and Enums is auto-generated and located in the [docs](./docs/modules.md) folder.

## Methods

The following service methods are available to instantiated clients. The examples assume you have already created a mailgun client as `mg` with valid credentials.

- [Documentation](#documentation)
  - [Install](#install)
  - [Setup Client](#setup-client)
  - [Methods](#methods)
    - [messages](#messages)
      - [create](#create)
    - [domains](#domains)
      - [list](#list)
      - [get](#get)
      - [create](#create-1)
      - [update](#update)
      - [verify](#verify)
      - [destroy](#destroy)
      - [getTracking](#gettracking)
      - [updateTracking](#updatetracking)
      - [getConnection](#getconnection)
      - [updateConnection](#updateconnection)
      - [updateDKIMAuthority](#updatedkimauthority)
      - [updateDKIMSelector](#updatedkimselector)
      - [getIps](#getips)
      - [assignIp](#assignip)
    - [domain templates](#domain-templates)
      - [list](#list-1)
      - [get](#get-1)
      - [create](#create-2)
      - [update](#update-1)
      - [destroy](#destroy-1)
      - [destroyAll](#destroyall)
      - [listVersions](#listversions)
      - [getVersion](#getversion)
      - [createVersion](#createversion)
      - [updateVersion](#updateversion)
      - [destroyVersion](#destroyversion)
    - [domain tracking](#domain-tracking)
      - [getTracking](#gettracking-1)
      - [updateTracking](#updatetracking-1)
      - [get](#get-2)
      - [generate](#generate)
      - [regenerate](#regenerate)
    - [events](#events)
      - [get](#get-3)
        - [Example with Date and *Filter field*](#example-with-date-and-filter-field)
    - [stats](#stats)
      - [Stats Options](#stats-options)
      - [getDomain](#getdomain)
      - [getAccount](#getaccount)
    - [metrics](#metrics)
      - [getAccount](#getaccount-1)
      - [getAccountUsage](#getaccountusage)
    - [suppressions](#suppressions)
      - [list](#list-2)
        - [Bounces Example](#bounces-example)
        - [Unsubscribes Example](#unsubscribes-example)
        - [Complaints Example](#complaints-example)
      - [get](#get-4)
        - [Bounces Example](#bounces-example-1)
        - [Unsubscribes Example](#unsubscribes-example-1)
        - [Complaints Example](#complaints-example-1)
      - [create](#create-3)
        - [Bounces Example](#bounces-example-2)
        - [Unsubscribes Example](#unsubscribes-example-2)
          - [Unsubscribe from one tag](#unsubscribe-from-one-tag)
          - [Unsubscribe from particular tags](#unsubscribe-from-particular-tags)
        - [Complaints Example](#complaints-example-2)
      - [destroy](#destroy-2)
        - [Bounces Example](#bounces-example-3)
        - [Unsubscribes Example](#unsubscribes-example-3)
        - [Complaints Example](#complaints-example-3)
    - [webhooks](#webhooks)
      - [list](#list-3)
      - [get](#get-5)
      - [create](#create-4)
      - [update](#update-2)
      - [destroy](#destroy-3)
    - [routes](#routes)
      - [list](#list-4)
      - [get](#get-6)
      - [create](#create-5)
      - [update](#update-3)
      - [destroy](#destroy-4)
    - [validate](#validate)
      - [get](#get-7)
    - [multiple validation](#multiple-validation)
      - [create](#create-6)
      - [list](#list-5)
      - [get](#get-8)
      - [destroy](#destroy-5)
    - [mailing lists](#mailing-lists)
      - [list](#list-6)
      - [get](#get-9)
      - [create](#create-7)
      - [update](#update-4)
      - [destroy](#destroy-6)
    - [mailing list members](#mailing-list-members)
      - [listMembers](#listmember)
      - [getMember](#getmember)
      - [createMember](#createmember)
      - [createMembers](#createmembers)
      - [updateMember](#updatemember)
      - [destroyMember](#destroymember)
    - [subaccounts](#subaccounts)
      - [list](#list-7)
      - [get](#get-10)
      - [create](#create-8)
      - [enable](#enable)
      - [disable](#disable)
    - [inbox placements](#inbox-placements)
      - [SeedsLists](#seedslists)
        - [list](#list-8)
        - [get](#get-11)
        - [create](#create-9)
        - [update](#update-5)
        - [destroy](#destroy-7)
        - [SeedsLists Attributes](#attributes)
          - [list](#list-9)
          - [get](#get-12)
        - [SeedsLists Filters](#filters)
          - [list](#list-10)
      - [Providers](#providers)
        - [list](#list-11)
      - [Results](#results)
        - [list](#list-12)
        - [get](#get-13)
        - [destroy](#destroy-8)
        - [getResultByShareId](#getresultbyshareid)
        - [Results Attributes](#attributes-1)
          - [list](#list-13)
          - [get](#get-14)
        - [Results Filters](#filters-1)
          - [list](#list-14)
        - [Sharing](#sharing)
          - [get](#get-15)
          - [update](#update-6)
      - [Run Test](#run-test)
  - [Navigation thru lists](#navigation-thru-lists)
  - [Browser Demo](#browser-demo)
- [Development](#development)
  - [Requirements](#requirements)
  - [Build](#build)
  - [Tests](#tests)
  - [Release Process](#release-process)
  - [TODO](#todo)

### Method naming conventions:
- `get` or `get{{Item}}` - expected response for client is a single object
- `list` or `list{{Items}}` - expected response for client is a list of objects
- `create` or `create{{Item}}` - expected response for client is a single object
- `update` or `update{{Item}}` - expected response is an object with a status message
- `destroy` or `destroy{{Item}}` - expected response is an object with a status message

### Messages

- #### create

  `mg.messages.create(domain, data)` - [api docs](https://documentation.mailgun.com/en/latest/api-sending.html)

  Options:

  Parameter         | Description
  :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  to                | Email address of the recipient(s). Example: "Bob <bob@host.com>". You can use commas to separate multiple recipients (e.g.: "test@example.com,test@example.com" or ["test@example.com", "test@example.com"]).
  cc                | Same as `To` but for `carbon copy`
  bcc               | Same as `To` but for `blind carbon copy`
  subject           | Subject of the message.
  html              | HTML version of the message.
  text              | Text version of the message.
  message           | MIME string of the message. Make sure to use multipart/form-data to send this as a file upload.
  attachment        | File attachment. You can post multiple attachment values. Important: You must use multipart/form-data encoding when sending attachments. Also you can use `{data: file, filename: filename}` to define custom filename.
  o:tag             | Tag string. See Tagging for more information.
  o:campaign        | Id of the campaign the message belongs to. See um-campaign-analytics for details.
  o:deliverytime    | Desired time of delivery. See Date Format. Note: Messages can be scheduled for a maximum of 3 days in the future.
  o:dkim            | Enables/disabled DKIM signatures on per-message basis. Pass yes or no
  o:testmode        | Enables sending in test mode. Pass yes if needed. See Sending in Test Mode
  o:tracking        | Toggles tracking on a per-message basis, see Tracking Messages for details. Pass yes or no.
  o:tracking-clicks | Toggles clicks tracking on a per-message basis. Has higher priority than domain-level setting. Pass yes, no or htmlonly.
  o:tracking-opens  | Toggles opens tracking on a per-message basis. Has higher priority than domain-level setting. Pass yes or no.
  h:X-My-Header     | h: prefix followed by an arbitrary value allows to append a custom MIME header to the message (X-My-Header in this case). For example, h:Reply-To to specify Reply-To address.
  v:my-var          | v: prefix followed by an arbitrary name allows to attach a custom JSON data to the message. See Attaching Data to Messages for more information.


  - HTML/TEXT Example:

    ```JS
    mg.messages.create('sandbox-123.mailgun.org', {
        from: "Excited User <mailgun@sandbox-123.mailgun.org>",
        to: ["test@example.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomness!",
        html: "<h1>Testing some Mailgun awesomness!</h1>"
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - MIME Example:

    ```js
    mg.messages.create('sandbox-123.mailgun.org', {
        from: "Excited User <mailgun@sandbox-123.mailgun.org>",
        to: ["test@example.com"],
        subject: "Hello",
        message: "<mime encoded string here>"
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - Messages with attachments:

    - Node.js example of send file as an attachment

      ```js
        const fsPromises = require('fs').promises;
        const path = require('path');
        const filepath = path.resolve(__dirname, '../test.pdf');
        let messageParams = {
            from: "Excited User <mailgun@sandbox-123.mailgun.org>",
            to: ["test@example.com"],
            subject: "Test subject",
            text: "Hello here is a file in the attachment"
        }

        fsPromises.readFile(filepath)
        .then(data => {
          const file = {
              filename: 'test-rename.pdf',
              data
          }
          messageParams.attachment = file;
          return mg.messages.create('sandbox-123.mailgun.org', messageParams);
        })
        .then(response => {
            console.log(response);
        })
      ```
    - Node.js example of send multiple files as an attachment
      ```js
      const fsPromises = require('fs').promises;
      const path = require('path');
      const filepath = path.resolve(__dirname, '../test.pdf');
      const filepath1 = path.resolve(__dirname, '../test.jpg');

      let messageParams = {
          from: "Excited User <mailgun@sandbox-123.mailgun.org>",
          to: ["test@example.com"],
          subject: "Test subject",
          text: "Test message"
      }

      (async () =>{
          try {
              const firstFile = {
                  filename: 'test.pdf',
                  data: await fsPromises.readFile(filepath)
              }

              const secondFile = {
                  filename: 'test.jpg',
                  data: await fsPromises.readFile(filepath1)
              }

              messageParams.attachment = [firstFile, secondFile];
              const result =  await mg.messages.create('sandbox-123.mailgun.org', messageParams);
              console.log(result);
              } catch (error) {
                  console.error(error);
              }
      })()
      ```
    - Node.js example of send file as inline image
      ```js
        const fsPromises = require('fs').promises;
        const path = require('path');
        const filepath = path.resolve(__dirname, '../test.jpg');
        let messageParams = {
            from: "Excited User <mailgun@sandbox-123.mailgun.org>",
            to: ["test@example.com"],
            subject: "Test subject",
            html: '<div><img alt="image" id="1" src="cid:test.jpg"/></div> Some extra text'
        }

        fsPromises.readFile(filepath)
        .then(data => {
          const file = {
              filename: 'test.jpg',
              data
          }

          messageParams.inline = file;
          return mg.messages.create('sandbox-123.mailgun.org', messageParams);
        })
        .then(response => console.log(response))
      ```

    - Browser example of send file

      Before sending the file you need to somehow get the Blob of the file.
      Usually can get it from the onChange event of input tag with type file.
      ```js
      const handleFileSelected = async (event) => {
        const files = Array.from(event.target.files)
        const fileBuffer = await files[0];
      }
      <input type="file" onChange={handleFileSelected} name="file-uploader"/>
      ```

      Then you can use the same approach as shown above for node.js apps.
      ```js
        const file = {
          filename: 'test.pdf',
          data: fileBuffer
        };

        let messageParams = {
          from: "Excited User <mailgun@sandbox-123.mailgun.org>",
          to: ["test@example.com"],
          subject: "Test subject",
          text: "Hello here is a file in the attachment",
          attachment: file
        };

        const res = await mg.messages.create(DOMAIN, messageParams);
      ```
  Promise returns:

  ```js
  {
    id: '<20151025002517.117282.79817@sandbox-123.mailgun.org>',
    message: 'Queued. Thank you.'
  }
  ```

### Templates

  Mailgun’s templates uses a fork of the very popular template engine [handlebars](https://handlebarsjs.com/).

  To provide values for a substitution you need to use 'h:X-Mailgun-Variables' property in the message description.

  Make sure that this property is a JSON string like:
  ```js
  JSON.stringify({
    "title": "A title",
    "body": "The body"
  })
  ```

  You can find few examples of how to use templates below.
- Providing values for **title** and **slug** variables to render in template
  ```js
    ...
    const {
      title,
      slug,
    } = someDataSource;

    const mailgunData = {
      from: 'mailer@example.com>',
      to: 'recipient@example.com',
      subject: `Email ${title}`,
      template: 'name-of-the-template-you-made-in-mailgun-web-portal',
      'h:X-Mailgun-Variables': JSON.stringify({ // be sure to stringify your payload
        title,
        slug,
      }),
      'h:Reply-To': 'reply-to@example.com',
    };

    try {
      const response = await mailgun.messages.create(DOMAIN_NAME, mailgunData);
    ...
  ```

- Providing an array of objects to render them in the template
  ```JS
    ...
    const mailgunData = {
      from: 'mailer@example.com>',
      to: 'recipient@example.com',
      subject: `Email ${title}`,
      template: 'name-of-the-another-template-you-made-in-mailgun-web-portal',
      'h:X-Mailgun-Variables': JSON.stringify({
      "arrayItems": [
          {
              "question": "test_question",
              "answer": "test_answer"
          },
          {
              "question": "test_question",
              "answer": "test_answer"
          }
      ]})
    };
    try {
      const response = await mailgun.messages.create(DOMAIN_NAME, mailgunData);
    ...
  ```

### Recipient Variables

  [Docs](https://documentation.mailgun.com/en/latest/user_manual.html#batch-sending)

  Recipient Variables are custom variables that you define, which you can then reference in the message body. They give you the ability to send a custom message to each recipient while still using a single API Call.

  ```JS
  ...
  const mailgunData = {
      from: 'Example.com Mailer <mailer@mailer.example.com>',
      to: ['me@example.com', 'you@example.com'],
      subject: 'Recipient - %recipient.title%',
      html: 'Here\'s %recipient.title% and <a href="%recipient.link%">link</a>',
      'recipient-variables': JSON.stringify({
        'me@example.com': {
          title: 'Me',
          link: 'href-var',
        },
        'you@example.com': {
          title: 'You',
          link: 'slug-recipient-var-c',
        },
      }),
    };

    try {
      const response = await mailgun.messages.create(DOMAIN_NAME, mailgunData);
  ...
  ```

### Domains
  Domains API manages domains, domain keys and DNS verification.

- #### list
  Get the list of domains. Can be filtered by state or authority. Sorting is optional. The list is paginated and limited to 1000 items per page.
  `mg.domains.list(query)` - [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/GET-v4-domains)

  Example:

  ```js
  mg.domains.list()
    .then(domains => console.log(domains)) // logs array of domains
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: array of Domain instances

  ```JS
  [{
    name: 'testing.example.com',
    require_tls: true,
    skip_verification: true,
    state: 'unverified',
    wildcard: true
    spam_action: 'disabled',
    created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
    smtp_password: undefined,
    smtp_login: 'postmaster@testing.example.com',
    type: 'custom',
    receiving_dns_records: null,
    sending_dns_records: null,
    id: '697d01d38712cf0322bb24d1',
    is_disabled: false,
    web_prefix: 'test',
    web_scheme: 'https',
    use_automatic_sender_security: true
  }]
  ```

  Query data may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | limit     | Maximum number of records to return. (100 by default) |
  | skip      | Number of records to skip. (0 by default)             |
  | state     | To only get domains with a specific state. Can be either active, unverified or disabled. |
  | sort      | Valid sort options are **name** which defaults to asc order, **name:asc**, or **name:desc**. If sorting is not specified domains are returned in reverse creation date order. |
  | authority | To only get domains with a specific authority. If state is specified then only state filtering will be proceed |
  | search    | Search domains by the given partial or complete name. Does not support wildcards|

- #### get
  Fetches representation of a domain that includes details about the domain's state and settings.

  `mg.domains.get(domain, query)`  - [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/GET-v4-domains--name-)

  Example:

  ```JS
  mg.domains.get('testing.example.com', {
    extended: true
  })
    .then(domain => console.log(domain)) // logs domain object
    .catch(err => console.error(err)); // logs any error
  ```

   Query object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | extended  | Default to false. If set to true, domain payload will include dkim_host, mailfrom_host and pod |
  | with_dns  | Default to true, domain payload will include sending and receiving dns records payload|

  Promise returns: Domain instance

  ```JS
  {
    name: 'testing.example.com',
    require_tls: true,
    skip_verification: true,
    state: 'unverified',
    wildcard: true,
    spam_action: 'disabled',
    created_at: new Date('Sun, 19 Oct 2014 18:49:36 GMT'),
    smtp_password: undefined,
    smtp_login: 'postmaster@testing.example.com',
    type: 'custom',
    receiving_dns_records: [ // may be null if with_dns is set to false.
      {
        is_active: true,
        cached: [],
        priority: '10',
        record_type: 'TXT',
        valid: "unknown",
        value: "dns_record_value"
      },
      ...
      ],
    sending_dns_records: [ // may be null if with_dns is set to false.
      {
        is_active: true,
        cached: [],
        name: 'dns_record_name',
        record_type: 'CNAME',
        valid: 'unknown',
        value: 'dns_record_value'
      },
      ...
      ],
    id: '697d01d38712cf0322bb24d1',
    is_disabled: false,
    web_prefix: 'email',
    web_scheme: 'http',
    use_automatic_sender_security: true,
    dkim_host: 'dkim_host_value', // absent if 'extended' was not set to true.
    mailfrom_host: 'mailfrom_host_value', // absent if 'extended' was not set to true.
  }
  ```

- #### create
  Creates a domain for sending emails

  `mg.domains.create(data)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/POST-v4-domains)

  Example:

  ```js
  mg.domains.create({
    name: 'foobar.example.com',
    dkim_key_size: 1024,
    dkim_selector: 's1',
    encrypt_incoming_message: true,
    force_dkim_authority: false,
    force_root_dkim_host: false,
    wildcard: true,
    pool_id: 'pool_id',
    ips: '',
    spam_action: 'tag',
    smtp_password: 'smtp_password_value',
    use_automatic_sender_security: true,
    web_prefix: 'test',
    web_scheme: 'https',
  })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Create method accepts data object with next properties:

  | Parameter   | Description   |
  |---  |---  |
  | name (required) | Name of the domain (ex. domain.com) |
  | dkim_host_name  | Set the DKIM host name for the domain that is being created. Note, the value must be a valid domain name, and can be the domain name being created, a subdomain of the domain being created, or the root domain. This parameter cannot be used in conjunction with `force_dkim_authority` or `force_root_dkim_host`. |
  | dkim_key_size   | **1024** or **2048**<br>Set the length of your domain’s generated DKIM key<br>The default is **1024**   |
  | dkim_selector | Explicitly set the value of the DKIM selector for the domain being created. If the domain key does not already exist, one will be created. The selector must be a valid atom per RFC2822. e.g valid value foobar, invalid value foo.bar https://datatracker.ietf.org/doc/html/rfc2822#section-3.2.4|
  | encrypt_incoming_message  | Enable encrypting incoming messages for the given domain. This cannot be altered via API after being set for security purposes. Reach out to Support to disable if necessary. Default to false|
  | force_dkim_authority| If set to true, the domain will be the DKIM authority for itself even if the root domain is registered on the same mailgun account. If set to false, the domain will have the same DKIM authority as the root domain registered on the same mailgun account. Default to false. |
  | force_root_dkim_host | If set to true, the root domain will be the DKIM Host for the domain being created even if the root domain itself is not registered with Mailgun. The domain being created will still need to pass domain verification with valid spf records for the domain and valid DKIM record for the root domain. This does not effect the smtp mail-from host for the domain being created. The mail-from host will remain the domain name being created, not the root domain.|
  | wildcard  | Determines whether the domain will accept email for sub-domains when sending messages. Default to false. |
  | pool_id   | Requested IP Pool to be assigned to the domain at creation. |
  | ips   | An optional, comma-separated list of IP addresses to be assigned to this domain. If not specified, all dedicated IP addresses on the account will be assigned. If the request cannot be fulfilled (e.g. a requested IP is not assigned to the account, etc), a 400 will be returned.  |
  | spam_action   | `disabled`, `block`, or `tag`<br>If `disabled`, no spam filtering will occur for inbound messages.<br>If `block`, inbound spam messages will not be delivered.<br>If `tag`, inbound messages will be tagged with a spam header. [Spam Filter](https://documentation.mailgun.com/en/latest/user_manual.html#um-spam-filter)<br>The default is `disabled`.  |
  | smtp_password   | Password for SMTP authentication  |
  | use_automatic_sender_security | Enable Automatic Sender Security. This requires setting DNS CNAME entries for DKIM keys instead of a TXT record. Defaults to false. |
  | web_prefix | Sets your open, click and unsubscribe URLs domain name prefix. Links rewritten or added by Mailgun in your emails will look like ://./... Default to email |
  | web_scheme  |Sets your open, click and unsubscribe URLs to use http or https. Value either `http` or `https`. Defaults to http. In order for https to work, you must have a valid cert created for your domain. See Domain Tracking for TLS cert generation. |

  Promise returns:

  ```JS
  {
    name: 'foobar.example.com',
    require_tls: false,
    skip_verification: false,
    state: 'unverified',
    wildcard: true,
    spam_action: 'tag',
    created_at: 2025-01-08T12:52:29.000Z,
    smtp_password: undefined,
    smtp_login: new Date('postmaster@foobar.example.com'),
    type: 'custom',
    receiving_dns_records: [
      {
        is_active: true,
        cached: [],
        priority: '10',
        record_type: 'MX',
        valid: 'unknown',
        value: 'dns_record_value'
      },
      ...
    ],
    sending_dns_records: [
      {
        is_active: false,
        cached: [],
        name: 'sending_dns_record_name',
        record_type: 'CNAME',
        valid: 'unknown',
        value: 'sending_dns_record_value'
      },
      ...
    ],
    id: '64a4291ebbe4ec7e1d78bc80',
    is_disabled: false,
    web_prefix: 'test',
    web_scheme: 'https',
    use_automatic_sender_security: true
  }
  ```

- #### verify
  Verify the domains DNS records (includes A, CNAME, SPF, DKIM and MX records) to ensure the domain is ready and able to send

  `mg.domains.verify(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/PUT-v4-domains--name--verify)

  Example:

  ```JS
  mg.domains.destroy('foobar.example.com')
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    name: 'foobar.example.com',
    require_tls: false,
    skip_verification: false,
    state: 'active',
    wildcard: false,
    spam_action: 'tag',
    created_at: new Date('2017-10-05T14:55:20.000Z'),
    smtp_password: undefined,
    smtp_login: 'postmaster@foobar.example.com',
    type: 'custom',
    receiving_dns_records: [
      {
        is_active: true,
        cached: [Array],
        priority: '10',
        record_type: 'MX',
        valid: 'valid',
        value: 'receiving_dns_record_value'
      },
      ...
    ],
    sending_dns_records: [
      {
        is_active: true,
        cached: [],
        name: 'foobar.example.com',
        record_type: 'CNAME',
        valid: 'unknown',
        value: 'sending_dns_record_value'
      },
      ...
    ],
    id: '64a5880eere4eg7e1d85bc69',
    is_disabled: false,
    web_prefix: 'email',
    web_scheme: 'https',
    use_automatic_sender_security: true
  }
  ```


- #### update
  Update domains configuration like smtp credentials, enable/disable automatic sender security, spam actions, wildcard, or tracking web scheme.

  `mg.domains.update(domain, options)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/PUT-v4-domains--name-)

  Example:

  ```js
  mg.domains.update('foobar.example.com',{
      mailfrom_host: 'mailfrom_host_value',
      message_ttl: 20,
      smtp_password: 'smtp_password_value'
      spam_action: 'tag',
      use_automatic_sender_security: true
      web_scheme: 'http',
      web_prefix: 'web_prefix_value'
      wildcard: 'true',
    })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Update method accepts data object with next properties:

  | Property    | Description                                                                                                                                   |
  |:--------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
  | mailfrom_host | The hostname to update to. Must be in lower case |
  | message_ttl   | Duration of the message retrieval TTL in seconds |
  | smtp_password | Updates the domain's SMTP credentials with the given string |
  | spam_action   | Can be string with value `disabled`, `block`, or `tag`. If *disabled*, no spam filtering will occur for inbound messages. If `block`, inbound spam messages will not be delivered. If `tag`, inbound messages will be tagged with a spam header. See [Spam Filter](https://documentation.mailgun.com/en/latest/user_manual.html#um-spam-filter).|
  | use_automatic_sender_security | enable or disable Automatic Sender Security. If enabled, requires setting DNS CNAME entries for DKIM keys instead of a TXT record. Domain must be reverified after changing this field. Defaults to `false`|
  | web_scheme | Can be string with value `http` or `https`. Set your **open**, **click** and **unsubscribe** URLs to use `http` or `https`. The default is `http`|
  | web_prefix | Web prefix to be used for tracking. Must be a valid atom. Nothing will be updated if omitted |
  | wildcard   | Can be string `'true'` or `'false'` or `boolean`. Determines whether the domain will accept email for sub-domains. The default is `false`.|

  Promise returns:

  ```JS
  {
    name: 'foobar.example.com',
    require_tls: false,
    skip_verification: false,
    state: 'unverified',
    wildcard: true,
    spam_action: 'disabled',
    created_at: new Date('2025-01-08T12:52:29.000Z'),
    smtp_password: undefined,
    smtp_login: 'postmaster@foobar.example.com',
    type: 'custom',
    receiving_dns_records: [
      {
        is_active: true,
        cached: [],
        priority: '10',
        record_type: 'MX',
        valid: 'unknown',
        value: 'receiving_dns_record_value'
      },
      ...
    ],
    sending_dns_records: [
      {
        is_active: true,
        cached: [],
        name: 'foobar.example.com',
        record_type: 'TXT',
        valid: 'unknown',
        value: 'sending_dns_record_value'
      },
      ...
    ],
    id: '64a5880eere4eg7e1d85bc69',
    is_disabled: false,
    web_prefix: 'test',
    web_scheme: 'https',
    use_automatic_sender_security: true
  }
  ```



- #### destroy
  The domain must not be disabled or used as an authority for an other domain. Sandbox domain can't be deleted.
  `mg.domains.destroy(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domains/#tag/Domains/operation/DELETE-v3-domains--name-)

  Example:

  ```JS
  mg.domains.destroy('foobar.example.com')
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns message:

  ```JS
  {
    message: "Domain will be deleted in the background"
  }
  ```

- #### getTracking
  `domains.getTracking` method is deprecated, and will be removed. Please use `domains.domainTracking.getTracking` instead.

- #### updateTracking
   `domains.updateTracking` method is deprecated, and will be removed. Please use `domains.domainTracking.updateTracking` instead.

- #### getConnection
  Returns domain's delivery connection settings.

  `mg.domains.getConnection(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Connection/#tag/Domain-Connection/operation/GET-v3-domains--name--connection)

  Example:

  ```JS
  mg.domains.getConnection(domainAddress)
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    require_tls: false,
    skip_verification: false
  }
  ```

- #### updateConnection
  Update a domain's TLS connection settings.

  `mg.domains.updateConnection(domainAddress, data)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Connection/#tag/Domain-Connection/operation/PUT-v3-domains--name--connection)

  Example:

  ```JS
  mg.domains.updateConnection(domainAddress, {
    require_tls: true;
    skip_verification: false;
  })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    message: 'Domain connection settings have been updated, may take 10 minutes to fully propagate',
    require_tls: false,
    skip_verification: false
  }
  ```

- #### updateDKIMAuthority
  You can delegate the domain authority to an other domain. Domain's authority is set to itself by default.

  `mg.domains.updateDKIMAuthority(domainAddress, data)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Keys/#tag/Domain-Keys/operation/PUT-v3-domains--name--dkim-authority)

  Example:

  ```JS
  mg.domains.updateDKIMAuthority(domainAddress, {
    self: true
  })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Data object accepts next properties:

  | Property    | Description                                                                                                                                   |
  |:--------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
  | self | Change the DKIM authority for a domain. If set to true, the domain will be the DKIM authority for itself even if the root domain is registered on the same mailgun account If set to false, the domain will have the same DKIM authority as the root domain registered on the same mailgun account |

  Promise returns:

  ```JS
  {
  message: 'Domain DKIM authority has been changed',
  sending_dns_records: [
    {
      is_active: true,
      cached: [],
      name: 'sending_dns_record_name',
      record_type: 'TXT',
      valid: 'unknown',
      value: 'sending_dns_record_value'
    },
    ...
  ],
  changed: true
  }
  ```

- #### updateDKIMSelector
  Selector is the unique identifier of your key. It has to be different from other keys selector.

  `mg.domains.updateDKIMSelector(domainAddress, data)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Keys/#tag/Domain-Keys/operation/PUT-v3-domains--name--dkim-selector)

  Example:

  ```JS
  mg.domains.updateDKIMSelector(domainAddress, {
    dkimSelector: 'dkimSelector_value'
  })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Data object accepts next properties:

  | Property    | Description                                                                                                                                   |
  |:--------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
  | dkimSelector | Selector is the unique identifier of your key. It has to be different from other keys selector. |

  Promise returns:

  ```JS
  {
    message: 'DKIM selector changed',
    status: 200
  }
  ```

- #### getIps
    **Deprecated, and will be removed in the future releases**

    `mg.domains.getIps(domain)`

    Example:

    ```js
    mg.domains.getIps('foobar.example.com')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Promise returns:

    ```JS
    ["192.168.0.1", "192.168.0.2"]
    ```

- #### assignIp
   **Deprecated, and will be removed in the future releases**
  `mg.domains.assignIp(domain, ip)`

  Example:

  ```JS
  mg.domains.assignIp('foobar.example.com', "192.168.0.3")
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```


  ```JS
  {
    message: 'success',
    status: 200,
  }
  ```

- #### deleteIp
  **Deprecated, and will be removed in the future releases**
  `mg.domains.deleteIp(domain, ip)`

  Example:

  ```JS
  mg.domains.deleteIp('foobar.example.com', "192.168.0.3")
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  ```JS
  {
    message: 'success'
  }
  ```

### Domain templates

- #### list
  Returns a list of templates for the domain.

  `mg.domains.domainTemplates.list('domainId', query)` - [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).GetPage-fm-9)

  Example:

  ```js
  mg.domains.domainTemplates.list('domainId',{
    limit: 10
  })
    .then(domainTemplates => console.log(domainTemplates)) // logs array of domain templates
    .catch(err => console.error(err)); // logs any error
  ```

  Query data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | limit     | Maximum number of records to return. (100 by default) |
  | page      | params from previous response's 'paging' object. Value must be stringified as query params. e.g. '?page=first','?page=next&p=name-of-last-item'|

  Promise returns: object with domain's templates
  ```JS
  {
    items: [
      {
        name: 'template_name',
        description: 'template description ',
        createdAt: new Date('2021-08-24T22:26:55.000Z'),
        createdBy: '',
        id: '48d63154-8c8f-4104-ab14-687d01dbf296'
      },
      ...
    ]
  }
  ```

- #### get

  Returns metadata information about the stored template specified in the url. If the active flag is provided, the content of the active version of the template is returned.

  `mg.domains.domainTemplates.get('domainId', 'templateName', query)`  [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).Get-fm-6)

  Example:

  ```js
  mg.domains.domainTemplates.get('domainId', 'template_name', {
     active: 'yes'
  }).then(data => console.log(data)) // logs template
    .catch(err => console.error(err)); // logs any error
  ```

  Query data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | active    | If this flag is set to yes the active version of the template is included in the response. |

  Promise returns: object with domain template and active version
  ```JS
  {
    name: 'template_name',
    description: 'This is the description of the template',
    createdAt: new Date('2021-08-24T22:26:55.000Z'),
    createdBy: '',
    id: '46565d87-68b6-4edb-8b3c-34554af4bb77'
    version: {
      tag: 'tag',
      template: '<html>template content</html>',
      engine: 'handlebars',
      mjml: '',
      createdAt: new Date('2021-08-22T22:26:55.000Z'),
      comment: 'Version comment',
      active: true,
      id: '3efd2b85-0f41-4a1d-9898-05d7e7459c4a',
      headers: {
        From: 'from value'
      }
    }
  }
  ```

- #### create
  Store a new template, including its name, description and (optionally) the template content.
  If the template content is provided, a new version is automatically created and becomes the active version.

  `mg.domains.domainTemplates.create(domainId, templateData)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).Post-fm-4)

  Example:

  ```js
  mg.domains.domainTemplates.create('domainId', {
    name: 'template_name',
    createdBy: '',
    tag: 'tag',
    template: '<html>template content</html>',
    description: 'template description',
    comment: 'Version comment',
    headers: JSON.stringify({
      From: 'from value'
    }),
    engine: 'handlebars'
  }).then(data => console.log(data)) // logs created template
    .catch(err => console.error(err)); // logs any error
  ```

  Template data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | name (required)    | Name of the template being stored. Supports utf-8 characters and name will be down cased. |
  | createdBy    | Optional metadata field api user can indicate who created the template. |
  | tag    | Initial tag of the created version. If the template parameter is provided and the tag is missing, the default value **initial** is used. |
  | template    | Content of the template. |
  | description    | Description of the template being stored |
  | comment    | Version comment. This is valid only if a new version is being created. (template parameter is provided.) |
  | headers    | Key Value json dictionary of headers to be stored with the template. Where key is the header name and value is the header value. The header names **From**, **Subject**, and **Reply-To** are the only ones currently supported. These headers will be inserted into the mime at the time we attempt delivery.Headers set at the message level will override headers set on the template. e.g. Setting the From header at the time of sending will override the From header saved on the template. Additionally, headers generated by templates are not reflected on the accepted event as they are not prepended to the message until the message is prepped for delivery. if a From header is not provided either in the message or template, we will default to postmaster@your-sending-domain.tld |
  | engine    | The template engine to be used when rendering the template. Supported value are handlebars and go (golang template). The default if parameter is not provided is handlebars. |

  Promise returns: created domain template and active version

  ```JS
  {
    name: 'template_name',
    description: 'template description',
    createdAt: new Date('2025-01-03T12:33:10.000Z'),
    createdBy: '',
    id: '46565d87-68b6-4edb-8b3c-34554af4bb77',
    version: {
      tag: 'tag',
      template: '<html>template content</html>',
      engine: 'handlebars',
      mjml: '',
      createdAt: new Date('2025-01-03T12:33:10.000Z'),
      comment: 'Version comment',
      active: true,
      id: '3efd2b85-0f41-4a1d-9898-05d7e7459c4a',
      headers: { From: 'from value' }
    }
  }
  ```

- #### update
  Update the description of a template.

  `mg.domains.domainTemplates.update('domainId', 'templateName', data)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).Put-fm-12)

  Example:

  ```js
  mg.domains.domainTemplates.update('domainId', 'templateName', {
    description: 'new template description',
  }).then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | description    | Update description of the template being updated. |

  Promise returns:
  ```JS
  {
    status: 200,
    message: 'template has been updated',
    templateName: 'template_name'
  }
  ```

- #### destroy
  Delete the template specified in the url. NOTE: This method deletes all versions of the specified template.

  `mg.domains.domainTemplates.destroy('domainId', 'templateName')` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).Delete-fm-13)

  Example:

  ```js
  mg.domains.domainTemplates.destroy('domainId', 'templateName')
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:
  ```JS
  {
    status: 200,
    message: 'template has been deleted',
    templateName: 'template_name'
  }
  ```

- #### destroyAll
  Delete all templates and their versions for the domain.

  `mg.domains.domainTemplates.destroyAll('domainId')` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).DeleteAll-fm-15)

  Example:

  ```js
  mg.domains.domainTemplates.destroyAll('domainId')
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:
  ```JS
  {
    status: 200,
    message: "templates have been deleted"
  }
  ```

- #### listVersions
  Returns a paginated list of template versions.

  `mg.domains.domainTemplates.listVersions('domainId', 'template_name', queryData)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).GetVersionsPage-fm-8)

  Example:

  ```js
  mg.domains.domainTemplates.listVersions('domainId', 'template_name', {
    limit: 10,
  })
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Query data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | limit     | Maximum number of records to return. (100 by default) |
  | page      | params from previous response's 'paging' object. Value must be stringified as query params. e.g. '?page=first','?page=next&p=name-of-last-item'|

  Promise returns:
  ```JS
  {
    template: {
      name: 'template_name',
      description: 'template description',
      createdAt: new Date('2025-01-03T12:33:10.000Z'),
      createdBy: '',
      id: '46565d87-68b6-4edb-8b3c-34554af4bb77',
      versions: [
        {
        tag: 'tag',
        engine: 'handlebars',
        mjml: '',
        createdAt:  new Date('2025-01-03T12:33:10.000Z'),
        comment: 'Version comment',
        active: true,
        id: 'b3f09533-a03f-4e10-9aac-a91115297b6c'
        }
       ]
    }
  }
  ```

- #### getVersion

  Retrieve the information and content of the specified version of a template.

  `mg.domains.domainTemplates.getVersion('domainId', 'template_name', 'tag')` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).GetVersion-fm-7)

  Example:

  ```js
  mg.domains.domainTemplates.getVersion('domainId', 'template_name','tag')
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:
  ```JS
  {
    template: {
      name: 'template_name',
      description: 'template description',
      createdAt: new Date('2025-01-03T12:33:10.000Z'),
      createdBy: '',
      id: '46565d87-68b6-4edb-8b3c-34554af4bb77',
      versions: [
        {
          tag: 'tag',
          template: '<html>template content</html>',
          engine: 'handlebars',
          mjml: '',
          createdAt: new Date('2025-01-03T12:33:10.000Z'),
          comment: 'Version comment',
          active: true,
          id: 'b3f09533-a03f-4e10-9aac-a91115297b6c',
          headers: {
            From: 'from value'
          }
        }
      ]
    }
  }
  ```

- #### createVersion
  Adds a new template version. If the template doesn’t contain any other versions, the first version becomes active. A template can store up to 40 versions.

  `mg.domains.domainTemplates.createVersion('domainId', 'template_name', versionData)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).PostVersion-fm-5)

  Example:

  ```js
  mg.domains.domainTemplates.createVersion('domainId', 'template_name',{
    {
      template: `<html>template content</html>`,
      tag: 'v1',
      engine: 'handlebars',
      comment: 'comment',
      active: 'yes',
      headers: JSON.stringify({
        From: 'from value'
      })
    }
  })
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Template version data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | template    | Content of the template. |
  | tag    | Initial tag of the created version. If the template parameter is provided and the tag is missing, the default value **initial** is used. |
  | engine    | The template engine to be used when rendering the template. Supported value are handlebars and go (golang template). The default if parameter is not provided is handlebars. |
  | comment    | Version comment. This is valid only if a new version is being created. (template parameter is provided.) |
  | active     | If this flag is set to yes, this version becomes active. |
  | headers    | Key Value json dictionary of headers to be stored with the template. Where key is the header name and value is the header value. The header names **From**, **Subject**, and **Reply-To** are the only ones currently supported. These headers will be inserted into the mime at the time we attempt delivery.Headers set at the message level will override headers set on the template. e.g. Setting the From header at the time of sending will override the From header saved on the template. Additionally, headers generated by templates are not reflected on the accepted event as they are not prepended to the message until the message is prepped for delivery. if a From header is not provided either in the message or template, we will default to postmaster@your-sending-domain.tld |

  Promise returns:
  ```JS
  {
    status: 200,
    message: 'new version of the template has been stored',
    template: l {
      name: 'template_name',
      description: 'new template description',
      createdAt: new Date('2025-01-03T12:33:10.000Z'),
      createdBy: '',
      id: '46565d87-68b6-4edb-8b3c-34554af4bb77',
      version: {
        tag: 'v1',
        template: '<html>template content</html>',
        engine: 'handlebars',
        mjml: '',
        createdAt: new Date('2025-01-03T13:41:26.000Z'),
        comment: 'comment',
        active: true,
        id: '3efd2b85-0f41-4a1d-9898-05d7e7459c4a',
        headers: [Object]
      }
    }
  }
  ```

- #### updateVersion
  Update information or content of the specific template version.
  Existing fields not included in the request will not be changed

  `mg.domains.domainTemplates.updateVersion('domainId', 'template_name', 'tag' , versionData)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).PutVersion-fm-11)

  Example:

  ```js
  mg.domains.domainTemplates.updateVersion('domainId', 'template_name', 'v1',{
    {
      template: `<html>template content</html>`,
      engine: 'handlebars',
      comment: 'comment',
      active: 'yes',
      headers: JSON.stringify({
        From: 'from value'
      })
    }
  })
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```

  Template version data object may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | template    | Content of the template. |
  | engine    | The template engine to be used when rendering the template. Supported value are handlebars and go (golang template). The default if parameter is not provided is handlebars. |
  | comment    | Version comment. This is valid only if a new version is being created. (template parameter is provided.) |
  | active     | If this flag is set to yes, this version becomes active. |
  | headers    | Key Value json dictionary of headers to be stored with the template. Where key is the header name and value is the header value. The header names **From**, **Subject**, and **Reply-To** are the only ones currently supported. These headers will be inserted into the mime at the time we attempt delivery.Headers set at the message level will override headers set on the template. e.g. Setting the From header at the time of sending will override the From header saved on the template. Additionally, headers generated by templates are not reflected on the accepted event as they are not prepended to the message until the message is prepped for delivery. if a From header is not provided either in the message or template, we will default to postmaster@your-sending-domain.tld |

  Promise returns:
  ```JS
  {
     status: 200,
     message: 'version has been updated',
     templateName: 'template_name',
     templateVersion: {
      tag: 'v1'
     }
  }
  ```

- #### destroyVersion
  Delete a specific template version.

  `mg.domains.domainTemplates.destroyVersion('domainId', 'template_name', 'tag' )` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Templates/#tag/Templates/operation/httpapi.(*TemplateAPIControler).DeleteVersion-fm-14)

  Example:

  ```js
  mg.domains.domainTemplates.destroyVersion('domainId', 'template_name', 'v1')
    .then(data => console.log(data)) // logs data
    .catch(err => console.error(err)); // logs any error
  ```
  Promise returns:
    ```JS
    {
      status: 200,
      message: 'version has been deleted',
      templateName: 'template_name',
      templateVersion: { tag: 'v1' }
    }
    ```

### Domain tracking

- #### getTracking

  Mailgun offers tracking for clicks, unsubscribes, and opens, with optional HTTPS protocol support on tracking URLs. To enable HTTPS, Mailgun uses Let’s Encrypt with HTTP-01 challenges through your existing tracking CNAME record to issue a TLS certificate. This setup also includes support for HTTP Strict Transport Security (HSTS) for enhanced security.

  `mg.domains.domainTracking.getTracking(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking)

  Example:

  ```JS
  mg.domains.domainTracking.getTracking('foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    "click": {
      "active": false
    },
    "open": {
      "active": false
    },
    "unsubscribe": {
      "active": false,
      "html_footer": "\n<br>\n<p><a href=\"%unsubscribe_url%\">unsubscribe</a></p>\n",
      "text_footer": "\n\nTo unsubscribe click: <%unsubscribe_url%>\n\n"
    }
  }
  ```

- #### updateTracking

  A common method to turn on/off the click, open, and unsubscribe tracking at the domain level.

  `mg.domains.domainTracking.updateTracking(domain, trackingType, data)`

  - Open Tracking Example:

    [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/PUT-v3-domains--name--tracking-open)
    ```js
    mg.domains.domainTracking.updateTracking('foobar.example.com', 'open', {
      active: true,
      place_at_the_top: true,
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Open tracking data object properties:

    | Property | Description                                |
    |:----------|:-------------------------------------------|
    | active    | Boolean, enables or disables open tracking |
    | place_at_the_top| Setting this param to true will place the open tracking pixel at the top of the HTML body when inserted into the email mime. Omit this param to keep current setting. |

    Promise returns:

    ```JS
    {
      message: 'Tracking settings have been updated',
      open: {
        active: true,
        place_at_the_top: true,
      }
    }
    ```

  - Click Tracking Example:

    [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/PUT-v3-domains--name--tracking-click)
    ```JS
    mg.domains.domainTracking.updateTracking('foobar.example.com', 'click', {active: true})
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Click tracking data object properties:

    | Property | Description                                 |
    |:----------|:--------------------------------------------|
    | active    | Boolean, enables or disables click tracking |

    Promise returns:

    ```JS
    {
      message: 'Tracking settings have been updated',
      click: {
        active: true
      }
    }
    ```

  - Unsubscribe Tracking Example

    [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/PUT-v3-domains--name--tracking-unsubscribe)
    ```js
    mg.domains.domainTracking.updateTracking('foobar.example.com', 'unsubscribe', {
        active: true,
        html_footer: "\n<br>\n<p><a href=\"%unsubscribe_url%\">unsubscribe</a></p>\n",
        text_footer: "\n\nTo unsubscribe click: <%unsubscribe_url%>\n\n"
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Unsubscribe Tracking data object properties:

    | Property   | Description                                                   |
    |:------------|:--------------------------------------------------------------|
    | active      | Boolean, enables or disables unsubscribe tracking             |
    | html_footer | string appended to html emails for managing unsubscribe links |
    | text_footer | string appended to html emails for managing unsubscribe links |

    Promise returns:

    ```JS
    {
      message: 'Tracking settings have been updated',
      unsubscribe: {
        active: true,
        html_footer: '\n<br>\n<p><a href=\'%unsubscribe_url%\">unsubscribe</a></p>\n',
        text_footer: '\n\nTo unsubscribe click: <%unsubscribe_url%>\n\n'
      }
    }
    ```

- #### get
  Get x509 TLS certificate and status

  `mg.domains.domainTracking.get(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/httpapi.(*HttpAPI).getStatusV2-fm-8)

  Example:

  ```JS
  mg.domains.domainTracking.get('foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    responseStatusCode: 200,
    status: 'expired',
    error: 'x509 certificate has expired',
    certificate: '{CERT}';
  }
  ```

- #### generate
  Initiates generation of a TLS certificate for the tracking domain in a background task. Once generation is enqueued, you may poll the status endpoint in location field to check for success. Domain address must be formatted as `webPrefix.domainName` from domains settings

  `mg.domains.domainTracking.generate(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/httpapi.(*HttpAPI).generateStatusV2-fm-8)

  Example:

  ```JS
  mg.domains.domainTracking.generate('email.foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    message: 'Initiated x509 key pair generation',
    location: '/v2/x509/example.com/status',
    status: 202,
  }
  ```

- #### regenerate
  Initiates regeneration of an expired TLS certificate for the tracking domain in a background task. Once generation is enqueued, you may poll status endpoint in location field to check for success. This will not regenerate an existing certificate that is still valid. Domain address must be formatted as `webPrefix.domainName` from domains settings

  `mg.domains.domainTracking.regenerate(domainAddress)` [api docs](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Domain-Tracking/#tag/Domain-Tracking/operation/httpapi.(*HttpAPI).generateStatusV2-fm-8)

  Example:

  ```JS
  mg.domains.domainTracking.regenerate('email.foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    message: 'Initiated x509 key pair generation',
    location: '/v2/x509/example.com/status',
    status: 202,
  }
  ```

### Events

- #### get

  `mg.events.get(domain, data)`

  Example:

  ```js
  mg.events.get('foobar.example.com', {
      page: 'mypageid',
      event: 'opened'
  }).then(data => console.log(data.items)) // logs array of event objects
    .catch(err => console.error(err)); // logs any error
  ```

  Options:


  | Parameter | Description                                                                                                                                                                                                                                                                     |
  |:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | page      | Fetches the specified page of log records, assuming that the URL was returned by the previous request                                                                                                                                                                           |
  | begin     | The beginning of the search time range. It can be specified as a string (see Date Format) or linux epoch seconds. Refer to Time Range for details.                                                                                                                              |
  | end       | The end of the search time range. It can be specified as a string (see Date Format) or linux epoch seconds. Refer to Time Range for details.                                                                                                                                    |
  | ascending | Defines the direction of the search time range if the range end time is not specified. Can be either yes or no. Refer to Time Range for details.                                                                                                                                |
  | limit     | Number of entries to return. (300 max)                                                                                                                                                                                                                                          |
  | **field** | **field** is the name of the *[Filter Field](https://documentation.mailgun.com/en/latest/api-events.html#filter-field)*. The value of the parameter should be a valid Filter Expression. Several field filters can be specified in one request. If the same field is mentioned, more then once, then all its filter expressions are combined with AND operator. |
  - #### Example with Date and *Filter field*
    ```js
      const date = new Date(2023, 7, 2, 0, 0, 0, 0); // Wed Aug 02 2023 00:00:00 GMT+0300
        const events = await mg.events.get('foobar.example.com', {
          begin: date.toUTCString(), // 'Tue, 01 Aug 2023 21:00:00 GMT'
          ascending: 'yes',
          limit: 5,
          event: 'delivered'
        });
    ```
  Promise returns: items (array of event objects), pages (paging keys grouped by id)

  ```JS
  {
  items: [{
      type: 'accepted',
      summary: 'got it',
      content: { more: 'data' },
      timestamp: Wed Nov 19 2014 10:32:57 GMT-0800 (PST) },
    }],
    pages: {
      first: { id: 'first', number: 'W3siYSI6IGZhbHNlLC', url: 'apiurl' },
      last: { id: 'last', number: 'W3siYSI6IGZhbHNlLC', url: 'apiurl' },
      next: { id: 'next', number: W3siYSI6IGZhbHNlLC'', url: 'apiurl' },
      previous: { id: 'previous', number: 'W3siYSI6IGZhbHNlLC', url: 'apiurl' }
    }
  }
  ```

### Stats
- #### Stats Options

    | Parameter  | Description                                                                                                                |
    |:-----------|:---------------------------------------------------------------------------------------------------------------------------|
    | event      | The type of the event. For a complete list of all events written to the log see the `Event Types` table below. (Required)  |
    | start      | The starting time. Should be in :rfc:`2822#page-14` or unix epoch format. Default: 7 days from the current time.           |
    | end        | The ending date. Should be in :rfc:`2822#page-14` or unix epoch format. Default: current time.                             |
    | resolution | Can be either ``hour``, ``day`` or ``month``. Default: ``day``                                                             |
    | duration   | Period of time with resolution encoded. If provided, overwrites the start date. See list below.                                             |

    Duration is a string that represents a period of time with some resolution. It has a format `[0-9]+[m,d,h]` where

    - `h` - an hour
    - `d` - a day
    - `m` - a month

    Examples:

    - `24h` - a period of 24 hours (a day) with hourly resolution
    - `1d` - a period of 1 day with daily resolution
    - `2m` - a period of 2 months with monthly resolution

    Event Types

    | Event Type   | Description                                                                                                                                                                       |
    |:-------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | accepted     | Mailgun accepted the request to send/forward the email and the message has been placed in queue.                                                                                  |
    | delivered    | Mailgun sent the email and it was accepted by the recipient email server.                                                                                                         |
    | failed       | Mailgun could not deliver the email to the recipient email server.                                                                                                                |
    | opened       | The email recipient opened the email and enabled image viewing. Open tracking must be enabled in the Mailgun control panel, and the CNAME record must be pointing to mailgun.org. |
    | clicked      | The email recipient clicked on a link in the email. Click tracking must be enabled in the Mailgun control panel, and the CNAME record must be pointing to mailgun.org.            |
    | unsubscribed | The email recipient clicked on the unsubscribe link. Unsubscribe tracking must be enabled in the Mailgun control panel.                                                           |
    | complained   | The email recipient clicked on the spam complaint button within their email client. Feedback loops enable the notification to be received by Mailgun.                             |
    | stored       | Mailgun has stored an incoming message

- #### getDomain

  `mg.stats.getDomain(domain, query)`

  Example:

  ```js
  mg.stats.getDomain('foobar.example.com', {event: ['delivered', 'accepted', 'failed', 'complained']})
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    start: Sun Mar 15 2015 17:00:00 GMT-0700 (PDT),
    end: Sun Mar 22 2015 17:00:00 GMT-0700 (PDT),
    resolution: 'day',
    stats: [{
      time: Sun Mar 15 2015 17:00:00 GMT-0700 (PDT),
      delivered: { smtp: 2, http: 1, total: 3 }
    }]
  }
  ```

- #### getAccount

  `mg.stats.getDomain(domain, query)`

  Example:

  ```js
  mg.stats.getDomain('foobar.example.com', {event: ['delivered', 'accepted', 'failed', 'complained']})
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    start: Sun Mar 15 2015 17:00:00 GMT-0700 (PDT),
    end: Sun Mar 22 2015 17:00:00 GMT-0700 (PDT),
    resolution: 'day',
    stats: [{
      time: Sun Mar 15 2015 17:00:00 GMT-0700 (PDT),
      delivered: { smtp: 2, http: 1, total: 3 }
    }]
  }
  ```


  ```

### Metrics
  Mailgun collects many different events and generates event metrics which are available in your Control Panel. This data is also available via our analytics metrics [API endpoint](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Metrics/#tag/Metrics).

- #### getAccount
  Gets filtered metrics for an account

  `mg.metrics.getAccount(MetricsQuery);`

  Example:
  ```JS
    mg.metrics.getAccount({
      start: '2024-12-16T10:47:51.661Z',
      end: '2024-12-23T10:47:51.661Z',
      resolution: 'hour',
      metrics: ['opened_count'],
      filter: {
        AND: [{
          attribute: 'domain',
          comparator: 'contains',
          values: [{
            value: 'mailgun'
          }]
        }]
      },
      include_subaccounts: true,
      include_aggregates: true
    })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
  ```
  *getAccount* method accepts data object with next properties:
  | Property    | Type |Description                                                                                                                                   |
  |:--------------|:-----|:-----------------------------------------------------------------------------------------------------------------------------------|
  | start      | String that contains date in RFC 2822 format: https://datatracker.ietf.org/doc/html/rfc2822.html#page-14 or JS Date object | A start date (default: 7 days before current time)|
  | end        | String that contains date in RFC 2822 format: https://datatracker.ietf.org/doc/html/rfc2822.html#page-14 or JS Date object | An end date (default: current time)|
  | resolution | String | A resolution in the format of 'day' 'hour' 'month'. Default is day.|
  | duration   | String | A duration in the format of '1d' '2h' '2m'. If duration is provided then it is calculated from the end date and overwrites the start date.|
  | dimensions | Array of strings | Attributes of the metric data such as 'subaccount'.|
  | metrics    | Array of strings | Name of the metrics to receive the stats for such as 'processed_count'.|
  | filter    | object | Filters to apply to the query. The 'AND' property is required and should contains array of filters objects. See this [document](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Metrics/#tag/Metrics/operation/api.(*MetricsAPI).PostMetricQuery-fm-3!path=filter&t=request) for an object shape. |
  | include_subaccounts | Boolean | Include stats from all subaccounts. |
  | include_aggregates  | Boolean | Include top-level aggregate metrics.|

  Promise returns: MetricsResult

  ```JS
  {
    start: new Date('2024-12-16T01:00:00.000Z'),
    end: new Date('2024-12-23T00:00:00.000Z'),
    resolution: 'hour',
    dimensions: [ 'time' ],
    pagination: { sort: '', skip: 0, limit: 1500, total: 1 },
    items: [
      {
        dimensions: [{
          {
            dimension: 'time',
            value: 'Sat, 21 Dec 2024 17:00:00 +0000',
            display_value: 'Sat, 21 Dec 2024 17:00:00 +0000'
          }
        }],
        metrics: { opened_count: 1 }
      },
      ...
    ],
    aggregates: { metrics: { opened_count: 1 } },
    status: 200
  }
  ```

- #### getAccountUsage
  Gets filtered **usage metrics** for an account
  `mg.metrics.getAccountUsage(MetricsQuery);`

  Example:
  ```JS
    mg.metrics.getAccountUsage({
      start: '2024-12-16T10:47:51.661Z',
      end: '2024-12-23T10:47:51.661Z',
      resolution: 'hour',
      metrics: ['opened_count'],
      filter: {
        AND: [{
          attribute: 'domain',
          comparator: 'contains',
          values: [{
            value: 'mailgun'
          }]
        }]
      },
      include_subaccounts: true,
      include_aggregates: true
    })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
  ```
  *getAccountUsage* method accepts data object with next properties:
  | Property    | Type |Description                                                                                                                                   |
  |:--------------|:-----|:-----------------------------------------------------------------------------------------------------------------------------------|
  | start      | String that contains date in RFC 2822 format: https://datatracker.ietf.org/doc/html/rfc2822.html#page-14 or JS Date object | A start date (default: 7 days before current time)|
  | end        | String that contains date in RFC 2822 format: https://datatracker.ietf.org/doc/html/rfc2822.html#page-14 or JS Date object | An end date (default: current time)|
  | resolution | String | A resolution in the format of 'day' 'hour' 'month'. Default is day.|
  | duration   | String | A duration in the format of '1d' '2h' '2m'. If duration is provided then it is calculated from the end date and overwrites the start date.|
  | dimensions | Array of strings | Attributes of the metric data such as 'subaccount'.|
  | metrics    | Array of strings | Name of the metrics to receive the stats for such as 'processed_count'.|
  | filter    | object | Filters to apply to the query. The 'AND' property is required and should contains array of filters objects. See this [document](https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Metrics/#tag/Metrics/operation/api.(*MetricsAPI).PostMetricQuery-fm-3!path=filter&t=request) for an object shape. |
  | include_subaccounts | Boolean | Include stats from all subaccounts. |
  | include_aggregates  | Boolean | Include top-level aggregate metrics.|

  Promise returns: MetricsResult

  ```JS
  {
    start: new Date('2024-12-16T01:00:00.000Z'),
    end: new Date('2024-12-23T00:00:00.000Z'),
    resolution: 'hour',
    dimensions: [ 'time' ],
    pagination: { sort: '', skip: 0, limit: 1500, total: 1 },
    items: [
      {
        dimensions: [{
          {
            dimension: 'time',
            value: 'Sat, 21 Dec 2024 17:00:00 +0000',
            display_value: 'Sat, 21 Dec 2024 17:00:00 +0000'
          }
        }],
        metrics: { opened_count: 1 }
      },
      ...
    ],
    aggregates: { metrics: { opened_count: 1 } },
    status: 200
  }
  ```

### Suppressions

- #### list

  `mg.suppressions.list(domain, suppressionType, query?)`

  - #### Bounces Example:

    ```js
    mg.suppressions.list('foobar.example.com', 'bounces')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - #### Unsubscribes Example:

    ```js
    mg.suppressions.list('foobar.example.com', 'unsubscribes')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - #### Complaints Example:

    ```js
    mg.suppressions.list('foobar.example.com', 'complaints')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Promise returns:

    ```JS
    {
    items: [
      {
        type: "bounces",
        address: "unknown@unknown.com",
        code: 550,
        error: "No such mailbox",
        created_at: Fri Oct 21 2011 04:02:55 GMT-0700 (PDT)
      }],
    pages: {
      first: { id: "first", page: "", address: "", url: "apiurl" },
      last: { id: "last", page: "", address: "", url: "apiurl" },
      next: { id: "next", page: "", address: "", url: "apiurl" },
      previous: { id: "prev", page: "", address: "", url: "apiurl" }
    }
    }
    ```

- #### get

  `mg.suppressions.get(domain, suppressionType, address)`

  - #### Bounces Example:

    ```js
    mg.suppressions.get('foobar.example.com', 'bounces', 'address@example.com')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - #### Unsubscribes Example:

    ```js
    mg.suppressions.get('foobar.example.com', 'unsubscribes', 'address@example.com')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  - #### Complaints Example:

    ```js
    mg.suppressions.get('foobar.example.com', 'complaints', 'address@example.com')
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

  Response example:

  ```JS
  {
    type: "bounces",
    address: "address?@unknown.com",
    tags: [ "*" ],
    created_at: Fri Oct 21 2011 05:02:55 GMT-0700 (PDT)
  }
  ```

-   #### create
    `mg.suppressions.create(domain, suppressionType, data || data[])`

    - #### Bounces Example:
      ```JS
      mg.suppressions.create('foobar.example.com', 'bounces', [{address: 'bob@example.com'}])
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Bounces Options: Contains an array with the following object properties

      | Parameter  | Description                                                                     |
      |:-----------|:--------------------------------------------------------------------------------|
      | address    | Valid email address                                                             |
      | code       | Error code (optional, default: 550)                                             |
      | error      | Error description (optional, default: empty string)                             |
      | created_at | Timestamp of a bounce event in RFC2822 format (optional, default: current time) |

      Promise returns:

      ```js
      {
        message: "1 address has been added to the bounces table"
      }
      ```

    - #### Unsubscribes Example:

      ```js
      mg.suppressions.create('foobar.example.com', 'unsubscribes', {address: 'bob@example.com'})
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Unsubscribes Options: Contains an array with the following object properties

      | Parameter  | Description                                                                                                      |
      |:-----------|:-----------------------------------------------------------------------------------------------------------------|
      | address    | Valid email address                                                                                              |
      | tag        | Tag to unsubscribe from, use * to unsubscribe an address from all domain’s correspondence (optional, default: *) |
      | tags       | Array with tags to unsubscribe from |
      | created_at | Timestamp of a bounce event in RFC2822 format (optional, default: current time)                                  |

      Promise returns:

      ```JS
      {
        message: "1 address has been added to the unsubscribes table"
      }
      ```
       - #### Unsubscribe from one tag
          ```js
          mg.suppressions.create('foobar.example.com', 'unsubscribes', {address: 'bob@example.com', tag: 'your_tag_to_unsubscribe']})
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.error(err)); // logs any error
          ```
          Promise returns:

          ```JS
          {
            message: "1 address has been added to the unsubscribes table"
          }
          ```
      - #### Unsubscribe from particular tags
          ```js
          mg.suppressions.create('foobar.example.com', 'unsubscribes', [{address: 'bob@example.com', tags: ['your_tag_to_unsubscribe', 'another_tag_to_unsubscribe']}])
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.error(err)); // logs any error
          ```
          Promise returns:

          ```JS
          {
            message: "1 address has been added to the unsubscribes table"
          }
          ```

    - #### Complaints Example:

      ```js
      mg.suppressions.create('foobar.example.com', 'complaints', [{address: 'bob@example.com'}])
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Complaints Options: Contains an array with the following object properties

      | Parameter  | Description                                                                                                      |
      |:-----------|:-----------------------------------------------------------------------------------------------------------------|
      | address    | Valid email address                                                                                              |
      | created_at | Timestamp of a bounce event in RFC2822 format (optional, default: current time)                                  |

      Promise returns:

      ```JS
      {
        message: "1 address has been added to the complaints table"
      }
      ```

-   #### destroy
    `mg.suppressions.destroy(domain, suppressionType, address)`

    - #### Bounces Example:

      ```JS
      mg.suppressions.destroy('foobar.example.com', 'bounces', 'bob@example.com')
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Promise returns:

      ```JS
      {
        message: "Bounced address has been removed",
        value: "",
        address: "bob@example.com",
        status: 200
      }
      ```

    - #### Unsubscribes Example:

      ```js
      mg.suppressions.destroy('foobar.example.com', 'unsubscribes', 'bob@example.com')
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Promise returns:

      ```JS
      {
        message: 'Unsubscribe event has been removed',
        value: '',
        address: 'bob@example.com',
        status: 200
      }
      ```

    - #### Complaints Example:

      ```js
      mg.suppressions.destroy('foobar.example.com', 'complaints', 'bob@example.com')
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.error(err)); // logs any error
      ```

      Promise returns:

      ```JS
        message: 'Spam complaint has been removed',
        value: '',
        address: 'bob@example.com',
        status: 200
      ```


### Webhooks

- #### list

  `mg.webhooks.list(domain, query)`

  Example:

  ```js
  mg.webhooks.list('foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    open: { 'url': 'http://requestb.in' },
    click: { 'url': 'http://requestb.in' },
    bounce: { 'url': 'http://requestb.in' },
    deliver: { 'url': 'http://requestb.in' },
    drop: { 'url': 'http://requestb.in' },
    spam: { 'url': 'http://requestb.in' },
    unsubscribe: { 'url': 'http://requestb.in' },
    click: { 'url': 'http://requestb.in' },
    open: { 'url': 'http://requestb.in' },
  }
  ```

- #### get

  `mg.webhooks.get(domain, id)`

  Example:

  ```js
  mg.webhooks.get('foobar.example.com', 'open') // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    'open': { 'url': 'http://requestb.in', 'urls': ['trackclick.com'] }
  }
  ```

- #### create

  `mg.webhooks.create(domain, id, data, test)`

  Example:

  ```js
  mg.webhooks.create('foobar.example.com', 'open', 'http://requestb.in') // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    'open': { 'url': 'http://requestb.in', 'urls': ['http://requestb.in'] }
  }
  ```

  Test Webhook Example:

  ```JS
  mg.webhooks.get('foobar.example.com', 'open', 'http://requestb.in', true) // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    'code': '500',
    'message': 'Hi!'
  }
  ```

- #### update

  `mg.webhooks.update(domain, id, url, test)`

  Example:

  ```js
  mg.webhooks.update('foobar.example.com', 'open', 'http://requestb.in') // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    'open': { 'url': 'http://requestb.in', 'urls': ['http://requestb.in'] }
  }
  ```

  ```js
  mg.webhooks.update('foobar.example.com', 'open', ['http://requestb.in', 'http://requestb1.in' ]) // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:
  ```JS
  {
    'open': { 'url': 'http://requestb.in', 'urls': ['http://requestb.in', 'http://requestb1.in'] }
  }
  ```


- #### destroy

  `mg.webhooks.destroy(domain, id)`

  Example:

  ```JS
  mg.webhooks.update('foobar.example.com', 'open') // bounce, deliver, drop, spam, unsubscribe, click, open
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    'open': { 'url': 'http://requestb.in', 'urls': ['http://requestb.in']}
  }
  ```

### Routes

- #### list

  `mg.routes.list(query)`

  Example:

  ```JS
  mg.routes.list()
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  [
    {
      actions: [ 'forward("http://myhost.com/messages/")', 'stop()' ],
      created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
      description: 'sample',
      expression: 'match_recipient(".*@example.com")',
      id: '562da483125730608a7d1719',
      priority: 0
    }
  ]
  ```

- #### get

  `mg.routes.get(id)`

  Example:

  ```js
  mg.routes.get('562da483125730608a7d1719')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    actions: [ 'forward("http://myhost.com/messages/")', 'stop()' ],
    created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
    description: 'sample',
    expression: 'match_recipient(".*@example.com")',
    id: '562da483125730608a7d1719',
    priority: 0
  }
  ```

- #### create

  `mg.routes.create(options)`

  Example:

  ```JS
  mg.routes.create({
      priority: 0,
      description: 'sample',
      expression: 'match_recipient(".*@example.org")',
      action: ['forward("http://myhost.com/messages/")', 'stop()']
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```js
  {
    actions: [ 'forward("http://myhost.com/messages/")', 'stop()' ],
    created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
    description: 'sample',
    expression: 'match_recipient(".*@example.com")',
    id: '562da483125730608a7d1719',
    priority: 0
  }
  ```

- #### update

  `mg.routes.update(id, options)`

  Example:

  ```JS
  mg.routes.update('562da483125730608a7d1719', {
      priority: 0,
      description: 'sample',
      expression: 'match_recipient(".*@example.org")',
      action: ['forward("http://myhost.com/messages/")', 'stop()']
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    actions: [ 'forward("http://myhost.com/messages/")', 'stop()' ],
    created_at: 'Mon, 26 Oct 2015 03:56:51 GMT',
    description: 'sample',
    expression: 'match_recipient(".*@example.com")',
    id: '562da483125730608a7d1719',
    message: 'Route has been updated',
    priority: 0
  }
  ```

- #### destroy

  `mg.routes.destroy(id)`

  Example:

  ```js
  mg.routes.destroy('562da483125730608a7d1719')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    id: '562da483125730608a7d1719',
    message: 'Route has been deleted'
  }
  ```

### Validation

- #### get

  `mg.validate.get(address)`

  Example:

  ```JS
  mg.validate.get('foo@mailgun.net')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    address: 'alice@example.com',
    did_you_mean: null,
    is_valid: false,
    parts: {
       display_name: null,
        domain: null,
        local_part: null
    }
  }
  ```

### Multiple validation
https://documentation.mailgun.com/en/latest/api-email-validation.html#email-validation
- #### create
  `mg.validate.multipleValidation.create('name_of_the_list', { file })`

  ```js
  const fsPromises = require('fs').promises;
  const filepath = path.resolve(__dirname, '../path_to_your_file_with_emails_list.csv');

  ...

  (async () => {
    try {
      const file = {
        filename: 'test.csv',
        data: await fsPromises.readFile(filepath)
      };

      const validateBulkResult = await mg.validate.multipleValidation.create('name_of_the_list', { file });
      console.log('validateBulkResult', validateBulkResult);
    } catch (error) {
      console.error(error);
    }
  })();
  ```

  Response shape:
  ```JSON
  {
    "id": "name_of_the_list",
    "message": "The validation job was submitted."
  }
  ```

- #### list

  `mg.validate.multipleValidation.list()`

  ```js
  mg.validate.multipleValidation.list()
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Response shape:
  ```JSON
  {
    "jobs": [
      {
        "created_at": 1643965937,
        "download_url": {
          "csv": "csv-url",
          "json": "json-url"
        },
        "id": "name_of_the_list",
        "quantity": 40,
        "records_processed": 40,
        "status": "uploaded",
        "summary": {
          "result": {
            "catch_all": 0,
            "deliverable": 0,
            "do_not_send": 0,
            "undeliverable": 0,
            "unknown": 40
          },
          "risk": { "high": 0, "low": 0, "medium": 0, "unknown": 40 }
        }
      }
    ],
    "paging": {
      "first": "https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=first&pivot=",
      "last": "https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=last&pivot=",
      "next": "https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=next&pivot=b4808b5b-1111-2222-3333-6cd0b63f41ea",
      "prev": "https://api.mailgun.net/v4/address/validate/bulk?limit=100&page=prev&pivot="
    },
    "total": 1
  }
  ```

- #### get

  `mg.validate.multipleValidation.get('name_of_the_list')`

  ```js
  mg.validate.multipleValidation.get('name_of_the_list')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Response shape:
  ```JSON
  {
    "created_at": 1643965937,
    "download_url": {
      "csv": "csv-url",
      "json": "json-url"
    },
    "id": "name_of_the_list",
    "quantity": 40,
    "records_processed": 40,
    "responseStatusCode": 200,
    "status": "uploaded",
    "summary": {
      "result": {
        "catch_all": 0,
        "deliverable": 0,
        "do_not_send": 0,
        "undeliverable": 0,
        "unknown": 40
      },
      "risk": { "high": 0, "low": 0, "medium": 0, "unknown": 40 }
    }
  }
  ```

- #### destroy

  `mg.validate.multipleValidation.destroy('name_of_the_list');`

  cancels bulk validation job
  ```JS
  mg.validate.multipleValidation.destroy('name_of_the_list');
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Response shape:
  ```JS
  {
    body: "Validation job canceled.",
    status: 200
  }
  ```

### Mailing lists

  A client to manage mailing lists.

- #### list

  `mg.lists.list()`

  Example:

  ```js
  mg.lists.list()
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  [
    {
      access_level: 'readonly',
      address: 'noreply@sample.com',
      created_at: 'Wed, 27 Oct 2021 21:59:21 -0000',
      description: '',
      members_count: 0,
      name: '',
      reply_preference: 'list'
    }
  ]
  ```

- #### get

  `mg.lists.get(mailListAddress)`

  Example:

  ```JS
  mg.lists.get('noreply@sample.com')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    access_level: 'readonly',
    address: 'noreply@sample.com',
    created_at: 'Thu, 28 Oct 2021 00:16:56 -0000',
    description: '',
    members_count: 0,
    name: '',
    reply_preference: 'list'
  }
  ```

- #### create

  `mg.lists.create(data)`

  Example:

  ```js
  mg.lists.create({
      address: 'reply@sample.com',
      name: 'Reply Address', // optional, modifiable on website
      description: 'Mailing lists for repliable address', // optional, modifiable on website
      access_level: 'readonly', // optional, modifiable on website
      reply_preference: 'list', // optional, modifiable on website
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    access_level: 'readonly',
    address: 'reply@sample.com',
    created_at: 'Thu, 28 Oct 2021 03:12:17 -0000',
    description: 'Mailing lists for repliable address',
    members_count: 0,
    name: 'Reply Address',
    reply_preference: 'list'
  }
  ```

- #### update

  `mg.lists.update(mailListAddress)`

  Example:

  ```js
  mg.lists.update('reply@sample.com', {
      address: 'foo@sample.com',
      name: 'Foo', // optional, modifiable on website
      description: 'Foo bar bat', // optional, modifiable on website
      access_level: 'members', // optional, modifiable on website
      reply_preference: 'sender', // optional, modifiable on website
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    access_level: 'members',
    address: 'foo@sample.com',
    created_at: 'Thu, 28 Oct 2021 03:21:15 -0000',
    description: 'Foo bar bat',
    members_count: 0,
    name: 'Foo',
    reply_preference: 'sender'
  }
  ```

- #### destroy

  `mg.lists.destroy(mailListAddress)`

  Example:

  ```js
  mg.lists.destroy('foo@sample.com')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    address: 'foo@sample.com',
    message: 'Mailing list has been removed'
  }
  ```

### Mailing list members
A client to manage members within a specific mailing list.

- #### listMembers

  `mg.lists.members.listMembers(mailListAddress)`

  Example:

  ```js
  mg.lists.members.listMembers('reply@sample.com')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  [
    {
      address: 'foo@bar.com',
      name: 'Jane Doe',
      subscribed: true,
      vars: { age: 50 }
    }
  ]
  ```

- #### getMember
  `mg.lists.members.getMember(mailListAddress, mailListMemberAddress)`

  Example:

  ```JS
  mg.lists.members.getMember('reply@sample.com', 'foo@bar.com')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    address: 'foo@bar.com',
    name: 'Jane Doe',
    subscribed: true,
    vars: { age: 50 }
  }
  ```

- #### createMember
  `mg.lists.members.createMember(mailListAddress, data)`

  Example:

  ```JS
  mg.lists.members.createMember('reply@sample.com', {
      address: 'bat@bar.com',
      name: 'John Smith', // optional, modifiable on website
      vars: {hobby: "chess"}, // optional, modifiable on website
      subscribed: 'no', // optional, modifiable on website
      upsert: 'yes', // optional, choose yes to insert if not exist, or update it exist
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    address: 'bat@bar.com',
    name: 'John Smith',
    subscribed: false,
    vars: { hobby: 'chess' }
  }
  ```

- #### createMembers
  `mg.lists.members.createMembers(mailListAddress, data)`

  Example:

  ```JS
  mg.lists.members.createMembers('reply@sample.com', {
      members: [
        {
          address: "bot1@foobar.com",
          name: "Bot1 Superbot",
          vars: {location: "loc1"},
          subscribed: true,
        },
        {
          address: "bot2@foobar.com",
          name: "Bot2 Superbot",
          vars: {location: "loc2"},
          subscribed: false,
        },
      ],
      upsert: "yes",
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    list: {
      access_level: 'readonly',
      address: 'reply@sample.com',
      created_at: 'Thu, 28 Oct 2021 03:21:15 -0000',
      description: 'For reply purpose',
      members_count: 2,
      name: 'Reply',
      reply_preference: 'list'
    },
    message: 'Mailing list has been updated',
    'task-id': '575b943c37a211ec8a520242ac11000a'
  }
  ```

- #### updateMember

  `mg.lists.members.updateMember(mailListAddress, mailListMemberAddress, data)`

  Example:

  ```JS
  mg.lists.members.updateMember('reply@sample.com', 'bot1@foobar.com', {
      address: 'bot0@barfoo.com',
      name: 'Bot0 Normalbot', // optional, modifiable on website
      vars: {location: "space"},
      subscribed: false,
    })
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    address: 'bot0@barfoo.com',
    name: 'Bot0 Normalbot',
    subscribed: false,
    vars: { location: 'space' }
  }
  ```

- #### destroyMember

  `mg.lists.members.destroyMember(mailListAddress, mailListMemberAddress)`

  Example:

  ```JS
  mg.lists.members.destroyMember('reply@sample.com', 'bot2@foobar.com')
    .then(data => console.log(data)) // logs response body
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: response body

  ```JS
  {
    member: { address: 'bot2@foobar.com' },
    message: 'Mailing list member has been deleted'
  }
  ```
### Subaccounts

  A client to manage subaccounts.

- #### list

  `mg.subaccounts.list(query)` - [api docs](https://documentation.mailgun.com/en/latest/subaccounts.html)

  Example:

  ```js
  mg.subaccounts.list()
    .then(subaccounts => console.log(subaccounts)) // logs array of subaccounts
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: array of Subaccounts instances

  ```JS
  [
    { id: "XYZ", name: "test.subaccount1", status: "open" },
    { id: "YYY", name: "test.subaccount2", status: "open" }
  ]
  ```

  Query data may have next properties:

  | Property | Description                                                            |
  |:---------|:-----------------------------------------------------------------------|
  | limit    | Maximum number of records to return. (10 by default)                   |
  | skip     | Number of records to skip. (0 by default)                              |
  | sort     | "asc" or "desc".                                                       |
  | enabled  | Returns all enabled/disabled subaccounts. (Defaults to all if omitted) |

- #### get

  `mg.subaccounts.get(subaccount_id)`

  Example:

  ```JS
  mg.subaccounts.get('123')
    .then(subaccount => console.log(subaccount)) // logs subaccount object
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: Subaccount instance

  ```JS
  { id: "123", name: "test.subaccount1", status: "open" }
  ```

- #### create

  `mg.subaccounts.create(name)`

  Example:

  ```js
  mg.subaccounts.create('foobar')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: Subaccount instance

  ```JS
  { id: "123", name: "foobar", status: "open" }
  ```

  Create method accepts data object with next properties:

  | Parameter 	 | Description 	                                             |
  |-------------|-----------------------------------------------------------|
  | name 	     | Name of the subaccount being created (ex. 'mysubaccount') 	 |

- #### enable

  `mg.subaccounts.enable(subaccount_id)`

  Example:

  ```js
  mg.subaccounts.enable('123')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```
  Promise returns: Subaccount instance

  ```JS
  { id: "123", name: "foobar", status: "open" }
  ```

- #### disable

  `mg.subaccounts.disable(subaccount_id)`

  Example:

  ```js
  mg.subaccounts.disable('123')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```
  Promise returns: Subaccount instance

  ```JS
  { id: "123", name: "foobar", status: "disabled" }
  ```


### Inbox Placements
  A client to allows you to see the likely deliverability of your email campaigns.
- #### SeedsLists

  - #### list
    `mg.inboxPlacements.seedsLists.list()`

      Example:

      ```JS
      mg.inboxPlacements.seedsLists.list()
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```

      Promise returns: available SeedsLists
      ```JS
      {
        status: 200,
        items: [
          {
            kid: 'kid',
            ID: 'ID',
            AccountID: 'AccountID',
            created_at: new Date('2024-08-09T14:32:57.183Z'),
            updated_at: new Date('2024-08-09T14:33:57.183Z'),
            last_result_at: new Date('2024-08-09T14:32:57.183Z'),
            Seeds: [
              {
                AccountID: 'acount id',
                id: 'seed id',
                token: 'token',
                email: 'email',
                provider: 'provider',
                sync_state: 'sync_state',
                local_state: 'local_state',
                created_at: new Date('2024-08-09T14:32:57.183Z'),
                updated_at: new Date('2024-08-09T14:32:57.183Z'),
                message_count: 0,
                max_email_count_hit_at: new Date('2024-08-09T14:32:57.183Z'),
                total_msgs: 0,
                matched_msgs: 0,
                spam_message: 0,
                expected_msgs: 0,
                last_sent_to_at: new Date('2024-08-09T14:32:57.183Z'),
                last_delivered_at: new Date('2024-08-09T14:32:57.183Z'),
                account_quality: 0,
                quality_label: 'quality_label',
                password: 'password',
                phone_number: 'phone_number',
                attributes: {},
                totp: {
                  secret: 'secret',
                }
              },
              ...
            ],
            target_email: 'test_email@test.com',
            sending_domains: ['test_domain.com'],
            has_results: true,
            name: 'test name',
            seed_filter: 'test filter',
            mailing_list: 'test mailing_list',
            CreatedTS: 1723214101728,
            tags: {
              sfmc_remote_id: 'test sfmc_remote_id',
            },
            delivery_stats: {
              all: {
                delivered: 0,
                missing: 0,
                pending: 0,
                spam: 0,
                inbox: 0,
                total: 0,
                provider: 'test provider',
                categories: {
                  primary: 0,
                  promotions: 0,
                  updates: 0,
                }
              }
            },
            SeedQuality: 1,
            is_auto_generated: true,
          },
          ...
        ],
        paging: {
          first: 'first_page_link',
          last: 'last_page_link',
          next: 'next_page_link',
          previous: 'previous_page_link',
        }
      }
      ```

  - #### get
    `mg.inboxPlacements.seedsLists.get(seedsListId)`

    Example:

    ```JS
    mg.inboxPlacements.seedsLists.get(seedsListId);
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: SeedsLists item by id
    ```JS
    {
      status: 200,
      kid: 'kid',
      ID: 'ID',
      AccountID: 'AccountID',
      created_at: new Date('2024-08-09T14:32:57.183Z'),
      updated_at: new Date('2024-08-09T14:33:57.183Z'),
      last_result_at: new Date('2024-08-09T14:32:57.183Z'),
      Seeds: [
        {
          AccountID: 'acount id',
          id: 'seed id',
          token: 'token',
          email: 'email',
          provider: 'provider',
          sync_state: 'sync_state',
          local_state: 'local_state',
          created_at: new Date('2024-08-09T14:32:57.183Z'),
          updated_at: new Date('2024-08-09T14:32:57.183Z'),
          message_count: 0,
          max_email_count_hit_at: new Date('2024-08-09T14:32:57.183Z'),
          total_msgs: 0,
          matched_msgs: 0,
          spam_message: 0,
          expected_msgs: 0,
          last_sent_to_at: new Date('2024-08-09T14:32:57.183Z'),
          last_delivered_at: new Date('2024-08-09T14:32:57.183Z'),
          account_quality: 0,
          quality_label: 'quality_label',
          password: 'password',
          phone_number: 'phone_number',
          attributes: {},
          totp: {
            secret: 'secret',
          }
        },
        ...
      ],
      target_email: 'test_email@test.com',
      sending_domains: ['test_domain.com'],
      has_results: true,
      name: 'test name',
      seed_filter: 'test filter',
      mailing_list: 'test mailing_list',
      CreatedTS: 1723214101728,
      tags: {
        sfmc_remote_id: 'test sfmc_remote_id',
      },
      delivery_stats: {
        all: {
          delivered: 0,
          missing: 0,
          pending: 0,
          spam: 0,
          inbox: 0,
          total: 0,
          provider: 'test provider',
          categories: {
            primary: 0,
            promotions: 0,
            updates: 0,
          }
        }
      },
      SeedQuality: 1,
      is_auto_generated: true,
    }
    ```

  - #### create
    ```js
    mg.inboxPlacements.seedsLists.create({
      name: 'seedLists name',
      sending_domains: 'your_sending_domain',
      seed_filter: 'seed filter',
      remote_id: 'remote_id'
    })
    ```


    Example:

    ```JS
    mg.inboxPlacements.seedsLists.create({
      sending_domains: 'your_sending_domain',
      name: 'seedLists name';
      seed_filter: 'seed filter';
      remote_id: 'remote_id';
    });
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: created SeedsLists item
    ```JS
    {
      kid: 'kid',
      created_at: new Date('2024-08-09T14:32:57.183Z'),
      updated_at: new Date('2024-08-09T14:32:57.183Z'),
      last_result_at: new Date('2024-08-09T14:32:57.183Z'),
      target_email: 'test_email@test.com',
      sending_domains: [ 'your_sending_domain' ],
      has_results: false,
      name: 'seedLists name',
      seed_filter: 'seed filter',
      provider_filter: [],
      mailing_list: 'test_email@test.com',
      previous_mailing_list: '',
      tags: {
        sfmc_remote_id: 'remote_id'
      },
      delivery_stats: {
        all: {
          delivered: 0,
          missing: 0,
          pending: 0,
          spam: 0,
          inbox: 0,
          total: 0,
          provider: 'all',
          categories: {}
        }
      },
      is_auto_generated: false,
      version: 2,
      Seeds: null,
      status: 200
    }
    ```

  - #### update

    ```JS
    mg.inboxPlacements.seedsLists.update(seedsListId,{
      name: 'new seedLists name', // optional
      provider_filter: 'provider_filter', // optional
      shuffle: true, // optional
      sending_domains: 'your_sending_domain' // optional
    })
    ```


    Example:

    ```JS
     mg.inboxPlacements.seedsLists.update(seedsListId,{
      name: 'new seedLists name',
      provider_filter: 'gmail.com',
      sending_domains: 'your_sending_domain'
    })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: updated SeedsLists item
    ```JS
    {
      kid: '674dcab31169b0619005a9f8',
      created_at: new Date('2024-08-09T14:32:57.183Z'),
      updated_at: 2024-12-02T14:59:42.231Z,
      last_result_at: new Date('2024-08-09T14:32:57.183Z'),
      target_email: 'test_email@test.com',
      sending_domains: [ 'your_sending_domain' ],
      has_results: false,
      name: 'seedLists name',
      seed_filter: '.*',
      provider_filter: ['gmail.com'],
      mailing_list: 'test_email@test.com',
      previous_mailing_list: '',
      tags: {
         sfmc_remote_id: 'remote_id'
      },
      delivery_stats: {
        all: {
          delivered: 0,
          missing: 0,
          pending: 0,
          spam: 0,
          inbox: 0,
          total: 0,
          provider: 'all',
          categories: {}
        }
      },
      is_auto_generated: false,
      version: 2,
      Seeds: null,
      status: 200
    }
    ```

  - #### destroy
    ```js
    mg.inboxPlacements.seedsLists.destroy(seedsListId)
    ```

    Example:

    ```JS
     mg.inboxPlacements.seedsLists.destroy(seedsListId)
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: status object
    ```JS
    {
      status: 200,
      body: null
    }
    ```

  - #### Attributes

    - #### list
      `mg.inboxPlacements.seedsLists.attributes.list()`

      Example:

      ```JS
      mg.inboxPlacements.seedsLists.attributes.list()
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: SeedsLists attributes
      ```JS
      {
        status: 200,
        items:[{
          attribute: 'available attribute',
          values: ['attribute_value', ...]
        }, ...]
      }
      ```

    - #### get
      `mg.inboxPlacements.attributes.get('attribute_name');`

      Example:
      ```JS
      mg.inboxPlacements.seedsLists.attributes.get('attribute_name')
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: SeedsLists attribute
      ```JS
      {
        status: 200,
        items: {
          attribute: 'attribute_name',
            values: ['attribute_value', ...]
          }
      }
      ```

  - #### Filters

    - #### list
      `mg.inboxPlacements.seedsLists.filters.list()`

      Example:

      ```JS
      mg.inboxPlacements.seedsLists.filters.list()
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: SeedsLists filters
      ```JS
      {
        status: 200,
        supported_filters:{
          filters: [
            {
            parameter: 'parameter_name',
            description: 'parameter_description'
            }, ....
          ]
        }
      }
      ```

- #### Providers

  - #### list
    List all available email providers.

    `mg.inboxPlacements.providers.list()`

    Example:

    ```JS
    mg.inboxPlacements.providers.list()
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```
    Promise returns: providers list
    ```JS
    {
      items: [
        {
          domain: 'something.com',
          region: 'provider region',
          display_name: 'provider name',
          created_at: new Date('2024-08-09T14:32:57.183Z'),
          updated_at: new Date('2024-08-09T14:32:59.183Z')
        },
        ...
        ]
    }
    ```

- #### Results

  - #### list
      Get the details for all placement test results.

      ```js
      mg.inboxPlacements.results.list({
        'sender': 'sender value', // optional
        'subject': 'subject value', // optional
        'provider': 'provider value', // optional
        'target_email': 'target_email value', // optional
        'time_after': new Date('2024-08-09T14:32:57.183Z'), // optional
        'time_before': new Date('2024-08-11T14:32:57.183Z'), // optional
        'cursor': '', // optional
        'sort': '', // optional
        'offset': 1, // optional
        'ascending': true, // optional
        'limit': 5, // optional
      })
      ```

      Example:

      ```JS
      mg.inboxPlacements.results.list({
        'sender': 'sender value', // optional
        'subject': 'subject value', // optional
      })
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: results list
      ```JS
      {
        status: 200,
        items: [
          {
            rid: 'rid_value',
            result_id: 'result_id_value',
            AccountID: 'AccountID_value',
            KeyBoxID: 'KeyBoxID_value',
            keybox_email: 'keybox_email_value',
            subject: 'subject_value',
            sender: 'sender_value',
            seedlist_name: 'seedlist_name_value',
            created_at: new Date('2024-08-09T14:32:57.183Z'),
            updated_at: new Date('2024-08-11T14:32:57.183Z'),
            status: 'status_value',
            CreatedTS: 1723214101728,
            attributes: {
              attribute_value: 'attribute_value_value'
            },
            campaign_id: 'campaign_id_value',
            sharing_enabled: true,
            sharing_id: 'sharing_id_value',
            sharing_expires_at: new Date('2024-08-14T14:32:57.183Z'),
            Box: {
              Id: 'box_Id_value',
              kid: 'box_kid_value',
              AccountID: 'box_AccountID_value',
              created_at: new Date('2024-08-11T14:32:57.183Z'),
              updated_at: new Date('2024-08-12T14:32:57.183Z'),
              last_result_at: new Date('2024-08-13T14:32:57.183Z'),
              Seeds: null,
              target_email: 'box_target_email_value',
              sending_domains: null,
              has_results: true,
              name: 'box_name_value',
              seed_filter: 'box_seed_filter_value',
              mailing_list: 'box_mailing_list_value',
              CreatedTS: 1723214101728,
              tags: ['tag_value'],
              SeedQuality: 100,
              is_auto_generated: true,
            },
            seed_results: [{
              email: 'seed_result_email_value',
              provider: 'seed_result_provider_value',
              destination: 'seed_result_destination_value',
              state: 'seed_result_state_value',
              originating_ip: 'seed_result_originating_ip_value',
              tags: ['seed_result_tag_value'],
              dkim: 'seed_result_dkim_value',
              spf: 'seed_result_spf_value',
              dmarc: 'seed_result_dmarc_value',
              headers: [{
                key: 'seed_result_header_key_value',
                value: 'seed_result_header_value_value',
              }],
              extensions: {
                category: 'seed_result_extensions_category_value',
              }
            }],
            spamassassin: {
              is_spam: false,
              score: 1,
              required: 1,
              rules: [{
                name: 'rule_name_value',
                points: 100,
                short_description: 'short_description_value',
                long_description: 'long_description_value',
              }],
            },
            delivery_stats: {
              test_delivery_stat: {
                delivered: 1,
                missing: 0,
                pending: 0,
                spam: 0,
                inbox: 0,
                total: 1,
                provider: 'provider_value',
                categories: {
                  primary: 1,
                  updates: 0,
                }
              }
            }
          }
        ],
        pages: {
          first: '?page=first',
          last: '?page=last',
          next: '?page=next',
          previous: '?page=previous',
        },
      }
      ```

  - #### get

    Get the details for a single result.

    `mg.inboxPlacements.results.get(IBPResultId)`

    Example:

    ```JS
    mg.inboxPlacements.results.get(IBPResultId);
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: Inbox Placement result item
    ```JS
    {
      status: 200,
      inboxPlacementResult: {
          rid: 'rid_value',
          result_id: 'result_id_value',
          AccountID: 'AccountID_value',
          KeyBoxID: 'KeyBoxID_value',
          keybox_email: 'keybox_email_value',
          subject: 'subject_value',
          sender: 'sender_value',
          seedlist_name: 'seedlist_name_value',
          created_at: new Date('2024-08-09T14:32:57.183Z'),
          updated_at: new Date('2024-08-11T14:32:57.183Z'),
          status: 'status_value',
          CreatedTS: 1723214101728,
          attributes: {
            attribute_value: 'attribute_value_value'
          },
          campaign_id: 'campaign_id_value',
          sharing_enabled: true,
          sharing_id: 'sharing_id_value',
          sharing_expires_at: new Date('2024-08-14T14:32:57.183Z'),
          Box: {
            Id: 'box_Id_value',
            kid: 'box_kid_value',
            AccountID: 'box_AccountID_value',
            created_at: new Date('2024-08-11T14:32:57.183Z'),
            updated_at: new Date('2024-08-12T14:32:57.183Z'),
            last_result_at: new Date('2024-08-13T14:32:57.183Z'),
            Seeds: null,
            target_email: 'box_target_email_value',
            sending_domains: null,
            has_results: true,
            name: 'box_name_value',
            seed_filter: 'box_seed_filter_value',
            mailing_list: 'box_mailing_list_value',
            CreatedTS: 1723214101728,
            tags: ['tag_value'],
            SeedQuality: 100,
            is_auto_generated: true,
          },
          seed_results: [{
            email: 'seed_result_email_value',
            provider: 'seed_result_provider_value',
            destination: 'seed_result_destination_value',
            state: 'seed_result_state_value',
            originating_ip: 'seed_result_originating_ip_value',
            tags: ['seed_result_tag_value'],
            dkim: 'seed_result_dkim_value',
            spf: 'seed_result_spf_value',
            dmarc: 'seed_result_dmarc_value',
            headers: [{
              key: 'seed_result_header_key_value',
              value: 'seed_result_header_value_value',
            }],
            extensions: {
              category: 'seed_result_extensions_category_value',
            }
          }],
          spamassassin: {
            is_spam: false,
            score: 1,
            required: 1,
            rules: [{
              name: 'rule_name_value',
              points: 100,
              short_description: 'short_description_value',
              long_description: 'long_description_value',
            }],
          },
          delivery_stats: {
            test_delivery_stat: {
              delivered: 1,
              missing: 0,
              pending: 0,
              spam: 0,
              inbox: 0,
              total: 1,
              provider: 'provider_value',
              categories: {
                primary: 1,
                updates: 0,
              }
            }
          }
      }
    }
    ```

  - #### destroy
    Delete the result and all associated information.

    `mg.inboxPlacements.results.destroy(IBPResultId)`

    Example:

    ```JS
    mg.inboxPlacements.results.destroy(IBPResultId)
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
    ```

    Promise returns: status object
    ```JS
    {
      status: 200,
      message: 'deleted'
    }
    ```

  - #### getResultByShareId
      Get a result by the share ID.
      ```js
      mg.inboxPlacements.results.getResultByShareId('result_sharing_id')
      ```

      Example:

      ```JS
      mg.inboxPlacements.results.getResultByShareId('result_sharing_id')
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```

      Promise returns: Inbox Placement result item
      ```JS
      {
        status: 200,
        inboxPlacementResult: {
            rid: 'rid_value',
            result_id: 'result_id_value',
            AccountID: 'AccountID_value',
            KeyBoxID: 'KeyBoxID_value',
            keybox_email: 'keybox_email_value',
            subject: 'subject_value',
            sender: 'sender_value',
            seedlist_name: 'seedlist_name_value',
            created_at: new Date('2024-08-09T14:32:57.183Z'),
            updated_at: new Date('2024-08-11T14:32:57.183Z'),
            status: 'status_value',
            CreatedTS: 1723214101728,
            attributes: {
              attribute_value: 'attribute_value_value'
            },
            campaign_id: 'campaign_id_value',
            sharing_enabled: true,
            sharing_id: 'sharing_id_value',
            sharing_expires_at: new Date('2024-08-14T14:32:57.183Z'),
            Box: {
              Id: 'box_Id_value',
              kid: 'box_kid_value',
              AccountID: 'box_AccountID_value',
              created_at: new Date('2024-08-11T14:32:57.183Z'),
              updated_at: new Date('2024-08-12T14:32:57.183Z'),
              last_result_at: new Date('2024-08-13T14:32:57.183Z'),
              Seeds: null,
              target_email: 'box_target_email_value',
              sending_domains: null,
              has_results: true,
              name: 'box_name_value',
              seed_filter: 'box_seed_filter_value',
              mailing_list: 'box_mailing_list_value',
              CreatedTS: 1723214101728,
              tags: ['tag_value'],
              SeedQuality: 100,
              is_auto_generated: true,
            },
            seed_results: [{
              email: 'seed_result_email_value',
              provider: 'seed_result_provider_value',
              destination: 'seed_result_destination_value',
              state: 'seed_result_state_value',
              originating_ip: 'seed_result_originating_ip_value',
              tags: ['seed_result_tag_value'],
              dkim: 'seed_result_dkim_value',
              spf: 'seed_result_spf_value',
              dmarc: 'seed_result_dmarc_value',
              headers: [{
                key: 'seed_result_header_key_value',
                value: 'seed_result_header_value_value',
              }],
              extensions: {
                category: 'seed_result_extensions_category_value',
              }
            }],
            spamassassin: {
              is_spam: false,
              score: 1,
              required: 1,
              rules: [{
                name: 'rule_name_value',
                points: 100,
                short_description: 'short_description_value',
                long_description: 'long_description_value',
              }],
            },
            delivery_stats: {
              test_delivery_stat: {
                delivered: 1,
                missing: 0,
                pending: 0,
                spam: 0,
                inbox: 0,
                total: 1,
                provider: 'provider_value',
                categories: {
                  primary: 1,
                  updates: 0,
                }
              }
            }
          }
      }
      ```

  - #### Attributes

    - #### list
      `mg.inboxPlacements.results.attributes.list()`

      Example:

      ```JS
      mg.inboxPlacements.results.attributes.list()
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: results attributes
      ```JS
      {
        status: 200,
        items:[{
          attribute: 'available attribute',
          values: ['attribute_value', ...]
        }, ...]
      }
      ```

    - #### get
      `mg.inboxPlacements.attributes.get('attribute_name');`

      Example:
      ```JS
      mg.inboxPlacements.results.attributes.get('attribute_name')
      .then(data => console.log(data)) // logs response data
      .catch(err => console.error(err)); //logs any error
      ```
      Promise returns: results attribute
      ```JS
      {
        status: 200,
        items: {
          attribute: 'attribute_name',
            values: ['attribute_value', ...]
          }
      }
      ```

  - #### Filters

    - #### list
        `mg.inboxPlacements.results.filters.list()`

        Example:

        ```JS
        mg.inboxPlacements.results.filters.list()
        .then(data => console.log(data)) // logs response data
        .catch(err => console.error(err)); //logs any error
        ```
        Promise returns: SeedsLists filters
        ```JS
        {
          status: 200,
          supported_filters:{
            filters: [
              {
              parameter: 'parameter_name',
              description: 'parameter_description'
              }, ....
            ]
          }
        }
        ```

  - #### Sharing
    - #### get
      The sharing status of a result.

      `mg.inboxPlacements.results.sharing.get('result_id');`
      Example:
        ```JS
        mg.inboxPlacements.results.sharing.get('result_id');
        .then(data => console.log(data)) // logs response data
        .catch(err => console.error(err)); //logs any error
        ```
        Promise returns: IPRSharingResult
        ```JS
        {
          status: 200,
          result_id: 'result_id',
          expires_at: new Date('2024-08-12T14:32:57.183Z'),
          enabled: true,
          url_id: 'result_sharing_id',
          url: 'url-to-shared-result-page',
          api_url: 'url-shared-result-page-in-json'
        }
        ```
    - #### update
      Change the sharing status of a result or create a new share URL

      `mg.inboxPlacements.results.sharing.update('result_id', IPRSharingUpdateData);`

      Example:
        ```JS
        mg.inboxPlacements.results.sharing.update('result_id', { enabled: false });
        .then(data => console.log(data)) // logs response data
        .catch(err => console.error(err)); //logs any error
        ```
        Promise returns: IPRSharingResult
        ```JS
        {
          status: 200,
          result_id: 'result_id',
          expires_at: new Date('2024-08-12T14:32:57.183Z'),
          enabled: false,
          url_id: 'result_sharing_id',
          url: '',
          api_url: ''
        }
        ```

- #### Run test
  Create and run a new inbox placement test.

  Either 'html' or 'template_name' field should be provided.

  'variables' are Template variables, which could be used in html or template. You can use next recipient variables inside Template variables, which will be filled for every seed automatically: %recipient.first_name%, %recipient.last_name%.

  `mg.inboxPlacements.runTest(InboxPlacementsData);`

  Example:
  ```JS
    mg.inboxPlacements.runTest({
      from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
      subject: 'Subject of test email',
      provider_filter: ['o365.mailgun.email'],
      html: `<html><body>
      <h4>Waiting for inbox placements support in mailgun.js SDK?</h4>
      <h3>We are working on this </h3>
      </body></html>`,
      template_name: 'name-of-the-template-you-made-in-mailgun-web-portal';
      variables: JSON.stringify({
          'template_variable_name': 'template_variable_value'
      },
      seed_list: 'previously-generated-seed-list',
    })
    .then(data => console.log(data)) // logs response data
    .catch(err => console.error(err)); //logs any error
  ```

  Promise returns: InboxPlacementsTestResult

  ```JS
  {
    status: 200,
    result_id: 'result_id',
    links: {
      results: 'link to result page',
    }
  }

## Navigation thru lists
  Most of the methods that return items in a list support pagination.
  There are two ways to receive part of the list:
  1. Provide properties 'limit' and 'page' in the query.
  This way uses more frequently in the SDK and works for the next methods:
  - mg.domains.domainTags.list()
  - mg.domains.domainTemplates.list()
  - mg.domains.domainTemplates.listVersions()
  - mg.events.get()
  - mg.lists.list()
  - mg.lists.members.listMembers()
  - mg.validate.list()
  - mg.suppressions.list()

    The general idea is that after you made the first call with a limit property in the query you will receive a response with a property called pages in it. This property implements the next interface:

    ```TS
    {
        previous: {
            id: string;
            page: string;
            iteratorPosition: string | undefined;
            url: string
        };
        first: {
            id: string;
            page: string;
            iteratorPosition: string | undefined;
            url: string
        };
        last: {
            id: string;
            page: string;
            iteratorPosition: string | undefined;
            url: string
        };
        next: {
            id: string;
            page: string;
            iteratorPosition: string | undefined;
            url: string
        };
    }
    ```
    To receive the next page you need to add the page property to the query argument. This property should contain a string value from 'page' property in response.pages.(previous/first/last/next).

    Example:
    ```Js
    // first call
    const listMembers = await mg.lists.members.listMembers('your_mailing_list', { limit: 2 });

    /* response
    {
      items: [
        {
          address: 'test-0@example.com',
          name: 'test name 0',
          subscribed: true,
          vars: [Object]
        },
        {
          address: 'test-1@example.com',
          name: 'test name 1',
          subscribed: true,
          vars: [Object]
        }
      ],
      pages: {
        first: {
          id: 'first',
          page: '?page=first&limit=2',
          iteratorPosition: undefined,
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=first&limit=2'
        },
        last: {
          id: 'last',
          page: '?page=last&limit=2',
          iteratorPosition: undefined,
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=last&limit=2'
        },
        next: {
          id: 'next',
          page: '?page=next&address=test-1%40example.com&limit=2',
          iteratorPosition: 'test-1@example.com',
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=next&address=test-1%40example.com&limit=2'
        },
        previous: {
          id: 'previous',
          page: '?page=prev&address=test-0%40example.com&limit=2',
          iteratorPosition: 'test-0@example.com',
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=prev&address=test-0%40example.com&limit=2'
        }
      }
    }
    */
    // second call
    const listMembers = await mg.lists.members.listMembers(
        'your_mailing_list',
        {
          limit: 2,
          page: '?page=next&address=test-1%40example.com&limit=2'
        }
      );

    /* response
    {
      items: [
        {
          address: 'test-2@example.com',
          name: 'test name 2',
          subscribed: true,
          vars: [Object]
        },
        {
          address: 'test-3@example.com',
          name: 'test name 3',
          subscribed: true,
          vars: [Object]
        }
      ],
      pages: {
        first: {
          id: 'first',
          page: '?page=first&limit=2',
          iteratorPosition: undefined,
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=first&limit=2'
        },
        last: {
          id: 'last',
          page: '?page=last&limit=2',
          iteratorPosition: undefined,
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=last&limit=2'
        },
        next: {
          id: 'next',
          page: '?page=next&address=test-3%40example.com&limit=2',
          iteratorPosition: 'test-3@example.com',
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=next&address=test-3%40example.com&limit=2'
        },
        previous: {
          id: 'previous',
          page: '?page=prev&address=test-2%40example.com&limit=2',
          iteratorPosition: 'test-2@example.com',
          url: 'https://your_domain/v3/lists/your_mailing_list/members/pages?page=prev&address=test-2%40example.com&limit=2'
        }
      }
    }
    */
    ```
    2. The second option of navigation is to provide properties 'limit' and 'skip' in the query. This way uses only in a few places for now:
      - mg.domains.list()
      - mg.domains.domainCredentials.list()
      - mg.routes.list()
      - mg.webhooks.list()
    The main idea here is quite simple you just need to provide how many records from the start of a list you want to skip and how many to receive. You can do it using the query parameter in each method.
    Example:
    ```js
    const listDomainCredentials = await client.domains.domainCredentials.list(
    'your_domain_name',
    {
      skip: 10,
      limit: 1
    }
    );
    ```

## Browser Demo

![image](https://cloud.githubusercontent.com/assets/399776/10718632/e8fe56e4-7b34-11e5-84c8-cfcfde978711.png)

For this demo to work, you'll need to install and run `http-proxy` locally. Install it with:

```sh
npm install -g http-proxy
```

Then run the following command from the mailgun-js directory:

```sh
http-server -p 4001 --proxy="https://api.mailgun.net"
```

Demo should be up and running at http://0.0.0.0:4001/examples/

# Development

## Requirements

- Requires node.js >= 18.x

Install node dependencies with:

```sh
npm install
```

## Build
Build for dev purposes(without minimizing)
```sh
npm run build
```
Build for release purposes(include minimizing)
```sh
npm run build:release
```

## Merging changes

Before PR merge check that commits info will be correctly added to the CHANGELOG.md file:
'npm run release -- --dry-run'

> CI process isn't working currently, so please manually run ```npm run test```

## Tests

```sh
npm run tests
```

Watch tests with

```sh
npm run watch-tests
```

To test new functionality locally using ```npm link``` please use npm script ```npm run link```.
This is needed for correct exporting d.ts files.

## Release Process

Releases occur after feature branches have been tested and merged into master.

First, checkout master and pull the latest commits.

```sh
git checkout master
git pull
```

Next, run ```npm run release```.

After that, `cd ./dist` and then run ```npm login``` and ```npm publish``` to publish changes on npm.
