/**
 * Project 7: Authentication API Tests
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

test.describe('Authentication API @api @project7 @auth', () => {
  let authToken: string;

  test('POST /register - successful registration', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBeDefined();
    expect(data.token).toBeDefined();

    console.log(`✅ Registered with token: ${data.token}`);
  });

  test('POST /register - missing password', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'test@example.com',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();
    expect(data.error).toContain('password');

    console.log(`✅ Error: ${data.error}`);
  });

  test('POST /login - successful login', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.token).toBeDefined();

    authToken = data.token;
    console.log(`✅ Login successful, token: ${authToken}`);
  });

  test('POST /login - invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'invalid@example.com',
        password: 'wrongpass',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();

    console.log(`✅ Login failed: ${data.error}`);
  });

  test('use token in authenticated request', async ({ request }) => {
    // First login
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    const { token } = await loginResponse.json();

    // Use token
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    console.log('✅ Authenticated request successful');
  });
});

test.describe('Token Management @api @project7 @auth', () => {
  test('reuse token across requests', async ({ request }) => {
    // Login
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    const { token } = await loginResponse.json();

    // Make multiple requests with same token
    const requests = [
      request.get(`${BASE_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` },
      }),
      request.get(`${BASE_URL}/users/1`, {
        headers: { 'Authorization': `Bearer ${token}` },
      }),
      request.get(`${BASE_URL}/users/2`, {
        headers: { 'Authorization': `Bearer ${token}` },
      }),
    ];

    const responses = await Promise.all(requests);

    responses.forEach((response, index) => {
      expect(response.ok()).toBeTruthy();
      console.log(`✅ Request ${index + 1} with token succeeded`);
    });
  });
});

/*
AUTHENTICATION TESTING:

1. Registration:
   - Valid registration → 200 OK
   - Missing fields → 400 Bad Request
   - Duplicate email → 400 Bad Request

2. Login:
   - Valid credentials → 200 OK, token received
   - Invalid credentials → 400/401
   - Missing fields → 400

3. Token Usage:
   - Include in Authorization header
   - Bearer token format
   - Reuse across requests

4. Error Handling:
   - Validation errors
   - Authentication failures
   - Missing tokens
*/
