/* eslint-disable no-console */
const mailgun = require('../lib/index');

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });

mg.domains.list()
  .then((domains) => console.log(domains))
  .catch((err) => console.log(err));
