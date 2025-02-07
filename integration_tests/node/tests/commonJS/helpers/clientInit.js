// should be JS file to use require

const formData = require('form-data');
const Mailgun = require('../../../../../dist/mailgun.node');

function getMailgunImport() {
  return Mailgun;
}

function getMailgunClient({ withFormDataPackage = false } = {}) {
  let mg = null;
  if (withFormDataPackage) {
    mg = new Mailgun(formData);
  } else if (typeof global.FormData !== 'undefined') {
    mg = new Mailgun(global.FormData);
  } else {
    throw new Error('global.FormData is undefined');
  }
  const client = mg.client({
    username: 'js_test_username',
    key: 'js_test_key',
    public_key: 'js_test_key',
    timeout: 10000,
  });
  return client;
}
module.exports = {
  getMailgunClient,
  getMailgunImport
};
