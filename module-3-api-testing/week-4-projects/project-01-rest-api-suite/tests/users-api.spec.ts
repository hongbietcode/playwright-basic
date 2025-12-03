/**
 * Project 7: REST API Test Suite - Users Endpoints
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

test.describe('Users API - CRUD Operations @api @project7', () => {
  test('GET /users - list all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.page).toBe(1);
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);

    console.log(`✅ Retrieved ${data.data.length} users`);
  });

  test('GET /users/:id - get single user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.id).toBe(1);
    expect(data.data.email).toBeDefined();
    expect(data.data.first_name).toBeDefined();

    console.log(`✅ Retrieved user: ${data.data.first_name} ${data.data.last_name}`);
  });

  test('POST /users - create new user', async ({ request }) => {
    const newUser = {
      name: 'John Doe',
      job: 'QA Engineer',
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data.name).toBe(newUser.name);
    expect(data.job).toBe(newUser.job);
    expect(data.id).toBeDefined();
    expect(data.createdAt).toBeDefined();

    console.log(`✅ Created user with ID: ${data.id}`);
  });

  test('PUT /users/:id - update user', async ({ request }) => {
    const updatedUser = {
      name: 'John Updated',
      job: 'Senior QA Engineer',
    };

    const response = await request.put(`${BASE_URL}/users/2`, {
      data: updatedUser,
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.name).toBe(updatedUser.name);
    expect(data.job).toBe(updatedUser.job);
    expect(data.updatedAt).toBeDefined();

    console.log('✅ User updated successfully');
  });

  test('PATCH /users/:id - partial update', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/users/2`, {
      data: { job: 'Lead QA Engineer' },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.job).toBe('Lead QA Engineer');

    console.log('✅ User partially updated');
  });

  test('DELETE /users/:id - delete user', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(204);

    console.log('✅ User deleted');
  });
});

test.describe('Users API - Error Scenarios @api @project7', () => {
  test('GET /users/999 - user not found', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/999`);

    expect(response.status()).toBe(404);

    console.log('✅ 404 handled correctly');
  });

  test('GET /users with pagination', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      params: {
        page: 2,
        per_page: 3,
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.page).toBe(2);
    expect(data.per_page).toBe(3);

    console.log(`✅ Page ${data.page} with ${data.data.length} users`);
  });
});

test.describe('Users API - Performance @api @project7 @performance', () => {
  test('response time < 2s', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${BASE_URL}/users/1`);
    const duration = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(2000);

    console.log(`⚡ Response time: ${duration}ms`);
  });

  test('concurrent requests', async ({ request }) => {
    const requests = 10;
    const start = Date.now();

    const promises = Array(requests)
      .fill(null)
      .map(() => request.get(`${BASE_URL}/users/1`));

    await Promise.all(promises);

    const totalTime = Date.now() - start;
    const avgTime = totalTime / requests;

    console.log(`⚡ ${requests} requests in ${totalTime}ms (avg: ${avgTime.toFixed(2)}ms)`);

    expect(avgTime).toBeLessThan(500);
  });
});

/*
PROJECT 7 - REST API SUITE

This test suite demonstrates:

1. CRUD Operations:
   - CREATE (POST) → 201 Created
   - READ (GET) → 200 OK
   - UPDATE (PUT/PATCH) → 200 OK
   - DELETE → 204 No Content

2. Error Handling:
   - 404 Not Found
   - Proper status code validation

3. Query Parameters:
   - Pagination
   - Filtering

4. Performance Testing:
   - Response time thresholds
   - Concurrent request handling

USAGE:
npx playwright test project-01-rest-api-suite/tests/users-api.spec.ts
*/
