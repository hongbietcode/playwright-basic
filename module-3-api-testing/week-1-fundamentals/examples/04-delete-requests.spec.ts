/**
 * Example: DELETE Requests
 */

import { test, expect } from '@playwright/test';

test.describe('DELETE Requests @api', () => {
  test('delete user', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');

    expect(response.status()).toBe(204); // No Content
  });

  test('delete and verify', async ({ request }) => {
    // Delete
    const deleteResponse = await request.delete('https://reqres.in/api/users/2');
    expect(deleteResponse.status()).toBe(204);

    // Verify deleted (would be 404 in real API)
    const getResponse = await request.get('https://reqres.in/api/users/2');
    // reqres.in still returns 200, but in real API would be 404
  });
});
