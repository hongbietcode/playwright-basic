# Project 7: REST API Test Suite

## Objective

Build a comprehensive REST API test suite covering all HTTP methods, authentication, validation, and error handling.

## Requirements

### 1. User Endpoints Testing

Create tests for:
- GET /api/users - List all users
- GET /api/users/:id - Get single user
- POST /api/users - Create user
- PUT /api/users/:id - Update user
- PATCH /api/users/:id - Partial update
- DELETE /api/users/:id - Delete user

### 2. Authentication

- Test login endpoint
- Use Bearer token in requests
- Handle auth errors (401, 403)

### 3. Validation

- Status code validation
- Response structure validation
- Data type validation
- Required fields validation

### 4. Error Handling

- 404 Not Found
- 400 Bad Request
- 401 Unauthorized
- 500 Server Error

### 5. Performance

- Response time < 2s
- Load testing (10 concurrent requests)

## Test API

**URL:** https://reqres.in/api

## File Structure

```
project-01-rest-api-suite/
├── README.md
├── tests/
│   ├── users-api.spec.ts
│   ├── auth-api.spec.ts
│   └── validation-api.spec.ts
├── helpers/
│   └── api-helpers.ts
└── SOLUTION.md
```

## Success Criteria

✅ All CRUD operations tested
✅ Authentication flow working
✅ Response validation complete
✅ Error scenarios covered
✅ Performance thresholds met

---

See `SOLUTION.md` for complete implementation
