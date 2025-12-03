/**
 * Example: Basic Authentication
 */

import { test, expect } from '@playwright/test';

test.describe('Basic Authentication @api @auth', () => {
  test('basic auth with credentials', async ({ request }) => {
    console.log('🔐 Basic Auth: username + password');

    // Basic auth format: username:password encoded in base64
    const username = 'admin';
    const password = 'password123';
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await request.get('https://httpbin.org/basic-auth/admin/password123', {
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.authenticated).toBe(true);
    expect(data.user).toBe('admin');

    console.log('✅ Basic auth successful');
  });

  test('basic auth using Playwright helper', async ({ playwright }) => {
    console.log('🔐 Basic Auth with Playwright context');

    // Playwright provides httpCredentials for basic auth
    const context = await playwright.request.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'password123',
      },
    });

    const response = await context.get('https://httpbin.org/basic-auth/admin/password123');

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.authenticated).toBe(true);

    console.log('✅ Basic auth with context successful');

    await context.dispose();
  });

  test('basic auth failure', async ({ request }) => {
    console.log('❌ Testing invalid credentials');

    const credentials = Buffer.from('wrong:credentials').toString('base64');

    const response = await request.get('https://httpbin.org/basic-auth/admin/password123', {
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
    });

    expect(response.status()).toBe(401); // Unauthorized

    console.log('✅ Correctly rejected invalid credentials');
  });
});

/*
BASIC AUTH EXPLAINED:

1. Format: Authorization: Basic <base64(username:password)>

2. Example:
   - username: admin
   - password: password123
   - Combined: admin:password123
   - Base64: YWRtaW46cGFzc3dvcmQxMjM=
   - Header: Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=

3. Playwright Helper:
   httpCredentials: { username, password }
   - Automatically encodes
   - Cleaner code

4. Use Cases:
   - Simple authentication
   - Internal APIs
   - Legacy systems
   - Not recommended for production (use Bearer tokens)
*/
