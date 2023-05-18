import { test, expect } from '@playwright/test';

test.describe('Build can be loaded and instantiated wia AMD', () => {
  test('Check AMD module loader with module in dist folder', async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Add a <script> tag that loads RequireJS AMD module loader
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'
    });

    // Load the AMD module using RequireJS
    const mgClient: any = await page.evaluate(
      () => new Promise((resolve) => {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line import/no-dynamic-require, global-require
        require(['./umd/mailgun.umd.js'], function (Mailgun) {
          const mg = new Mailgun(FormData);
          const mailgunClient = mg.client({
            username: 'api',
            key: 'key'
          });
          return resolve(mailgunClient);
        });
      })
    );

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
