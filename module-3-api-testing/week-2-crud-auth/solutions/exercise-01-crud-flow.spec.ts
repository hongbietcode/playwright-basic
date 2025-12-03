/**
 * SOLUTION: Exercise 1 - Complete CRUD Flow
 */

import { test, expect } from '@playwright/test';

test.describe('Exercise 1 Solution: Complete CRUD Flow @api', () => {
  test('user lifecycle: create → read → update → delete', async ({ request }) => {
    console.log('🔄 Starting complete CRUD lifecycle...');

    // 1. CREATE
    console.log('\n1️⃣ CREATE: Creating new user');
    const createResponse = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'Test User',
        job: 'Automation Tester',
      },
    });

    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json();
    expect(createdUser.name).toBe('Test User');
    expect(createdUser.id).toBeDefined();

    const userId = createdUser.id;
    console.log(`✅ Created user ID: ${userId}`);

    // 2. READ
    console.log('\n2️⃣ READ: Fetching user details');
    const readResponse = await request.get(`https://reqres.in/api/users/${userId}`);

    expect(readResponse.ok()).toBeTruthy();
    console.log('✅ User fetched successfully');

    // 3. UPDATE (PUT)
    console.log('\n3️⃣ UPDATE: Full update with PUT');
    const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
      data: {
        name: 'Updated User',
        job: 'Senior Tester',
      },
    });

    expect(updateResponse.status()).toBe(200);
    const updatedUser = await updateResponse.json();
    expect(updatedUser.name).toBe('Updated User');
    expect(updatedUser.job).toBe('Senior Tester');
    console.log('✅ User updated successfully');

    // 4. UPDATE (PATCH)
    console.log('\n4️⃣ PATCH: Partial update');
    const patchResponse = await request.patch(`https://reqres.in/api/users/${userId}`, {
      data: {
        job: 'Lead Tester',
      },
    });

    expect(patchResponse.status()).toBe(200);
    const patchedUser = await patchResponse.json();
    expect(patchedUser.job).toBe('Lead Tester');
    console.log('✅ User partially updated');

    // 5. DELETE
    console.log('\n5️⃣ DELETE: Removing user');
    const deleteResponse = await request.delete(`https://reqres.in/api/users/${userId}`);

    expect(deleteResponse.status()).toBe(204);
    console.log('✅ User deleted successfully');

    console.log('\n🎉 Complete CRUD lifecycle finished!');
  });
});

/*
SOLUTION EXPLANATION:

1. CREATE (POST):
   - Use request.post() with data
   - Expect 201 Created
   - Save userId from response

2. READ (GET):
   - Use request.get() with userId
   - Expect 200 OK
   - Validate response data

3. UPDATE (PUT):
   - Use request.put() with complete data
   - Expect 200 OK
   - Replaces entire resource

4. PATCH:
   - Use request.patch() with partial data
   - Expect 200 OK
   - Updates only specified fields

5. DELETE:
   - Use request.delete()
   - Expect 204 No Content
   - Resource is removed

COMPLETE WORKFLOW:
POST → GET → PUT → PATCH → DELETE
*/
