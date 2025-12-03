/**
 * SOLUTION: Exercise 1 - GET and POST Requests
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1 Solution: Basic API Operations', () => {
  test('get all users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users');

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data).toBeInstanceOf(Array);
    expect(data.data.length).toBeGreaterThan(0);

    console.log(`✅ Found ${data.data.length} users`);
  });

  test('create new user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'Test User',
        job: 'QA Engineer',
      },
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data.name).toBe('Test User');
    expect(data.job).toBe('QA Engineer');
    expect(data.id).toBeDefined();
    expect(data.createdAt).toBeDefined();

    console.log('✅ Created user:', data);
  });

  test('handle error', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: 'test@example.com',
        // Missing password
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();
    expect(data.error).toContain('password');

    console.log('✅ Error handled:', data.error);
  });
});

/*
SOLUTION EXPLANATION:

1. GET All Users:
   - Use request.get() for GET request
   - Check status 200
   - Parse JSON and validate array structure

2. Create User:
   - Use request.post() with data option
   - Check status 201 (Created)
   - Validate response has expected fields

3. Handle Error:
   - POST without required field (password)
   - Check status 400 (Bad Request)
   - Validate error message exists
*/
