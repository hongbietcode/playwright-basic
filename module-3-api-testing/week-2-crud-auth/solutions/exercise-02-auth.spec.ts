/**
 * SOLUTION: Exercise 2 - Authentication
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 2 Solution: Authentication @api @auth', () => {
  test('Bearer token authentication flow', async ({ request }) => {
    console.log('🔐 Testing Bearer Token Auth');

    // 1. Login to get token
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(loginResponse.status()).toBe(200);
    const { token } = await loginResponse.json();
    expect(token).toBeDefined();

    console.log(`✅ Token received: ${token}`);

    // 2. Use token in authenticated request
    const authResponse = await request.get('https://reqres.in/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(authResponse.ok()).toBeTruthy();
    console.log('✅ Authenticated request successful');
  });

  test('Basic authentication', async ({ playwright }) => {
    console.log('🔐 Testing Basic Auth');

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
    expect(data.user).toBe('admin');

    console.log('✅ Basic auth successful');

    await context.dispose();
  });

  test('API key authentication', async ({ request }) => {
    console.log('🔑 Testing API Key Auth');

    const response = await request.get('https://httpbin.org/headers', {
      headers: {
        'X-API-Key': 'test-api-key-123',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.headers['X-Api-Key']).toBe('test-api-key-123');

    console.log('✅ API key sent successfully');
  });

  test('handle authentication errors', async ({ request }) => {
    console.log('❌ Testing auth errors');

    // Invalid credentials
    const response = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'invalid@example.com',
        password: 'wrongpass',
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.error).toBeDefined();

    console.log(`✅ Auth error handled: ${error.error}`);
  });
});

/*
AUTHENTICATION SOLUTIONS:

1. Bearer Token:
   - POST /login with credentials
   - Extract token from response
   - Add header: Authorization: Bearer <token>

2. Basic Auth:
   - Use httpCredentials in context
   - OR manually encode: Basic base64(username:password)

3. API Key:
   - Add custom header: X-API-Key
   - OR query param: ?api_key=xxx

4. Error Handling:
   - Invalid credentials → 400/401
   - Missing auth → 401 Unauthorized
   - Insufficient permissions → 403 Forbidden
*/
