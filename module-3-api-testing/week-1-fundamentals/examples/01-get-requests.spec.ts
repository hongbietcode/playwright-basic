/**
 * Example: GET Requests
 * Demonstrates retrieving data from APIs
 */

import { test, expect } from '@playwright/test';

test.describe('GET Requests @api', () => {
  test('get single user', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.id).toBe(1);
    expect(data.data.email).toContain('@');

    console.log('User:', data.data);
  });

  test('get list of users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.page).toBe(2);
    expect(data.data).toBeInstanceOf(Array);
    expect(data.data.length).toBeGreaterThan(0);
  });

  test('user not found', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/999');

    expect(response.status()).toBe(404);
  });
});

/*
KEY CONCEPTS:
1. request.get() for GET requests
2. response.ok() checks 2xx status
3. response.json() parses JSON
4. Validate status codes and data structure
*/
