const { defineConfig } = require("cypress");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpack = require('webpack');


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
    screenshotsFolder: "cypress/reports/html/screenshots",
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'mochawesome',
        mochawesomeReporterOptions: {
            reportDir: 'cypress/reports/html',
            overwrite: false,
            html: false,
            json: true,
            charts: true,
            reportPageTitle: 'HRMS Running report',
            screenshots: true,
        },
    },
   
    
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              stream: require.resolve('stream-browserify'),
              querystring: require.resolve('querystring-es3'),
              fs: require.resolve('browserify-fs'),      // Add fs polyfill
              zlib: require.resolve('browserify-zlib'),
              "assert": require.resolve("assert/") ,
              "https": false ,"path": false,
              buffer: require.resolve('buffer'),

            },
          },
          plugins: [
            new webpack.ProvidePlugin({
              process: 'process/browser',
              Buffer: ['buffer', 'Buffer'],
            }),
          ],
        },
      };

      on('file:preprocessor', webpackPreprocessor(options));

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
      }),

     
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
      
      
    },
  },
});
