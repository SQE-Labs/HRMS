const { defineConfig } = require("cypress");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpack = require('webpack');
const { json } = require("mocha/lib/reporters/index.js");



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
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'HRMS Running report',
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailOnly : true,
      html: true,
      json:true,
      overwrite: false
    },    
    setupNodeEvents(on, config) {
      const fs = require('fs');
      const path = require('path');
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
              "buffer": require.resolve('buffer/'),
              "process": require.resolve("process/browser.js")
            },
          },
          plugins: [
            new webpack.ProvidePlugin({
              process: 'process/browser.js',
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


      on('task', {
        deleteFile(filePath) {
          const fullPath = path.resolve(__dirname, filePath);
    
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { success: true };
          }
    
          return { success: false, message: 'File not found' };
        }
      });
    

     
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
      
      
    },
  },
});
