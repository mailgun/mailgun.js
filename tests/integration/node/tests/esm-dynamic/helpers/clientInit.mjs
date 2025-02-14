// should be JS file to use require

import formData from 'form-data';

export async function getMailgunImport() {
  // eslint-disable-next-line import/extensions, import/no-named-as-default
  const Mailgun = await import('../../../../../../dist/ESM/mailgun.node.js');
  return Mailgun.default;
}

export async function getMailgunClient({ withFormDataPackage = false } = {}) {
  // eslint-disable-next-line import/extensions, import/no-named-as-default
  const Mailgun = await import('../../../../../../dist/ESM/mailgun.node.js');
  let mg = null;
  if (withFormDataPackage) {
    // eslint-disable-next-line new-cap
    mg = new Mailgun.default(formData);
  } else if (typeof global.FormData !== 'undefined') {
    // eslint-disable-next-line new-cap
    mg = new Mailgun.default(global.FormData);
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
