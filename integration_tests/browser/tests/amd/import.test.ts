/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable tsdoc/syntax */
import {
  describe,
  expect,
  test,
  beforeAll
} from '@jest/globals';
import 'jest-puppeteer';
import { IMailgunClient } from '../../../../lib/Interfaces/index.js';

type Window = globalThis.Window & {
  mailgunClient?: IMailgunClient
  definitionsExport?: {
    Enums: object,
    Interfaces: object,
  }
  packageExport?: Function
};

describe('AMD import validation', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/pages/AMD.html');
    await page.waitForFunction(function () { return typeof (window as Window).mailgunClient !== 'undefined'; });
    await page.waitForFunction(function () { return typeof (window as Window).packageExport !== 'undefined'; });
    await page.waitForFunction(function () { return typeof (window as Window).definitionsExport !== 'undefined'; });
  });

  test('AMD package exports function', async () => {
    const isFunction = await page.evaluate(() => (typeof (window as Window).packageExport === 'function'));
    expect(isFunction).toBe(true);
  });

  test('AMD definitions exports object', async () => {
    const definitionsExport = await page.evaluate(() => (window as Window).definitionsExport);
    expect(typeof definitionsExport).toBe('object');
    expect(definitionsExport).toEqual(expect.objectContaining({
      Enums: expect.any(Object),
      Interfaces: expect.any(Object),
    }));
  });

  test('AMD client has expected structure', async () => {
    const client = await page.evaluate(() => (window as Window).mailgunClient);
    const expected = ['request', 'domains', 'webhooks', 'events', 'stats', 'suppressions', 'messages', 'routes', 'ips', 'ip_pools', 'lists', 'validate'];
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
    expect(Object.keys(client as IMailgunClient)).toEqual(expect.arrayContaining(expected));
  });
});
