/* global expect */
describe('Import validation', () => {
  test('mailgun client has expected structure', async () => {
    const ClientWrapper = await global.MailgunClient;
    expect(typeof ClientWrapper).toBe('object');
    expect(typeof ClientWrapper.client).toBe('object');
    const expected = ['request', 'domains', 'webhooks', 'events', 'stats', 'suppressions', 'messages', 'routes', 'ips', 'ip_pools', 'lists', 'validate'];
    expect(Object.keys(ClientWrapper.client)).toEqual(expect.arrayContaining(expected));
  });
});
