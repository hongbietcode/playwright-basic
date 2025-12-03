# 📊 Test Data Management

## JSON Data Files

### users.json
```json
{
  "validUsers": [
    {"username": "user1", "password": "pass1"},
    {"username": "user2", "password": "pass2"}
  ],
  "invalidUsers": [
    {"username": "wrong", "password": "wrong"}
  ]
}
```

### Usage
```typescript
import users from '../test-data/users.json';

test('data-driven login', async ({ page }) => {
  for (const user of users.validUsers) {
    await page.fill('#user', user.username);
    await page.fill('#pass', user.password);
  }
});
```

## Dynamic Data Generation

```typescript
import { faker } from '@faker-js/faker';

const user = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  phone: faker.phone.number(),
};
```

## Environment-Specific Data

```typescript
const testData = {
  dev: { url: 'https://dev.example.com' },
  staging: { url: 'https://staging.example.com' },
};

const env = process.env.ENV || 'dev';
const data = testData[env];
```

## Best Practices
- Store in separate folder
- Use JSON for structured data
- Generate dynamic data when needed
- Environment-specific configs
