const { test, expect } = require('@playwright/test');

test('should add an item to the cart and verify it appears in the cart', async ({ page }) => {
  // Navigate to Sauce Demo login page
  await page.goto('https://www.saucedemo.com/');

  // Ensure the username field is available
  await page.waitForSelector('input[data-test="username"]');
  await page.fill('input[data-test="username"]', 'standard_user');
  
  // Ensure the password field is available
  await page.waitForSelector('input[data-test="password"]');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  
  // Ensure the login button is available and click it
  await page.waitForSelector('input[data-test="login-button"]');
  await page.click('input[data-test="login-button"]');
  
  // Verify that the URL changes to the inventory page after login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
  // Add an item to the cart
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  
  // Verify the cart badge displays the correct number of items (should be 1)
  const cartBadge = await page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  
  // Click on the cart icon to navigate to the cart page
  await page.click('.shopping_cart_link');
  
  // Verify the cart page URL
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  
  // Check that the item is present in the cart by verifying item name
  const cartItemName = await page.locator('.cart_item .inventory_item_name').innerText();
  expect(cartItemName).toBe('Sauce Labs Backpack'); // Ensure this matches the item you added
});

