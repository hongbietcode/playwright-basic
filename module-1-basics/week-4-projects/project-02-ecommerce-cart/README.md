# 🛒 Project 2: E-commerce Shopping Cart Testing

## Mục Tiêu Dự Án | Project Objectives

Dự án này giúp bạn thực hành testing **shopping cart functionality** - một trong những feature phức tạp nhất của e-commerce websites.

**Kỹ năng thực hành:**
- ✅ Complex user interactions
- ✅ State management testing
- ✅ Price calculation validation
- ✅ Dynamic content handling
- ✅ Multiple product workflows
- ✅ Data-driven testing

---

## 📋 Yêu Cầu | Requirements

### Test Site
**URL:** https://www.saucedemo.com/

**Test Credentials:**
- Username: `standard_user`
- Password: `secret_sauce`

### Test Scenarios

#### ✅ Scenario 1: Add Single Product
- Login to site
- Add one product to cart
- Verify cart badge shows "1"
- Go to cart
- Verify product is in cart
- Verify price is correct

#### ✅ Scenario 2: Add Multiple Products
- Login
- Add 3 different products
- Verify cart badge shows "3"
- Verify all products in cart
- Verify total price calculation

#### ✅ Scenario 3: Remove Product from Cart
- Add products to cart
- Go to cart page
- Remove one product
- Verify product removed
- Verify cart count updated
- Verify price recalculated

#### ✅ Scenario 4: Update Quantity
- Add product to cart
- Go to cart
- Change quantity
- Verify price updated

#### ✅ Scenario 5: Empty Cart
- Add products
- Remove all products
- Verify cart is empty
- Verify "Continue Shopping" button works

#### ✅ Scenario 6: Cart Persistence
- Add products to cart
- Logout
- Login again
- Verify cart still has products

#### ✅ Scenario 7: Checkout Flow
- Add products
- Go to cart
- Click checkout
- Fill checkout info
- Verify order summary
- Complete purchase

---

## 📂 Cấu Trúc Dự Án | Project Structure

```
project-02-ecommerce-cart/
├── README.md                    # This file
├── tests/
│   ├── cart.spec.ts            # Cart functionality tests
│   └── product-helpers.ts      # Helper functions
└── SOLUTION.md                  # Solution guide
```

---

## 🚀 Hướng Dẫn Thực Hiện | Implementation Guide

### Bước 1: Explore the Site
1. Truy cập https://www.saucedemo.com/
2. Login với credentials
3. Khám phá cart functionality manually
4. Identify key elements:
   - Product list
   - "Add to cart" buttons
   - Cart badge
   - Cart page
   - Remove buttons
   - Checkout flow

### Bước 2: Plan Test Strategy
```typescript
test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
  });

  test('Add single product', async ({ page }) => {
    // TODO: Implement
  });

  // ... more tests
});
```

### Bước 3: Create Helper Functions
```typescript
// product-helpers.ts
export async function addProductToCart(page: Page, productName: string) {
  // TODO: Implement
}

export async function getCartCount(page: Page): Promise<number> {
  // TODO: Implement
}

export async function getCartTotal(page: Page): Promise<number> {
  // TODO: Implement
}
```

### Bước 4: Implement Tests
Focus on:
- Product interactions
- Cart state verification
- Price calculations
- Navigation flows

### Bước 5: Run Tests
```bash
yarn test tests/cart.spec.ts
yarn test:ui tests/cart.spec.ts
```

---

## ✅ Acceptance Criteria

Project complete when:

1. **All scenarios pass** ✅
2. **Price calculations verified** (add/remove products)
3. **Cart state managed** correctly
4. **Helper functions** for reusability
5. **Good test organization**
6. **Data-driven tests** (test with multiple products)
7. **Clear assertions**

---

## 🎓 Học Từ Dự Án Này | Learning Outcomes

1. ✨ Test **complex user workflows**
2. 🔢 Validate **calculations** (prices, quantities)
3. 🔄 Handle **state changes** (add/remove items)
4. 🎯 Test **dynamic content**
5. 📊 Implement **data-driven testing**

---

## 💡 Tips & Best Practices

### Product Selection Strategy
```typescript
// ✅ GOOD - Select by data attribute
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

// ✅ GOOD - Select by text
await page.locator('button', { hasText: 'Add to cart' }).first().click();

// ❌ AVOID - Complex CSS
await page.locator('.inventory_item:nth-child(1) button').click();
```

### Price Validation
```typescript
// ✅ GOOD - Extract and parse price
const priceText = await page.locator('.inventory_item_price').textContent();
const price = parseFloat(priceText!.replace('$', ''));
expect(price).toBe(29.99);

// ✅ GOOD - Validate total
const total = await calculateCartTotal(page);
expect(total).toBe(expectedTotal);
```

### Cart Badge Verification
```typescript
// ✅ GOOD - Check cart count
const badge = page.locator('.shopping_cart_badge');
await expect(badge).toHaveText('3');

// ✅ GOOD - Verify badge appears/disappears
await expect(badge).toBeVisible(); // Has items
await expect(badge).toBeHidden();  // Empty cart
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Stale Cart State
**Problem:** Cart count doesn't update

**Solution:**
- Wait for badge to update: `await expect(badge).toHaveText('2')`
- Refresh if needed: `await page.reload()`
- Clear cart in beforeEach hook

### Issue 2: Price Calculation Errors
**Problem:** Total doesn't match expected

**Solution:**
- Parse prices carefully (remove $, handle decimals)
- Account for taxes/fees if present
- Use helper function for consistency

### Issue 3: Dynamic Product List
**Problem:** Products not found

**Solution:**
- Wait for products to load: `await page.waitForSelector('.inventory_item')`
- Use stable selectors (data-test attributes)
- Verify product exists before interacting

---

## 📚 Reference

**Week 2 Concepts:**
- Locators (CSS, text, role)
- Click interactions
- Text extraction

**Week 3 Concepts:**
- Assertions (toHaveText, toBeVisible)
- Count validation
- Auto-wait mechanism

**Test Site:**
- https://www.saucedemo.com/
- Username: standard_user
- Password: secret_sauce

---

## 🎯 Next Steps

1. Complete all test scenarios
2. Add data-driven tests (test with different products)
3. Compare with SOLUTION.md
4. Move to Project 3: Form Validation

---

## ⏱️ Estimated Time

- **Beginner**: 4-5 hours
- **Intermediate**: 2-3 hours
- **Advanced**: 1-2 hours

**Happy testing!** 🛒✨
