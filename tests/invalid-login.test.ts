const { test, expect } = require('@playwright/test');

// Function to log in with valid credentials
const login = async (page, username, password) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[data-test="username"]', username);
  await page.fill('input[data-test="password"]', password);
  await page.click('input[data-test="login-button"]');
};

test('should display an error message with invalid credentials', async ({ page }) => {
  // Use the login function with invalid credentials
  await login(page, 'invalid_user', 'wrong_password');

  // Wait for the error message to be visible
  await page.waitForSelector('h3[data-test="error"]', { state: 'visible' });

  // Verify the error message
  const errorMessage = await page.innerText('h3[data-test="error"]');
  expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});

