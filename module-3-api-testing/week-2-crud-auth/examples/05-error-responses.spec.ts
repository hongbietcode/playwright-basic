/**
 * Example: Error Response Handling
 */

import { test, expect } from '@playwright/test';

test.describe('HTTP Error Responses @api @errors', () => {
  test('400 Bad Request', async ({ request }) => {
    console.log('❌ Testing 400 Bad Request');

    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: 'test@example.com',
        // Missing required 'password' field
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();
    expect(data.error).toContain('password');

    console.log(`✅ 400 error message: ${data.error}`);
  });

  test('404 Not Found', async ({ request }) => {
    console.log('❌ Testing 404 Not Found');

    const response = await request.get('https://reqres.in/api/users/999999');

    expect(response.status()).toBe(404);

    console.log('✅ 404 for non-existent resource');
  });

  test('401 Unauthorized', async ({ request }) => {
    console.log('❌ Testing 401 Unauthorized');

    const response = await request.get('https://httpbin.org/basic-auth/user/pass', {
      headers: {
        'Authorization': 'Basic invalid-credentials',
      },
    });

    expect(response.status()).toBe(401);

    console.log('✅ 401 for invalid credentials');
  });

  test('500 Internal Server Error', async ({ request }) => {
    console.log('❌ Testing 500 Internal Server Error');

    // httpbin.org/status/500 returns 500 error
    const response = await request.get('https://httpbin.org/status/500');

    expect(response.status()).toBe(500);

    console.log('✅ 500 server error handled');
  });
});

test.describe('Error Validation @api @errors', () => {
  test('validate error structure', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: { email: 'test@example.com' },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();

    // Validate error structure
    expect(error).toHaveProperty('error');
    expect(typeof error.error).toBe('string');

    console.log('✅ Error structure validated');
  });

  test('multiple validation errors', async ({ request }) => {
    // Some APIs return array of errors
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        // Invalid data
      },
    });

    // reqres.in accepts empty data, but real APIs would return 400
    console.log('Note: Real APIs would validate and return multiple errors');
  });

  test('error with status text', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/999999');

    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe('Not Found');

    console.log(`✅ Status: ${response.status()} ${response.statusText()}`);
  });
});

test.describe('Error Recovery @api @errors', () => {
  test('retry on error', async ({ request }) => {
    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      attempts++;
      console.log(`Attempt ${attempts}...`);

      const response = await request.get('https://reqres.in/api/users/1');

      if (response.ok()) {
        success = true;
        console.log('✅ Request succeeded');
      } else {
        console.log(`❌ Failed, will retry`);
      }
    }

    expect(success).toBeTruthy();
  });

  test('fallback on error', async ({ request }) => {
    // Try primary endpoint
    let response = await request.get('https://reqres.in/api/users/999999');

    if (!response.ok()) {
      console.log('Primary endpoint failed, trying fallback...');

      // Fallback to different endpoint
      response = await request.get('https://reqres.in/api/users/1');
    }

    expect(response.ok()).toBeTruthy();
    console.log('✅ Fallback mechanism works');
  });

  test('graceful error handling', async ({ request }) => {
    try {
      const response = await request.post('https://reqres.in/api/register', {
        data: { email: 'invalid' },
      });

      if (!response.ok()) {
        const error = await response.json();
        console.log(`❌ Request failed: ${error.error}`);
        expect(response.status()).toBe(400);
      }
    } catch (error) {
      console.error('Request threw exception:', error);
      throw error;
    }

    console.log('✅ Error handled gracefully');
  });
});

/*
HTTP STATUS CODES:

2xx Success:
- 200 OK
- 201 Created
- 204 No Content

4xx Client Errors:
- 400 Bad Request (validation failed)
- 401 Unauthorized (not authenticated)
- 403 Forbidden (authenticated but no permission)
- 404 Not Found
- 422 Unprocessable Entity (semantic errors)

5xx Server Errors:
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout

ERROR HANDLING STRATEGIES:

1. Validation:
   - Check status code
   - Validate error message
   - Check error structure

2. Recovery:
   - Retry transient errors (500, 503)
   - Fallback to alternative endpoints
   - Graceful degradation

3. Testing:
   - Test error scenarios
   - Validate error messages
   - Test error recovery
*/
