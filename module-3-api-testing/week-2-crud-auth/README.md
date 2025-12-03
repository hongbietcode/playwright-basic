# Week 10: CRUD Operations & Authentication

## Tổng Quan (Overview)

Tuần này tập trung vào **CRUD operations** (Create, Read, Update, Delete) và **API authentication** methods.

## Mục Tiêu Học Tập (Learning Objectives)

- ✅ Implement complete CRUD workflows
- ✅ Handle authentication (Bearer token, Basic auth, API key)
- ✅ Manage request/response lifecycle
- ✅ Handle API errors properly
- ✅ Chain API requests (create → update → delete)

## Cấu Trúc Nội Dung

```
week-2-crud-auth/
├── README.md
├── docs/
│   ├── 01-crud-operations-vi.md
│   ├── 02-authentication-types-vi.md
│   ├── 03-request-response-vi.md
│   └── 04-error-handling-vi.md
├── examples/
│   ├── 01-full-crud.spec.ts
│   ├── 02-bearer-token.spec.ts
│   ├── 03-basic-auth.spec.ts
│   ├── 04-api-key-auth.spec.ts
│   └── 05-error-responses.spec.ts
├── exercises/
│   ├── exercise-01-crud-flow.spec.ts
│   └── exercise-02-auth.spec.ts
└── solutions/
    ├── exercise-01-crud-flow.spec.ts
    └── exercise-02-auth.spec.ts
```

## Test APIs

- **reqres.in** - Free REST API
- **restful-booker.herokuapp.com** - Booking API with auth

## Key Concepts

### CRUD Workflow
```typescript
// Create
const user = await request.post('/api/users', { data: {...} });

// Read
const response = await request.get(`/api/users/${user.id}`);

// Update
await request.put(`/api/users/${user.id}`, { data: {...} });

// Delete
await request.delete(`/api/users/${user.id}`);
```

### Authentication
```typescript
// Bearer Token
await request.get('/api/users', {
  headers: { 'Authorization': 'Bearer token123' }
});
```

## Thời Gian Học: ~10 giờ

---

**Start with** `docs/01-crud-operations-vi.md`
