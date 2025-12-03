/**
 * Example: POST Requests
 */

import { test, expect } from '@playwright/test';

test.describe('POST Requests @api', () => {
  test('create user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'John Doe',
        job: 'QA Engineer',
      },
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data.name).toBe('John Doe');
    expect(data.job).toBe('QA Engineer');
    expect(data.id).toBeDefined();
    expect(data.createdAt).toBeDefined();

    console.log('Created user:', data);
  });

  test('register user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBeDefined();
    expect(data.token).toBeDefined();
  });

  test('register without password fails', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();
  });
});

/*
KEY CONCEPTS:
1. request.post() for POST requests
2. data option for request body
3. 201 Created for successful creation
4. 400 Bad Request for validation errors
*/
