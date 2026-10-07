// should be JS file to use require

import formData from 'form-data';
// eslint-disable-next-line import/extensions, import/no-named-as-default
import Mailgun from '../../../../../../dist/ESM/mailgun.node.js';

export function getMailgunImport() {
  return Mailgun;
}

export function getMailgunClient({ withFormDataPackage = false } = {}) {
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
