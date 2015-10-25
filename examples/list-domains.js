var mailgun = require('../index');
var mg = mailgun.client({username: 'api', key:  process.env.MAILGUN_API_KEY || ''});

mg.domains.list()
  .then(domains => console.log(domains))
  .catch(err => console.log(err));
