const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  use: {
    headless: true,  // Set to false if you want to see the browser UI
    baseURL: 'https://example.com',
    browserName: 'firefox',  // Set to 'firefox' to use Firefox
  },
  testDir: 'tests',
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
});

