const { test, expect } = require('@playwright/test');

test('should log in successfully with valid credentials', async ({ page }) => {
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
  
  // Optionally, check for a specific element on the inventory page to confirm successful login
  await page.waitForSelector('div.inventory_list'); // Example selector for inventory list
  const inventoryTitle = await page.innerText('span.title');
  expect(inventoryTitle).toBe('Products');
});

