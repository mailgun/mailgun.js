# Mailgun.js

A javascript sdk for Mailgun built with webpack, babel & es6. This can be used in node or in the browser*.

NOTE: If used in the browser, a proxy is required to communicate with the Mailgun api due to cors limitations. Also, do not publish your private api key in frontend code.

__Table of Contents__

- [Documentation](#documentation)
  - [Install](#install)
  - [Setup Client](#setup-client)
    - [Available Imports](#imports)
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

- Requires node.js >= 12.x

Install mailgun.js with:

```sh
npm install mailgun.js
```

## Setup Client

Next, require the module and instantiate a mailgun client by calling `new Mailgun(formData)` and then using `mailgun.client` setup the client with basic auth credentials `(username: 'api', key: 'key-yourkeyhere')`.

NOTE: starting from version 3.0 you need to pass FormData (we need this to keep library universal). For node.js you can use `form-data` library.

### Imports
Once the package is installed, you can import the library using `import` or `require` approach:

```js
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
```
```js
  import * as FormData from 'form-data';
  import Mailgun from 'mailgun.js';
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
```
### Types imports
Starting from version **9.0.0.** Types can be includes as named import:
```TS
 import Mailgun, { MailgunClientOptions, MessagesSendResult } from 'mailgun.js';
```

### Interfaces and Enums imports
Starting from version **9.0.0.** Interfaces and Enums can be imported in the next way:
```TS
  import Mailgun, { Interfaces, Enums } from 'mailgun.js';
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
      - [destroy](#destroy)
      - [getTracking](#gettracking)
      - [updateTracking](#updatetracking)
      - [getIps](#getips)
      - [assignIp](#assignip)
    - [events](#events)
      - [get](#get-1)
        - [Example with Date and *Filter field*](#example-with-date-and-filter-field)
    - [stats](#stats)
      - [getDomain](#getdomain)
      - [getAccount](#getaccount)
    - [suppressions](#suppressions)
      - [list](#list-1)
        - [Bounces Example](#bounces-example)
        - [Unsubscribes Example](#unsubscribes-example)
        - [Complaints Example](#complaints-example)
      - [get](#get-2)
        - [Bounces Example](#bounces-example-1)
        - [Unsubscribes Example](#unsubscribes-example-1)
        - [Complaints Example](#complaints-example-1)
      - [create](#create-2)
        - [Bounces Example](#bounces-example-2)
        - [Unsubscribes Example](#unsubscribes-example-2)
          - [Unsubscribe from one tag](#unsubscribe-from-one-tag)
          - [Unsubscribe from particular tags](#unsubscribe-from-particular-tags)
        - [Complaints Example](#complaints-example-2)
      - [destroy](#destroy-1)
        - [Bounces Example](#bounces-example-3)
        - [Unsubscribes Example](#unsubscribes-example-3)
        - [Complaints Example](#complaints-example-3)
    - [webhooks](#webhooks)
      - [list](#list-2)
      - [get](#get-3)
      - [create](#create-3)
      - [update](#update-1)
      - [destroy](#destroy-2)
    - [routes](#routes)
      - [list](#list-3)
      - [get](#get-4)
      - [create](#create-4)
      - [update](#update-2)
      - [destroy](#destroy-3)
    - [validate](#validate)
      - [get](#get-5)
    - [multiple validation](#multiple-validation)
      - [create](#create-5)
      - [list](#list-4)
      - [get](#get-5)
      - [destroy](#destroy-4)
    - [mailing lists](#mailing-lists)
      - [list](#list-5)
      - [get](#get-6)
      - [create](#create-6)
      - [update](#update-3)
      - [destroy](#destroy-5)
    - [mailing list members](#mailing-list-members)
      - [listMembers](#listmember)
      - [getMember](#getmember)
      - [createMember](#createmember)
      - [createMembers](#createmembers)
      - [updateMember](#updatemember)
      - [destroyMember](#destroymember)
  - [Navigation thru lists](#navigation-thru-lists)
  - [Browser Demo](#browser-demo)
- [Development](#development)
  - [Requirements](#requirements)
  - [Build](#build)
  - [Tests](#tests)
  - [Release Process](#release-process)
  - [TODO](#todo)

Method naming conventions:
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

- #### list

  `mg.domains.list(query)` - [api docs](https://documentation.mailgun.com/en/latest/api-domains.html)

  Example:

  ```js
  mg.domains.list()
    .then(domains => console.log(domains)) // logs array of domains
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: array of Domain instances

  ```JS
  [{
    created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
    name: 'testing.example.com',
    receiving_dns_records: null,
    require_tls: true,
    sending_dns_records: null,
    skip_verification: true,
    smtp_login: 'postmaster@testing.example.com',
    smtp_password: 'password',
    spam_action: 'disabled',
    state: 'unverified',
    type: 'custom',
    wildcard: true
  }]
  ```

  Query data may have next properties:

  | Property | Description                                           |
  |:----------|:------------------------------------------------------|
  | limit     | Maximum number of records to return. (100 by default) |
  | skip      | Number of records to skip. (0 by default)             |

- #### get

  `mg.domains.get(domain)`

  Example:

  ```JS
  mg.domains.get('testing.example.com')
    .then(domains => console.log(domains)) // logs domain object
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns: Domain instance

  ```JS
  {
    created_at: 'Sun, 19 Oct 2014 18:49:36 GMT',
    name: 'testing.example.com',
    receiving_dns_records: [{
        "name": "testing.example.com",
        "record_type": "TXT",
        "valid": "unknown",
        "value": "v=spf1 include:mailgun.org ~all"
      },
      {
        "name": "k1._domainkey.testing.example.com",
        "record_type": "TXT",
        "valid": "unknown",
        "value": "k=rsa; 123456"
      },
      {
        "name": "email.testing.example.com",
        "record_type": "CNAME",
        "valid": "unknown",
        "value": "mailgun.org"
      }],
    require_tls: true,
    sending_dns_records: [{
        "priority": "10",
        "record_type": "MX",
        "valid": "unknown",
        "value": "mxa.mailgun.org"
      },
      {
        "priority": "10",
        "record_type": "MX",
        "valid": "unknown",
        "value": "mxb.mailgun.org"
      }],
    skip_verification: true,
    smtp_login: 'postmaster@testing.example.com',
    smtp_password: 'password',
    spam_action: 'disabled',
    state: 'unverified',
    type: 'custom',
    wildcard: true,
    id: '64a4291ebbe4ec7e1d78bc80',
    is_disabled: false,
    web_prefix: 'email',
    web_scheme: 'http'
  }
  ```

- #### create

  `mg.domains.create(data)`

  Example:

  ```js
  mg.domains.create({name: 'foobar.example.com'})
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Create method accepts data object with next properties:

  | Parameter 	| Description 	|
  |---	|---	|
  | name 	| Name of the domain (ex. domain.com) 	|
  | smtp_password 	| Password for SMTP authentication 	|
  | spam_action 	| `disabled`, `block`, or `tag`<br>If `disabled`, no spam filtering will occur for inbound messages.<br>If `block`, inbound spam messages will not be delivered.<br>If `tag`, inbound messages will be tagged with a spam header. [Spam Filter](https://documentation.mailgun.com/en/latest/user_manual.html#um-spam-filter)<br>The default is `disabled`. 	|
  | wildcard 	| Can be string `'true'` or `'false'` or `boolean`<br>Determines whether the domain will accept email for sub-domains when sending messages.<br>The default is `false`. 	|
  | force_dkim_authority 	| Can be string `'true'` or `'false'` or `boolean`<br>If set to `true`, the domain will be the DKIM authority for itself even if the root domain is registered on the same mailgun account<br>If set to `false`, the domain will have the same DKIM authority as the root domain registered on the same mailgun account<br>The default is `false`. 	|
  | dkim_key_size 	| **1024** or **2048**<br>Set the length of your domain’s generated DKIM key<br>The default is **1024** 	|
  | ips 	| An optional, comma-separated list of IP addresses to be assigned to this domain. If not specified, all dedicated IP addresses on the account will be assigned. If the request cannot be fulfilled (e.g. a requested IP is not assigned to the account, etc), a 400 will be returned. 	|
  | pool_id 	| The id of the IP Pool that you wish to assign to the domain. The pool must contain at least 1 IP. (Note: IP Pools are only available on certain plans; see http://mailgun.com/pricing) 	|
  | web_scheme 	| String with `http` or `https`<br>Set your **open**, **click** and **unsubscribe** URLs to use `http` or `https`<br>The default is `http` 	|

  Promise returns:

  ```JS
  name: 'foobar.example.com',
  require_tls: false,
  skip_verification: false,
  state: 'unverified',
  wildcard: false,
  spam_action: 'disabled',
  created_at: 'Tue, 04 Jul 2023 14:09:18 GMT',
  smtp_password: undefined,
  smtp_login: 'postmaster@foobar.example.com',
  type: 'custom',
  receiving_dns_records: [{
      "name": "foobar.example.com",
      "record_type": "TXT",
      "valid": "unknown",
      "value": "v=spf1 include:mailgun.org ~all"
    },
    {
      "name": "k1._domainkey.foobar.example.com",
      "record_type": "TXT",
      "valid": "unknown",
      "value": "k=rsa; 123456"
    },
    {
      "name": "email.foobar.example.com",
      "record_type": "CNAME",
      "valid": "unknown",
      "value": "mailgun.org"
    }
  ],
  sending_dns_records: [{
      "priority": "10",
      "record_type": "MX",
      "valid": "unknown",
      "value": "mxa.mailgun.org"
    },
    {
      "priority": "10",
      "record_type": "MX",
      "valid": "unknown",
      "value": "mxb.mailgun.org"
  }],
  id: '64a4291ebbe4ec7e1d78bc80',
  is_disabled: false,
  web_prefix: 'email',
  web_scheme: 'http'
  ```

- #### update

  `mg.domains.update(domain, options)`

  Example:

  ```js
  mg.domains.update('foobar.example.com',{
      wildcard: 'true',
      web_scheme: 'http',
      spam_action: 'disabled',
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Update method accepts data object with next properties:

  | Property    | Description                                                                                                                                   |
  |:--------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
  | spam_action   | Can be string with value `disabled`, `block`, or `tag`. If *disabled*, no spam filtering will occur for inbound messages. If `block`, inbound spam messages will not be delivered. If `tag`, inbound messages will be tagged with a spam header. See [Spam Filter](https://documentation.mailgun.com/en/latest/user_manual.html#um-spam-filter).|
  | web_scheme | Can be string with value `http` or `https`. Set your **open**, **click** and **unsubscribe** URLs to use `http` or `https`. The default is `http`|
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
    created_at: 'Tue, 04 Jul 2023 14:09:18 GMT',
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
        value: 'mxa.mailgun.org'
      },
      {
        is_active: true,
        cached: [],
        priority: '10',
        record_type: 'MX',
        valid: 'unknown',
        value: 'mxb.mailgun.org'
      }
    ],
    sending_dns_records: [
      {
        is_active: true,
        cached: [],
        name: 'foobar.example.com',
        record_type: 'TXT',
        valid: 'unknown',
        value: 'v=spf1 include:mailgun.org ~all'
      },
      {
        is_active: true,
        cached: [],
        name: 'email.foobar.example.com',
        record_type: 'CNAME',
        valid: 'unknown',
        value: 'mailgun.org'
      }
    ],
    id: '64a5880eere4eg7e1d85bc69',
    is_disabled: false,
    web_prefix: 'email',
    web_scheme: 'http'
  }
  ```

- #### destroy

  `mg.domains.destroy(domainAddress)`

  Example:

  ```JS
  mg.domains.destroy('foobar.example.com')
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
  ```

  Promise returns:

  ```JS
  {
    message: "Domain has been deleted"
  }
  ```

- #### getTracking

  `mg.domains.getTracking(domainAddress)`

  Example:

  ```JS
  mg.domains.getTracking('foobar.example.com')
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

  `mg.domains.updateTracking(domain, trackingType, data)`

  - Open Tracking Example:

    ```js
    mg.domains.updateTracking('foobar.example.com', 'open', {active: true})
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.error(err)); // logs any error
    ```

    Open tracking data object properties:

    | Property | Description                                |
    |:----------|:-------------------------------------------|
    | active    | Boolean, enables or disables open tracking |

    Promise returns:

    ```JS
    {
      message: 'Tracking settings have been updated',
      open: {
        active: true
      }
    }
    ```

  - Click Tracking Example:

    ```JS
    mg.domains.updateTracking('foobar.example.com', 'click', {active: true})
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

  - Unsubscribe Tracking Example:

    ```js
    mg.domains.updateTracking('foobar.example.com', 'unsubscribe', {
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
      "unsubscribe": {
        "active": true,
        "html_footer": "\n<br>\n<p><a href=\"%unsubscribe_url%\">unsubscribe</a></p>\n",
        "text_footer": "\n\nTo unsubscribe click: <%unsubscribe_url%>\n\n"
      }
    }
    ```

- #### getIps
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
  - Stats Options

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

- Requires node.js >= 4.x

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

