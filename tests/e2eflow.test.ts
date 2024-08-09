const { test, expect } = require('@playwright/test');

test('should complete an end-to-end purchase successfully', async ({ page }) => {
  // Navigate to Sauce Demo login page and log in
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Add an item to the cart
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');

  // Proceed to checkout
  await page.click('button[data-test="checkout"]');

  // Fill in the checkout information
  await page.fill('input[data-test="firstName"]', 'Jacek');
  await page.fill('input[data-test="lastName"]', 'Doe');
  await page.fill('input[data-test="postalCode"]', '12345');
  await page.click('input[data-test="continue"]');

  // Finish the purchase
  await page.click('button[data-test="finish"]');

  // Verify the order completion
  const confirmationText = await page.textContent('.complete-header');
  expect(confirmationText).toBe('Thank you for your order!');
});

