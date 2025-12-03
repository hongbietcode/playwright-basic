/**
 * Example: Status Code Validation
 */

import { test, expect } from '@playwright/test';

test.describe('Status Code Validation @api @validation', () => {
  test('2xx Success codes', async ({ request }) => {
    // 200 OK
    const getResponse = await request.get('https://reqres.in/api/users/1');
    expect(getResponse.status()).toBe(200);
    expect(getResponse.ok()).toBeTruthy();

    // 201 Created
    const postResponse = await request.post('https://reqres.in/api/users', {
      data: { name: 'Test', job: 'QA' },
    });
    expect(postResponse.status()).toBe(201);
    expect(postResponse.ok()).toBeTruthy();

    // 204 No Content
    const deleteResponse = await request.delete('https://reqres.in/api/users/1');
    expect(deleteResponse.status()).toBe(204);

    console.log('✅ All 2xx codes validated');
  });

  test('4xx Client Error codes', async ({ request }) => {
    // 400 Bad Request
    const badRequest = await request.post('https://reqres.in/api/register', {
      data: { email: 'test@example.com' }, // missing password
    });
    expect(badRequest.status()).toBe(400);
    expect(badRequest.ok()).toBeFalsy();

    // 404 Not Found
    const notFound = await request.get('https://reqres.in/api/users/999999');
    expect(notFound.status()).toBe(404);

    console.log('✅ All 4xx codes validated');
  });

  test('validate status text', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

    console.log(`Status: ${response.status()} ${response.statusText()}`);
  });

  test('response headers validation', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');

    const headers = response.headers();

    expect(headers['content-type']).toContain('application/json');
    expect(headers).toHaveProperty('server');

    console.log('Headers:', headers);
  });
});

/*
STATUS CODE CATEGORIES:

2xx Success:
- 200 OK: Request succeeded
- 201 Created: Resource created
- 204 No Content: Success, no body

4xx Client Errors:
- 400 Bad Request: Invalid input
- 401 Unauthorized: Not authenticated
- 403 Forbidden: No permission
- 404 Not Found: Resource doesn't exist
- 422 Unprocessable Entity: Semantic error

5xx Server Errors:
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
*/
