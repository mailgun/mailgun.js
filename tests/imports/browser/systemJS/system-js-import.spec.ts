import { test, expect } from '@playwright/test';

test.describe('Build can be loaded and instantiated wia SystemJS', () => {
  test('Check SystemJS module loader with module in dist folder', async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Add a <script> tag that loads RequireJS AMD module loader
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.10.3/system.min.js'
    });

    // Load the module using SystemJS
    const mgClient: any = await page.evaluate(() => System.import('./umd/mailgun.umd.js')
      .then(function (MailgunExport) {
        const Mailgun = MailgunExport.default;
        const mg = new Mailgun(FormData);
        const mailgunClient = mg.client({
          username: 'api',
          key: 'key'
        });
        return mailgunClient;
      }));

    expect(mgClient).not.toBe(null);
    const expectedProps = ['request', 'domains',
      'webhooks', 'events',
      'stats', 'suppressions',
      'messages', 'routes',
      'ips', 'ip_pools',
      'lists', 'validate'];
    await expect(Object.keys(mgClient)).toStrictEqual(expectedProps);
  });
});
