import { test, expect } from './fixtures/auth.fixture';

test.describe('Fixtures Usage', () => {
  test('uses loginPage fixture', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('practice', 'SuperSecretPassword!');
    expect(await loginPage.getURL()).toContain('secure');
  });

  test('uses authenticatedPage fixture', async ({ authenticatedPage }) => {
    expect(await authenticatedPage.isOnDashboard()).toBeTruthy();
  });
});
