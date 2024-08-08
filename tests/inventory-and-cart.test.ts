const { test, expect } = require('@playwright/test');

test('should display inventory items', async ({ page }) => {
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
  
  // Check for a specific element on the inventory page to confirm items are displayed
  await page.waitForSelector('div.inventory_list'); // Ensure the inventory list is loaded

  // Verify that there are 6 inventory items
  const inventoryItems = await page.locator('.inventory_item');
  const itemCount = await inventoryItems.count();
  expect(itemCount).toBe(6); // Change this number if the inventory count is different

  // Optionally, check for specific details of the items
  for (let i = 0; i < itemCount; i++) {
    const itemName = await page.locator(`.inventory_item:nth-of-type(${i + 1}) .inventory_item_name`);
    const itemPrice = await page.locator(`.inventory_item:nth-of-type(${i + 1}) .inventory_item_price`);
    
    await expect(itemName).toBeVisible();
    await expect(itemPrice).toBeVisible();
  }
});

