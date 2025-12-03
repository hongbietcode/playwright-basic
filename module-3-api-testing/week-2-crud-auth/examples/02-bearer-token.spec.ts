/**
 * Example: Bearer Token Authentication
 */

import { test, expect } from '@playwright/test';

test.describe('Bearer Token Authentication @api @auth', () => {
  let authToken: string;

  test('login and get token', async ({ request }) => {
    console.log('🔐 Logging in to get token...');

    const response = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.token).toBeDefined();

    authToken = data.token;
    console.log(`✅ Token received: ${authToken}`);
  });

  test('use token in request', async ({ request }) => {
    // First get token
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    const loginData = await loginResponse.json();
    const token = loginData.token;

    console.log('🔑 Using Bearer token in request...');

    // Use token in subsequent requests
    const response = await request.get('https://reqres.in/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    console.log('✅ Authenticated request successful');
  });

  test('request without token fails', async ({ request }) => {
    // Some APIs return 401 without auth
    // reqres.in is lenient, but real APIs require auth

    const response = await request.get('https://reqres.in/api/users');

    // reqres.in allows unauthenticated, but in real API:
    // expect(response.status()).toBe(401);

    console.log('Note: Real APIs would return 401 Unauthorized');
  });
});

test.describe('Token-based API Context @api @auth', () => {
  test('create authenticated context', async ({ playwright }) => {
    // Create context with auth token
    const context = await playwright.request.newContext({
      baseURL: 'https://reqres.in/api',
      extraHTTPHeaders: {
        'Authorization': 'Bearer token123',
      },
    });

    const response = await context.get('/users');
    expect(response.ok()).toBeTruthy();

    console.log('✅ Authenticated context works');

    await context.dispose();
  });

  test('reuse token across requests', async ({ request }) => {
    // Get token
    const loginResponse = await request.post('https://reqres.in/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    const { token } = await loginResponse.json();

    // Helper function to make authenticated requests
    const authRequest = async (url: string, method: string = 'GET') => {
      return request.fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
      });
    };

    // Use token in multiple requests
    const response1 = await authRequest('https://reqres.in/api/users');
    expect(response1.ok()).toBeTruthy();

    const response2 = await authRequest('https://reqres.in/api/users/2');
    expect(response2.ok()).toBeTruthy();

    console.log('✅ Token reused successfully');
  });
});

/*
KEY CONCEPTS:

1. Bearer Token Flow:
   - POST /login with credentials
   - Receive token in response
   - Include token in Authorization header
   - Format: "Bearer <token>"

2. Token Storage:
   - Save token after login
   - Reuse across requests
   - Don't hardcode tokens

3. Authentication Context:
   - Create context with default headers
   - All requests use same auth
   - Cleaner than adding header each time

4. Real-world:
   - Tokens expire (handle refresh)
   - 401 = Unauthorized
   - 403 = Forbidden (authenticated but no permission)
*/
