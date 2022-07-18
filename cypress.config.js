const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    baseUrl: 'https://nubisoft.pl/',
  },
});
