# Project 8: Booking API Testing

## Objective

Test a complete booking system API with authentication, CRUD operations, and search functionality.

## Test API

**URL:** https://restful-booker.herokuapp.com
**Docs:** https://restful-booker.herokuapp.com/apidoc/index.html

## Requirements

### 1. Authentication
- POST /auth - Get token
- Use token in subsequent requests

### 2. Booking CRUD
- GET /booking - List all bookings
- GET /booking/:id - Get booking details
- POST /booking - Create booking
- PUT /booking/:id - Update booking
- PATCH /booking/:id - Partial update
- DELETE /booking/:id - Delete booking

### 3. Search & Filter
- Search by name
- Filter by check-in/check-out dates

## File Structure

```
project-02-booking-api/
├── README.md
├── tests/
│   ├── booking-crud.spec.ts
│   └── booking-search.spec.ts
├── helpers/
│   └── booking-helpers.ts
└── SOLUTION.md
```

## Success Criteria

✅ Complete booking lifecycle tested
✅ Authentication working
✅ Search and filtering validated
✅ Data cleanup implemented

---

See `SOLUTION.md` for implementation
