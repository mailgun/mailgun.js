/* eslint-disable no-console */
/* global page, beforeAll */

beforeAll(async function () {
  // global.MailgunClient = null;
  page.on('console', (message) => console.debug(`Browser console -> ${message.type()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.error(`Browser page error -> ${message}`))
    .on('request', (req) => console.log(`Browser send request ->  ${req.url()}`))
    .on('response', (response) => console.log(`Browser got response ->  ${response.status()} ${response.url()}`))
    .on('requestfailed', (request) => console.log(`Browser request failed ->${request.failure().errorText} ${request.url()}`));
});
