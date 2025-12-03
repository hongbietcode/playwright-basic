/**
 * Example: API Key Authentication
 */

import { test, expect } from '@playwright/test';

test.describe('API Key Authentication @api @auth', () => {
  test('API key in header', async ({ request }) => {
    console.log('🔑 API Key in Header');

    const response = await request.get('https://httpbin.org/headers', {
      headers: {
        'X-API-Key': 'your-api-key-here',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.headers['X-Api-Key']).toBe('your-api-key-here');

    console.log('✅ API key sent in header');
  });

  test('API key in query parameter', async ({ request }) => {
    console.log('🔑 API Key in Query Param');

    const response = await request.get('https://httpbin.org/get', {
      params: {
        api_key: 'your-api-key-here',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.args.api_key).toBe('your-api-key-here');

    console.log('✅ API key sent in query param');
  });

  test('multiple API keys', async ({ request }) => {
    console.log('🔑 Multiple API Keys');

    const response = await request.get('https://httpbin.org/headers', {
      headers: {
        'X-API-Key': 'primary-key',
        'X-App-ID': 'app-123',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.headers['X-Api-Key']).toBe('primary-key');
    expect(data.headers['X-App-Id']).toBe('app-123');

    console.log('✅ Multiple keys sent successfully');
  });

  test('API key from environment', async ({ request }) => {
    // In real scenarios, load from environment variables
    const apiKey = process.env.API_KEY || 'demo-key';

    console.log(`🔑 Using API key from environment: ${apiKey.substring(0, 4)}***`);

    const response = await request.get('https://httpbin.org/headers', {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    expect(response.ok()).toBeTruthy();

    console.log('✅ Environment-based API key works');
  });
});

test.describe('API Key Context @api @auth', () => {
  test('create context with API key', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://httpbin.org',
      extraHTTPHeaders: {
        'X-API-Key': 'persistent-api-key',
      },
    });

    // All requests automatically include API key
    const response1 = await context.get('/headers');
    const response2 = await context.get('/get');

    expect(response1.ok()).toBeTruthy();
    expect(response2.ok()).toBeTruthy();

    console.log('✅ Context with API key works for all requests');

    await context.dispose();
  });
});

/*
API KEY AUTHENTICATION:

1. Common Locations:
   - Header: X-API-Key, X-App-Key, API-Key
   - Query param: ?api_key=xxx
   - Body (rare): { "api_key": "xxx" }

2. Best Practices:
   - Store in environment variables
   - Never hardcode in tests
   - Rotate keys regularly
   - Use different keys per environment

3. Advantages:
   - Simple implementation
   - No expiration (unless you rotate)
   - Easy to revoke

4. Disadvantages:
   - Can't identify user (only app)
   - Less secure than tokens
   - Can be exposed in logs/URLs (if in query)

5. Use Cases:
   - Third-party API integration
   - Server-to-server communication
   - Rate limiting by key
*/
