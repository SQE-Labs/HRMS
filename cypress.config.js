const { defineConfig } = require("cypress");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const os = require("os");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    specPattern: "cypress/e2e/tests/*.cy.{js,jsx,ts,tsx}",
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "HRMS Test Execution Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailOnly: true,
      html: true,
      json: false,
      overwrite: true,
    },

    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              os: require.resolve("os-browserify/browser"), // ✅ Fix for "os" module not found
              stream: require.resolve("stream-browserify"),
              querystring: require.resolve("querystring-es3"),
              fs: require.resolve("browserify-fs"),
              zlib: require.resolve("browserify-zlib"),
              assert: require.resolve("assert/"),
              path: require.resolve("path-browserify"),
              buffer: require.resolve("buffer/"),
              process: require.resolve("process/browser.js"),
              https: false,
            },
          },
          plugins: [
            new webpack.ProvidePlugin({
              process: "process/browser.js",
              Buffer: ["buffer", "Buffer"],
            }),
          ],
        },
      };

      on("file:preprocessor", webpackPreprocessor(options));

      on("task", {
        emailFetcher() {
          return easyYopmail.getNewEmailId();
        },
        contentGetter(someEmail) {
          return easyYopmail.getLatestEmail(someEmail);
        },
        getConfirmaUrl(email) {
          return easyYopmail.getConfirmationURL(email);
        },
        deleteFile(filePath) {
          const fullPath = path.resolve(__dirname, filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { success: true };
          }
          return { success: false, message: "File not found" };
        },
        
        getDownloadFolder() {
          return path.join(os.homedir(), "Downloads");
        },
      });

      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
