/**
 * Example: PUT and PATCH Requests
 */

import { test, expect } from '@playwright/test';

test.describe('PUT/PATCH Requests @api', () => {
  test('PUT - full update', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'Updated Name',
        job: 'Updated Job',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.name).toBe('Updated Name');
    expect(data.updatedAt).toBeDefined();
  });

  test('PATCH - partial update', async ({ request }) => {
    const response = await request.patch('https://reqres.in/api/users/2', {
      data: {
        job: 'Senior QA',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.job).toBe('Senior QA');
  });
});
