import { describe, expect, test } from '@jest/globals';
import { getMailgunImport, getMailgunClient } from './helpers/clientInit';

describe('Import validation', () => {
  test('package exports function', async () => {
    const packageImport = getMailgunImport();
    expect(typeof packageImport).toBe('function');
  });

  test('mailgun client has expected structure', async () => {
    const client = getMailgunClient();
    expect(typeof client).toBe('object');
    const expected = ['request', 'domains', 'webhooks', 'events', 'stats', 'suppressions', 'messages', 'routes', 'ips', 'ip_pools', 'lists', 'validate'];
    expect(Object.keys(client)).toEqual(expect.arrayContaining(expected));
  });
});
