const { test, expect } = require('@playwright/test');

test('should filter the inventory items by price (low to high)', async ({ page }) => {
  // Step 1: Log in using the correct login code
  await page.goto('https://www.saucedemo.com/');
  await page.waitForSelector('input[data-test="username"]');
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.waitForSelector('input[data-test="password"]');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.waitForSelector('input[data-test="login-button"]');
  await page.click('input[data-test="login-button"]');
  
  // Ensure the page is fully loaded before proceeding
  await page.waitForLoadState('networkidle');

  // Step 2: Wait for the product sort dropdown to be visible using the correct selector
  await page.waitForSelector('select[data-test="product-sort-container"]', { timeout: 10000 });

  // Step 3: Select a sorting option (e.g., "Price (low to high)")
  await page.selectOption('select[data-test="product-sort-container"]', 'lohi');
  
  // Verify that the items are sorted correctly by price (low to high)
  const prices = await page.$$eval('.inventory_item_price', prices => prices.map(price => parseFloat(price.innerText.replace('$', ''))));
  const isSorted = prices.every((price, i, arr) => !i || arr[i - 1] <= price);
  expect(isSorted).toBeTruthy();

  // Step 4: Optionally, take a screenshot for debugging
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});

