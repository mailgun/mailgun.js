/* eslint-disable tsdoc/syntax */
import {
  describe,
  expect,
  test,
  beforeAll
} from '@jest/globals';
import 'jest-puppeteer';
import { IMailgunClient } from '../../../../lib/Interfaces';

type Window = globalThis.Window & {
  mailgunClient?: IMailgunClient
  packageExport?: {
    Enums: object,
    Interfaces: object,
    default: object
  }
};

describe('Import validation', () => {
  let client: IMailgunClient | undefined;
  let packageExport: {
    Enums: object,
    Interfaces: object,
    default: object
  } | undefined;
  beforeAll(async () => {
    await page.goto('http://localhost:3000/pages/AMD.html');
    await page.waitForFunction(function () { return typeof (window as Window).mailgunClient !== 'undefined'; });
    client = await page.evaluate(() => (window as Window).mailgunClient);
    packageExport = await page.evaluate(() => (window as Window).packageExport);
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
    const expected = ['request', 'domains', 'webhooks', 'events', 'stats', 'suppressions', 'messages', 'routes', 'ips', 'ip_pools', 'lists', 'validate'];
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
    expect(Object.keys(client as IMailgunClient)).toEqual(expect.arrayContaining(expected));
  });
});
