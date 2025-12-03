# Week 11: API Validation & Integration

## Tổng Quan (Overview)

Tuần này tập trung vào **API response validation**, **schema validation**, **performance testing**, và **UI + API integration**.

## Mục Tiêu Học Tập

- ✅ Validate API response status codes
- ✅ Validate JSON response structure
- ✅ Implement JSON schema validation
- ✅ Test API response times
- ✅ Combine UI and API tests
- ✅ Setup and teardown with APIs

## Cấu Trúc Nội Dung

```
week-3-validation/
├── README.md
├── docs/
│   ├── 01-status-code-validation-vi.md
│   ├── 02-json-schema-validation-vi.md
│   ├── 03-response-time-testing-vi.md
│   └── 04-ui-api-integration-vi.md
├── examples/
│   ├── 01-status-codes.spec.ts
│   ├── 02-schema-validation.spec.ts
│   ├── 03-response-times.spec.ts
│   ├── 04-ui-api-combo.spec.ts
│   └── 05-data-management.spec.ts
├── schemas/
│   └── user-schema.json
├── exercises/
│   ├── exercise-01-validation.spec.ts
│   └── exercise-02-integration.spec.ts
└── solutions/
    ├── exercise-01-validation.spec.ts
    └── exercise-02-integration.spec.ts
```

## Key Concepts

### Status Code Validation
```typescript
expect(response.status()).toBe(200);
expect(response.ok()).toBeTruthy();
```

### JSON Schema
```typescript
const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' }
  }
};
```

### UI + API Integration
```typescript
// Create via API, verify via UI
await request.post('/api/users', { data: {...} });
await page.goto('/users');
```

## Thời Gian Học: ~10 giờ

---

**Begin with** `examples/01-status-codes.spec.ts`
