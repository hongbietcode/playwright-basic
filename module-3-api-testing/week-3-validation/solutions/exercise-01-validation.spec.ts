/**
 * SOLUTION: Exercise 1 - API Validation
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1 Solution: API Validation @api', () => {
  test('validate status codes', async ({ request }) => {
    // GET - 200 OK
    const getResponse = await request.get('https://reqres.in/api/users/1');
    expect(getResponse.status()).toBe(200);

    // POST - 201 Created
    const postResponse = await request.post('https://reqres.in/api/users', {
      data: { name: 'Test', job: 'QA' },
    });
    expect(postResponse.status()).toBe(201);

    // DELETE - 204 No Content
    const deleteResponse = await request.delete('https://reqres.in/api/users/1');
    expect(deleteResponse.status()).toBe(204);

    // 404 Not Found
    const notFound = await request.get('https://reqres.in/api/users/999');
    expect(notFound.status()).toBe(404);

    console.log('✅ All status codes validated');
  });

  test('validate response structure', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    // Validate structure
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('id');
    expect(data.data).toHaveProperty('email');

    // Validate types
    expect(typeof data.data.id).toBe('number');
    expect(typeof data.data.email).toBe('string');

    // Validate values
    expect(data.data.id).toBeGreaterThan(0);
    expect(data.data.email).toContain('@');

    console.log('✅ Response structure validated');
  });

  test('validate response time', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('https://reqres.in/api/users/1');
    const duration = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(2000);

    console.log(`⚡ Response time: ${duration}ms`);
  });

  test('validate array response', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users');
    const data = await response.json();

    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);

    data.data.forEach((user: any) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
    });

    console.log(`✅ Validated ${data.data.length} users`);
  });
});

/*
VALIDATION SOLUTION:

1. Status Codes:
   - 200 OK for GET
   - 201 Created for POST
   - 204 No Content for DELETE
   - 404 Not Found for missing resources

2. Response Structure:
   - toHaveProperty() for fields
   - typeof for type checking
   - Custom validation for values

3. Response Time:
   - Measure with Date.now()
   - Set acceptable thresholds
   - < 2000ms is good

4. Array Validation:
   - Array.isArray() check
   - length > 0
   - forEach for item validation
*/
