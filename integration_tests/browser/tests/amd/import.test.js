/* global expect page beforeAll */
describe('Import validation', () => {
  let client;
  let packageExport;
  beforeAll(async () => {
    await page.goto('http://localhost:3000/pages/AMD.html');
    await page.waitForFunction(function () { return typeof window.mailgunClient !== 'undefined'; });
    client = await page.evaluate(() => window.mailgunClient);
    packageExport = await page.evaluate(() => window.packageExport);
  });

  test('package exports function', async () => {
    expect(typeof packageExport).toBe('object');
    expect(packageExport).toEqual(expect.objectContaining({
      Enums: expect.any(Object),
      Interfaces: expect.any(Object),
      default: expect.any(Object)
    }));
  });

  test('client has expected structure', async () => {
    expect(typeof client).toBe('object');
    const expected = ['request', 'domains', 'webhooks', 'events', 'stats', 'suppressions', 'messages', 'routes', 'ips', 'ip_pools', 'lists', 'validate'];
    expect(Object.keys(client)).toEqual(expect.arrayContaining(expected));
  });
});
