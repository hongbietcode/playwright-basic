# Week 9: API Testing Fundamentals

## Tổng Quan (Overview)

Tuần này bắt đầu **Module 3: API Testing** với focus vào API testing fundamentals sử dụng Playwright's **APIRequestContext**.

## Mục Tiêu Học Tập (Learning Objectives)

- ✅ Hiểu API testing và tại sao cần thiết
- ✅ Sử dụng Playwright APIRequestContext
- ✅ Test HTTP methods (GET, POST, PUT, PATCH, DELETE)
- ✅ Làm việc với headers, query params, request body
- ✅ Validate API responses (status codes, JSON structure)

## Cấu Trúc Nội Dung (Content Structure)

```
week-1-fundamentals/
├── README.md
├── docs/
│   ├── 01-api-testing-intro-vi.md
│   ├── 02-http-methods-vi.md
│   ├── 03-api-request-context-vi.md
│   └── 04-request-structure-vi.md
├── examples/
│   ├── 01-get-requests.spec.ts
│   ├── 02-post-requests.spec.ts
│   ├── 03-put-patch.spec.ts
│   ├── 04-delete-requests.spec.ts
│   └── 05-headers-params.spec.ts
├── exercises/
│   ├── exercise-01-get-post.spec.ts
│   └── exercise-02-crud-basics.spec.ts
└── solutions/
    ├── exercise-01-get-post.spec.ts
    └── exercise-02-crud-basics.spec.ts
```

## Test APIs

- **reqres.in** - Fake REST API for testing
- **jsonplaceholder.typicode.com** - Free fake API

## Key Concepts

### HTTP Methods
- **GET** - Retrieve data
- **POST** - Create data
- **PUT** - Update (replace) data
- **PATCH** - Update (modify) data
- **DELETE** - Delete data

### APIRequestContext
```typescript
const response = await request.get('https://reqres.in/api/users/1');
expect(response.ok()).toBeTruthy();
const data = await response.json();
```

## Thời Gian Học (Study Time)

- **Lý thuyết**: 3-4 giờ
- **Examples**: 2-3 giờ
- **Exercises**: 3-4 giờ
- **Tổng**: ~10 giờ

---

**Let's start API testing!** Begin with `docs/01-api-testing-intro-vi.md`
