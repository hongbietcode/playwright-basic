/**
 * Example: JSON Schema Validation
 */

import { test, expect } from '@playwright/test';

test.describe('JSON Schema Validation @api @validation', () => {
  test('validate response structure', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    // Validate top-level structure
    expect(data).toHaveProperty('data');
    expect(data).toHaveProperty('support');

    // Validate data object
    expect(data.data).toHaveProperty('id');
    expect(data.data).toHaveProperty('email');
    expect(data.data).toHaveProperty('first_name');
    expect(data.data).toHaveProperty('last_name');

    console.log('✅ Response structure validated');
  });

  test('validate data types', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    // Type validation
    expect(typeof data.data.id).toBe('number');
    expect(typeof data.data.email).toBe('string');
    expect(typeof data.data.first_name).toBe('string');

    // Value validation
    expect(data.data.id).toBeGreaterThan(0);
    expect(data.data.email).toContain('@');

    console.log('✅ Data types validated');
  });

  test('validate array response', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users');
    const data = await response.json();

    // Validate array
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);

    // Validate first item
    const firstUser = data.data[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');

    console.log(`✅ Array with ${data.data.length} items validated`);
  });

  test('validate nested objects', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    // Validate nested support object
    expect(data.support).toHaveProperty('url');
    expect(data.support).toHaveProperty('text');

    expect(typeof data.support.url).toBe('string');
    expect(data.support.url).toMatch(/^https?:\/\//);

    console.log('✅ Nested objects validated');
  });

  test('validate optional fields', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    // Required field
    expect(data.data.id).toBeDefined();

    // Optional field (avatar might not exist)
    if (data.data.avatar) {
      expect(typeof data.data.avatar).toBe('string');
    }

    console.log('✅ Optional fields handled');
  });
});

test.describe('Response Body Validation @api @validation', () => {
  test('validate created resource', async ({ request }) => {
    const requestBody = {
      name: 'John Doe',
      job: 'QA Engineer',
    };

    const response = await request.post('https://reqres.in/api/users', {
      data: requestBody,
    });

    const created = await response.json();

    // Validate request data is in response
    expect(created.name).toBe(requestBody.name);
    expect(created.job).toBe(requestBody.job);

    // Validate server-generated fields
    expect(created.id).toBeDefined();
    expect(created.createdAt).toBeDefined();

    console.log('✅ Created resource validated');
  });

  test('validate email format', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(data.data.email).toMatch(emailRegex);

    console.log(`✅ Email format valid: ${data.data.email}`);
  });

  test('validate required fields', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    const data = await response.json();

    const requiredFields = ['id', 'email', 'first_name', 'last_name'];

    requiredFields.forEach((field) => {
      expect(data.data).toHaveProperty(field);
      expect(data.data[field]).toBeDefined();
      expect(data.data[field]).not.toBe('');
    });

    console.log('✅ All required fields present');
  });
});

/*
JSON VALIDATION STRATEGIES:

1. Structure Validation:
   - Check properties exist
   - Validate nesting
   - Verify array vs object

2. Type Validation:
   - typeof for primitives
   - instanceof for objects
   - Array.isArray() for arrays

3. Value Validation:
   - Range checks (> 0, < 100)
   - Format checks (email, URL, date)
   - Enum validation

4. Required vs Optional:
   - Required: must exist and have value
   - Optional: may not exist
   - Nullable: exists but can be null

BEST PRACTICES:
- Validate response structure first
- Then validate data types
- Finally validate values
- Handle optional fields gracefully
*/
