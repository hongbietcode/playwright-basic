/**
 * Example: Complete CRUD Workflow
 * Demonstrates Create → Read → Update → Delete lifecycle
 */

import { test, expect } from '@playwright/test';

test.describe('Full CRUD Workflow @api @crud', () => {
  let userId: string;

  test('CREATE - create new user', async ({ request }) => {
    console.log('📝 Step 1: CREATE');

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

    userId = data.id;
    console.log(`✅ Created user with ID: ${userId}`);
  });

  test('READ - get user details', async ({ request }) => {
    console.log('📖 Step 2: READ');

    const response = await request.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.data.id).toBe(2);
    expect(data.data.email).toBeDefined();
    expect(data.data.first_name).toBeDefined();

    console.log(`✅ Retrieved user: ${data.data.first_name} ${data.data.last_name}`);
  });

  test('UPDATE - update user (PUT)', async ({ request }) => {
    console.log('🔄 Step 3: UPDATE (PUT)');

    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'John Updated',
        job: 'Senior QA Engineer',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.name).toBe('John Updated');
    expect(data.job).toBe('Senior QA Engineer');
    expect(data.updatedAt).toBeDefined();

    console.log('✅ User updated successfully');
  });

  test('UPDATE - partial update (PATCH)', async ({ request }) => {
    console.log('🔄 Step 4: UPDATE (PATCH)');

    const response = await request.patch('https://reqres.in/api/users/2', {
      data: {
        job: 'Lead QA Engineer',
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.job).toBe('Lead QA Engineer');

    console.log('✅ User partially updated');
  });

  test('DELETE - remove user', async ({ request }) => {
    console.log('🗑️ Step 5: DELETE');

    const response = await request.delete('https://reqres.in/api/users/2');

    expect(response.status()).toBe(204); // No Content

    console.log('✅ User deleted successfully');
  });
});

test.describe('Chained CRUD Operations @api @crud', () => {
  test('complete user lifecycle', async ({ request }) => {
    // 1. CREATE
    console.log('1️⃣ Creating user...');
    const createResponse = await request.post('https://reqres.in/api/users', {
      data: { name: 'Test User', job: 'Tester' },
    });
    expect(createResponse.status()).toBe(201);
    const created = await createResponse.json();
    const userId = created.id;
    console.log(`✅ Created ID: ${userId}`);

    // 2. READ
    console.log('2️⃣ Reading user...');
    const readResponse = await request.get(`https://reqres.in/api/users/${userId}`);
    expect(readResponse.ok()).toBeTruthy();
    console.log('✅ Read successful');

    // 3. UPDATE
    console.log('3️⃣ Updating user...');
    const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
      data: { name: 'Updated User', job: 'Senior Tester' },
    });
    expect(updateResponse.status()).toBe(200);
    console.log('✅ Update successful');

    // 4. DELETE
    console.log('4️⃣ Deleting user...');
    const deleteResponse = await request.delete(`https://reqres.in/api/users/${userId}`);
    expect(deleteResponse.status()).toBe(204);
    console.log('✅ Delete successful');

    console.log('🎉 Complete CRUD lifecycle finished!');
  });
});

/*
KEY TAKEAWAYS:

1. CRUD = Create, Read, Update, Delete
2. HTTP Methods:
   - POST (Create) → 201 Created
   - GET (Read) → 200 OK
   - PUT (Update full) → 200 OK
   - PATCH (Update partial) → 200 OK
   - DELETE (Delete) → 204 No Content

3. Chaining operations:
   - Save IDs from CREATE
   - Use IDs in subsequent operations
   - Clean up with DELETE

4. Status codes matter:
   - 201: Resource created
   - 200: Success
   - 204: Success, no content
*/
