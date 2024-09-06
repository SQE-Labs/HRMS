const { defineConfig } = require("cypress");
const easyYopmail = require("./cypress/support/yopmail.js");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode : true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    chromeWebSecurity : false,
    experimentalModifyObstructiveThirdPartyCode : true,
    experimentalSessionAndOrigin : true,
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
      on('task', {
        emailFetcher() {
          return easyYopmail.getNewEmailId();
        },
        contentGetter(someEmail){
          return easyYopmail.getLatestEmail(someEmail);
        },
        getConfirmaUrl(email){
          return easyYopmail.getConfirmationURL(email);
        },
      })

      require('cypress-mochawesome-reporter/plugin')(on);
      
    },
  },
});
