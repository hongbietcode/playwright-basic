/**
 * EXERCISE 1: GET and POST Requests
 *
 * TODO: Implement the tests below
 * See solutions/exercise-01-get-post.spec.ts for answers
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1: Basic API Operations', () => {
  test('get all users', async ({ request }) => {
    // TODO: GET request to https://reqres.in/api/users
    // TODO: Expect status 200
    // TODO: Expect data array to have items
  });

  test('create new user', async ({ request }) => {
    // TODO: POST to https://reqres.in/api/users
    // TODO: Send name and job in request body
    // TODO: Expect status 201
    // TODO: Expect response to have id and createdAt
  });

  test('handle error', async ({ request }) => {
    // TODO: POST to https://reqres.in/api/register without password
    // TODO: Expect status 400
    // TODO: Expect error message in response
  });
});
