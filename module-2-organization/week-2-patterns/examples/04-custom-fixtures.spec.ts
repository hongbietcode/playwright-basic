import { test as base } from '@playwright/test';

const test = base.extend({
  customData: async ({}, use) => {
    const data = { user: 'test', pass: 'pass' };
    await use(data);
  },
});

test('uses custom fixture', async ({ customData }) => {
  console.log('Custom data:', customData.user);
});
