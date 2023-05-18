import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
// import httpServer from 'http-server';
declare global {
  interface Window {
    Mailgun: any;
  }
}
test.describe('ESM build can be loaded and instantiated', () => {
  test('imports the bundle with await', async ({ page }) => {
    await page.goto('http://localhost:8080');
    const client = await page.evaluate(async () => {
      // eslint-disable-next-line import/no-unresolved
      const { default: Mailgun } = await import('./esm/mailgun.esm.js');
      const mg = new Mailgun(FormData);
      const mailgunClient = mg.client({
        username: 'api',
        key: 'key'
      });
      return mailgunClient;
    });
    const expectedProps = ['request', 'domains',
      'webhooks', 'events',
      'stats', 'suppressions',
      'messages', 'routes',
      'ips', 'ip_pools',
      'lists', 'validate'];
    await expect(Object.keys(client)).toStrictEqual(expectedProps);
  });

  test('imports bundle using script tag with type="module" ', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.addScriptTag({
      type: 'module',
      content: 'import Mailgun from "./esm/mailgun.esm.js";window.Mailgun=Mailgun'
    });
    await page.waitForFunction(() => window.Mailgun !== undefined);
    const client = await page.evaluate(async () => {
      const Mailgun = window.Mailgun;
      const mg = new Mailgun(FormData);
      const mailgunClient = mg.client({
        username: 'api',
        key: 'key'
      });
      return mailgunClient;
    });
    const expectedProps = ['request', 'domains',
      'webhooks', 'events',
      'stats', 'suppressions',
      'messages', 'routes',
      'ips', 'ip_pools',
      'lists', 'validate'];
    await expect(Object.keys(client)).toStrictEqual(expectedProps);
  });
});
