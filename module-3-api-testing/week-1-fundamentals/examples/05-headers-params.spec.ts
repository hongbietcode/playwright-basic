/**
 * Example: Headers and Query Parameters
 */

import { test, expect } from '@playwright/test';

test.describe('Headers and Parameters @api', () => {
  test('query parameters', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users', {
      params: {
        page: 2,
        per_page: 5,
      },
    });

    const data = await response.json();
    expect(data.page).toBe(2);
    expect(data.per_page).toBe(5);
  });

  test('custom headers', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Playwright-Test',
      },
    });

    expect(response.ok()).toBeTruthy();
  });

  test('response headers', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    console.log('Headers:', response.headers());
  });
});
