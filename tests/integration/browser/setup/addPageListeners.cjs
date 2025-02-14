/* eslint-disable no-console */
/* global page, beforeAll */
const { VERBOSE } = process.env;
beforeAll(async function () {
  const isVerbose = VERBOSE === 'true';
  // global.MailgunClient = null;
  page.on('console', (message) => isVerbose && console.debug(`Browser console -> ${message.type()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.error(`Browser page error -> ${message}`))
    .on('request', (req) => isVerbose && console.log(`Browser send request ->  ${req.url()}`))
    .on('response', (response) => isVerbose && console.log(`Browser got response ->  ${response.status()} ${response.url()}`))
    .on('requestfailed', (request) => console.error(`Browser request failed ->${request.failure().errorText} ${request.url()}`));
});
