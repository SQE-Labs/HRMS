const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const easyYopmail = require("./cypress/support/yopmail.js");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  env: {
    allure: true,
  },

  e2e: {
    downloadsFolder: "cypress/downloads",
    // specPattern: "cypress/e2e/tests/*.cy.{js,jsx,ts,tsx}",
    specPattern:[
      "cypress/e2e/tests/AnalyticsInsights.cy.js",
      // "cypress/e2e/tests/DownloadAttendance.cy.js",
      "cypress/e2e/tests/LoginTests.cy.js",
      // "cypress/e2e/tests/PerformanceTests.cy.js"
    ],
    excludeSpecPattern: [
      "cypress/e2e/tests/PerformanceTests.cy.js",
      "cypress/e2e/tests/EvaluateEmployeeTest.cy.js",
    ],
    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    setupNodeEvents(on, config) {
      // 🧹 Clean old Allure results before run
     const resultsDir = path.join(__dirname, "allure-results");
     const reportDir = path.join(__dirname, "allure-report");

      if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true, force: true });
        console.log("Old Allure results deleted successfully!");
      }

      if (fs.existsSync(reportDir)) {
        fs.rmSync(reportDir, { recursive: true, force: true });
        console.log("Old Allure reports deleted successfully!");
      }

      // Enable Allure plugin
      allureWriter(on, config);

      const options = {
        webpackOptions: {
          resolve: {
            fallback: {
              os: require.resolve("os-browserify/browser"),
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
        deleteAllXlsxFiles(folderPath) {
          if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            files.forEach((file) => {
              if (file.endsWith(".xlsx")) {
                fs.unlinkSync(path.join(folderPath, file));
                console.log(`Deleted old file: ${file}`);
              }
            });
          } else {
            console.log(`Folder not found: ${folderPath}`);
          }
          return null;
        },
      });

      return config;
    },
  },
});
