/* eslint-disable no-console */
const fsPromises = require('fs').promises;
const path = require('path');
const mailgun = require('../lib/index');

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '', timeout: 60000 });

const domain = 'sandbox-123.mailgun.com';
const fromEmail = 'Excited User <mailgun@sandbox-123.mailgun.com>';
const toEmails = ['you@example.com'];

(async () => {
  try {
    const mailgunLogo = {
      filename: 'mailgun.png',
      data: await fsPromises.readFile(path.join(__dirname, 'mailgun.png'))
    };
    const rackspaceLogo = {
      filename: 'rackspace.png',
      data: await fsPromises.readFile(path.join(__dirname, 'rackspace.png'))
    };
    /*
    You may also use the stream for reading files as in the commented code below.
    But make sure you create a new stream if you do iterative sending.
    const mailgunLogo = fs.createReadStream(`${__dirname}/mailgun.png`);
    const rackspaceLogo = fs.createReadStream(`${__dirname}/rackspace.png`);
    */
    const sendResult = await mg.messages.create(domain, {
      from: fromEmail,
      to: toEmails,
      subject: 'Hello',
      html: '<img src="cid:mailgun.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
      text: 'Testing some Mailgun awesomness!',
      inline: [mailgunLogo],
      attachment: [rackspaceLogo]
    });
    console.log(sendResult);
  } catch (error) {
    console.error(error);
  }
})();
