const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    defaultCommandTimeout: 10000, 
    video: false,
    videoCompression : 1,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    viewportWidth: 1920, // Width of the viewport
    viewportHeight: 1080, // Height of the viewport

    reporterOptions: {
      charts: true,
      reportPageTitle: 'HRMS Running report',
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailOnly : true
    },
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
