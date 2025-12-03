/**
 * Project 8: Booking API - Complete CRUD
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Booking API - Authentication @api @project8', () => {
  test('POST /auth - get token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.token).toBeDefined();

    console.log(`✅ Token: ${data.token}`);
  });
});

test.describe('Booking API - CRUD Operations @api @project8', () => {
  let bookingId: number;
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // Get auth token
    const authResponse = await request.post(`${BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });
    const authData = await authResponse.json();
    authToken = authData.token;
  });

  test('CREATE - create new booking', async ({ request }) => {
    const booking = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-05',
      },
      additionalneeds: 'Breakfast',
    };

    const response = await request.post(`${BASE_URL}/booking`, {
      data: booking,
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.bookingid).toBeDefined();
    expect(data.booking.firstname).toBe(booking.firstname);

    bookingId = data.bookingid;
    console.log(`✅ Created booking ID: ${bookingId}`);
  });

  test('READ - get booking details', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.firstname).toBe('John');
    expect(data.lastname).toBe('Doe');

    console.log(`✅ Retrieved booking: ${data.firstname} ${data.lastname}`);
  });

  test('UPDATE - full update with PUT', async ({ request }) => {
    const updatedBooking = {
      firstname: 'Jane',
      lastname: 'Smith',
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-02-01',
        checkout: '2024-02-10',
      },
      additionalneeds: 'Lunch',
    };

    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
      data: updatedBooking,
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.firstname).toBe('Jane');
    expect(data.totalprice).toBe(200);

    console.log('✅ Booking updated');
  });

  test('UPDATE - partial update with PATCH', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
      data: {
        firstname: 'Updated',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.firstname).toBe('Updated');

    console.log('✅ Booking partially updated');
  });

  test('DELETE - delete booking', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`,
      },
    });

    expect(response.status()).toBe(201); // Returns 201 for successful delete

    console.log('✅ Booking deleted');
  });
});

test.describe('Booking API - List & Search @api @project8', () => {
  test('GET /booking - list all bookings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);

    console.log(`✅ Retrieved ${data.length} bookings`);
  });

  test('filter by name', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`, {
      params: {
        firstname: 'Sally',
        lastname: 'Brown',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log(`✅ Found ${data.length} bookings matching name`);
  });

  test('filter by dates', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`, {
      params: {
        checkin: '2024-01-01',
        checkout: '2024-12-31',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log(`✅ Found ${data.length} bookings in date range`);
  });
});

/*
PROJECT 8 - BOOKING API

Features:
1. Authentication with token
2. Complete CRUD operations
3. Search and filtering
4. Token-based auth in headers

Key Differences:
- Uses Cookie header for auth (not Bearer)
- DELETE returns 201 (not 204)
- Real booking system workflow

USAGE:
npx playwright test project-02-booking-api/tests/booking-crud.spec.ts
*/
